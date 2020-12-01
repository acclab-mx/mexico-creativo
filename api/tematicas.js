import airtable from './airtable.js'

// Obtener la lista de temáticas
export default async function (req, res) {
  try {
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(await airtable.request('tematicas', {}, true))
  } catch (e) {
    console.error('Error general: ', e)
    res.statusCode = 500
    res.end(e)
  }
}
