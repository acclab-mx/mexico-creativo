import airtable from './airtable.js'

// Obtener la lista de temáticas
export default async function (req, res) {
  try {
    const tematicas = await airtable.request(
      'tematicas',
      {
        onlyPublic: false,
        fields: ['TEMA', 'ORDEN'],
        orderBy: {
          field: 'ORDEN',
        },
      },
      true
    )

    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(tematicas)
  } catch (e) {
    console.error('Error general: ', e)
    res.statusCode = 500
    res.end(e)
  }
}
