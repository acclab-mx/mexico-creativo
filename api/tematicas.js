import airtable from './airtable.js'

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

// Obtener la lista de temáticas
export default async function (req, res) {
  try {
    const tematicas = await airtable.request(
      'tematicas',
      {
        onlyPublic: true,
        fields: ['TEMA', 'ORDEN'],
        orderBy: {
          field: 'ORDEN',
        },
      },
      false
    )

    tematicas.records = tematicas.records.map((field) =>
      parseFields('tematicas', field)
    )

    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(JSON.stringify(tematicas) + '\n')
  } catch (e) {
    console.error('Error general: ', e)
    res.statusCode = 500
    res.end(e)
  }
}
