import parseFields from './helpers.js'
import airtable from './airtable.js'

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
