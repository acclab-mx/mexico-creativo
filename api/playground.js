import airtable from './airtable.js'

const pageSize = 1

const parseTXT = (field, value) =>
  field.includes('_TXT') ? value.split(',') : value

const parseFields = (table, record) => {
  // console.log('record: ', record)
  const fields = Object.keys(record.fields).reduce(
    (fields, field) => ({
      ...fields,
      [field.toLowerCase()]: Array.isArray(record.fields[field])
        ? record.fields[field].flat()
        : parseTXT(field, record.fields[field]),
    }),
    []
  )
  // console.log('fields: ', JSON.stringify(fields, null, 2))
  const parsedRecord = {
    table,
    id: record.id,
    ...fields,
    createdTime: record.createdTime,
  }
  return parsedRecord
}

const mapPropuesta = (table, record) => {
  const parsedRecord = parseFields(table, record)

  return parsedRecord
}

const mapCita = (table, record) => {
  const parsedRecord = parseFields(table, record)

  return parsedRecord
}

const mapEstudio = (table, record) => {
  const parsedRecord = parseFields(table, record)

  return parsedRecord
}

const mapConcepto = (table, record) => {
  const parsedRecord = parseFields(table, record)

  return parsedRecord
}

// Obtener la lista de temáticas
export default async function (req, res) {
  try {
    const query = req._parsedUrl.query
    console.log('query: ', query)
    const parsedQuery = query
      ? query
          .replace('?', '')
          .split('&')
          .map((el) => el.split('='))
          .map((el) => ({ [el[0]]: el[1] }))
          .reduce((el, list) => ({ ...list, ...el }), [])
      : {}

    console.log('parsedQuery: ', parsedQuery)

    const propuestas = await airtable.request(
      'propuestas',
      {
        onlyPublic: false,
        fields: [
          'PROPUESTA',
          'DESCRIPCION_CORTA',
          'AUTORA_TXT',
          'FUENTE_TXT',
          'CONCEPTOS_RELACIONADOS_TXT',
          'LINKS',
          'FOTOGRAFIA',
          'NUMERO_DE_TEMATICA',
        ],
        filterBy:
          'topicId' in parsedQuery
            ? [{ field: 'NUMERO_DE_TEMATICA', value: parsedQuery.topicId }]
            : null,
        orderBy: {
          field: 'ORDEN',
        },
        pageSize,
      },
      false
    )

    const citas = await airtable.request(
      'citas',
      {
        onlyPublic: false,
        fields: [
          'CITA',
          'AUTORA',
          'LINK',
          'FOTO',
          'FUENTE_TXT',
          'CONCEPTOS_RELACIONADOS_TXT',
          'ORGANIZACION_TXT',
          'NUMERO_DE_TEMATICA',
        ],
        filterBy:
          'topicId' in parsedQuery
            ? [{ field: 'NUMERO_DE_TEMATICA', value: parsedQuery.topicId }]
            : null,
        orderBy: {
          field: 'ORDEN',
        },
        pageSize,
      },
      false
    )

    const estudios = await airtable.request(
      'estudios',
      {
        onlyPublic: false,
        fields: [
          'ESTUDIO',
          'DESCRIPCION',
          'FUENTE_TXT',
          'FOTOGRAFIA',
          'LINK',
          'CONCEPTOS_RELACIONADOS_TXT',
          'ORGANIZACION_TXT',
          'NUMERO_DE_TEMATICA',
        ],
        filterBy:
          'topicId' in parsedQuery
            ? [{ field: 'NUMERO_DE_TEMATICA', value: parsedQuery.topicId }]
            : null,
        orderBy: {
          field: 'ORDEN',
        },
        pageSize,
      },
      false
    )

    const conceptos = await airtable.request(
      'conceptos',
      {
        onlyPublic: false,
        fields: [
          'CONCEPTO',
          'DEFINICION',
          'URL',
          'FOTOGRAFIA',
          'AUTORA_TXT',
          'FUENTE_TXT',
          'CITAS_TXT',
          'PROPUESTAS_TXT',
          'NUMERO_DE_TEMATICA',
        ],
        filterBy:
          'topicId' in parsedQuery
            ? [{ field: 'NUMERO_DE_TEMATICA', value: parsedQuery.topicId }]
            : null,
        orderBy: {
          field: 'ORDEN',
        },
        pageSize,
      },
      false
    )

    console.log('propuestas.offset: ', propuestas.offset)
    console.log('citas.offset: ', citas.offset)
    console.log('estudios.offset: ', estudios.offset)
    console.log('conceptos.offset: ', conceptos.offset)

    const cards = [
      ...propuestas.records.map((record) => mapPropuesta('propuestas', record)),
      ...citas.records.map((record) => mapCita('citas', record)),
      ...estudios.records.map((record) => mapEstudio('estudios', record)),
      ...conceptos.records.map((record) => mapConcepto('conceptos', record)),
    ]

    const response = {
      cards,
      offsets: {
        propuestas: propuestas.offset,
        citas: citas.offset,
        estudios: estudios.offset,
        conceptos: conceptos.offset,
      },
      count: cards.length,
    }

    // console.log('response: ', response)

    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(JSON.stringify(response) + '\n')
  } catch (e) {
    console.error('Error general: ', e)
    res.statusCode = 500
    res.end(e)
  }
}
