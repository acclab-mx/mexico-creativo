import airtable from './airtable.js'
import helpers from './helpers.js'

const getResourcePath = (category, id) => `${category}/${id}`

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

    const table = category === 'etiqueta' ? 'etiquetas' : 'contenidos';

    const resourcePath = getResourcePath(table, id)

    console.log('resourcePath: ', resourcePath)

    const response = helpers.parseFields(
      table,
      await airtable.request(
        resourcePath,
        {
          onlyPublic: false,
        },
        false
      )
    )

    console.log('records: ', response)

    if (response.portada) {
      response.portada = response.portada[0].url
    }

    switch (category) {
      case 'propuestas':
        response.category = 'Propuestas'
        break
      case 'acciones':
        response.category = 'Acciones'
        break
      case 'estudios':
        response.category = 'Estudios'
        break
      case 'retos':
        response.category = 'Retos'
        break
      case 'etiqueta':
        response.category = 'Etiquetas'
        break
      default:
        response.category = category
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
