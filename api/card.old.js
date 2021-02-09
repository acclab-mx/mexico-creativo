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

const getResourcePath = (category, id) => `${category}s/${id}`

// Obtener la lista de temáticas
export default async function (req, res) {
  try {
    const body = req.body
    console.log('get card body: ', body)
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

    const [category, id] = parsedQuery.cardId.split('-')
    const resourcePath = getResourcePath(category, id)

    console.log('resourcePath: ', resourcePath)

    const response = parseFields(
      category,
      await airtable.request(
        resourcePath,
        {
          onlyPublic: false,
        },
        false
      )
    )

    switch (category) {
      case 'propuesta':
        response.category = 'Propuestas'
        break
      case 'cita':
        response.category = 'Citas'
        break
      case 'estudio':
        response.category = 'Estudios'
        break
      case 'concepto':
        response.category = 'Conceptos'
        break
      default:
        response.category = ''
    }

    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(JSON.stringify(response) + '\n')
  } catch (e) {
    console.error('Error general: ', e)
    res.statusCode = 500
    res.end(e)
  }
}
