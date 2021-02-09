import airtable from './airtable.js'

const pageSize = 10 // items por categoría

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

  parsedRecord.category = 'Propuestas'

  return parsedRecord
}

const mapCita = (table, record) => {
  const parsedRecord = parseFields(table, record)

  parsedRecord.category = 'Citas'

  return parsedRecord
}

const mapEstudio = (table, record) => {
  const parsedRecord = parseFields(table, record)

  parsedRecord.category = 'Estudios'

  return parsedRecord
}

const mapConcepto = (table, record) => {
  const parsedRecord = parseFields(table, record)

  parsedRecord.category = 'Conceptos'

  return parsedRecord
}

const zip = (...argv) => {
  // Junta n listas por indice
  // Ej. lista 1, indice 1, lista 2, indice 1, lista n, indice 1, lista 1, indice 2, lista 2, indice 2, lista n, indice 2... hasta la lista n
  const zipped = []
  const listLengths = []
  for (let i = 0; i < argv.length; i++) {
    listLengths.push(argv[i].length)
  }
  for (let i = 0; i < Math.max(...listLengths); i++) {
    for (let j = 0; j < listLengths.length; j++) {
      if (argv[j][i]) {
        zipped.push(argv[j][i])
      }
    }
  }
  return zipped
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

    let propuestas = { records: [], offset: parsedQuery.offsetPropuestas }
    if (
      parsedQuery.categoryList.includes('propuestas') &&
      (!('offsetPropuestas' in parsedQuery) ||
        parsedQuery.offsetPropuestas !== 'end')
    ) {
      propuestas = await airtable.request(
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
            'ORDEN',
          ],
          filterBy:
            'topic' in parsedQuery
              ? [{ field: 'NUMERO_DE_TEMATICA', value: parsedQuery.topic }]
              : null,
          orderBy: {
            field: 'ORDEN',
          },
          pageSize,
          offset: parsedQuery.offsetPropuestas,
        },
        false
      )
    }

    let citas = { records: [], offset: parsedQuery.offsetCitas }
    if (
      parsedQuery.categoryList.includes('citas') &&
      (!('offsetCitas' in parsedQuery) || parsedQuery.offsetCitas !== 'end')
    ) {
      citas = await airtable.request(
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
            'ORDEN',
          ],
          filterBy:
            'topic' in parsedQuery
              ? [{ field: 'NUMERO_DE_TEMATICA', value: parsedQuery.topic }]
              : null,
          orderBy: {
            field: 'ORDEN',
          },
          pageSize,
          offset: parsedQuery.offsetCitas,
        },
        false
      )
    }

    let estudios = { records: [], offset: parsedQuery.offsetEstudios }
    if (
      parsedQuery.categoryList.includes('estudios') &&
      (!('offsetEstudios' in parsedQuery) ||
        parsedQuery.offsetEstudios !== 'end')
    ) {
      estudios = await airtable.request(
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
            'ORDEN',
          ],
          filterBy:
            'topic' in parsedQuery
              ? [{ field: 'NUMERO_DE_TEMATICA', value: parsedQuery.topic }]
              : null,
          orderBy: {
            field: 'ORDEN',
          },
          pageSize,
          offset: parsedQuery.offsetEstudios,
        },
        false
      )
    }

    let conceptos = { records: [], offset: parsedQuery.offsetConceptos }
    if (
      parsedQuery.categoryList.includes('conceptos') &&
      (!('offsetConceptos' in parsedQuery) ||
        parsedQuery.offsetConceptos !== 'end')
    ) {
      conceptos = await airtable.request(
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
            'ORDEN',
          ],
          filterBy:
            'topic' in parsedQuery
              ? [{ field: 'NUMERO_DE_TEMATICA', value: parsedQuery.topic }]
              : null,
          orderBy: {
            field: 'ORDEN',
          },
          pageSize,
          offset: parsedQuery.offsetConceptos,
        },
        false
      )
    }

    /* console.log('propuestas.offset: ', propuestas.offset)
    console.log('citas.offset: ', citas.offset)
    console.log('estudios.offset: ', estudios.offset)
    console.log('conceptos.offset: ', conceptos.offset) */

    console.log('propuestas.records.length: ', propuestas.records.length)
    console.log('citas.records.length: ', citas.records.length)
    console.log('estudios.records.length: ', estudios.records.length)
    console.log('conceptos.records.length: ', conceptos.records.length)

    const cards = zip(
      propuestas.records.map((record) => mapPropuesta('propuestas', record)),
      citas.records.map((record) => mapCita('citas', record)),
      estudios.records.map((record) => mapEstudio('estudios', record)),
      conceptos.records.map((record) => mapConcepto('conceptos', record))
    )
    /* [
      ...propuestas.records.map((record) => mapPropuesta('propuestas', record)),
      ...citas.records.map((record) => mapCita('citas', record)),
      ...estudios.records.map((record) => mapEstudio('estudios', record)),
      ...conceptos.records.map((record) => mapConcepto('conceptos', record)),
    ] */

    const response = {
      cards,
      offsets: {},
      count: cards.length,
    }

    if (parsedQuery.categoryList.includes('propuestas')) {
      response.offsets.propuestas = propuestas.offset
        ? propuestas.offset
        : 'end'
    }
    if (parsedQuery.categoryList.includes('citas')) {
      response.offsets.citas = citas.offset ? citas.offset : 'end'
    }
    if (parsedQuery.categoryList.includes('conceptos')) {
      response.offsets.conceptos = conceptos.offset ? conceptos.offset : 'end'
    }
    if (parsedQuery.categoryList.includes('estudios')) {
      response.offsets.estudios = estudios.offset ? estudios.offset : 'end'
    }

    console.log('response.offsets: ', response.offsets)

    console.log('response.count: ', response.count)

    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(JSON.stringify(response) + '\n')
  } catch (e) {
    console.error('Error general: ', e)
    res.statusCode = 500
    res.end(e)
  }
}
