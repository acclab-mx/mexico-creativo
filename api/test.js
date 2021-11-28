// import helpers from './helpers.js'
import airtable from './airtable.js'

export default async function (req, res) {
  try {
    const response = await airtable.request(
      'tematicas',
      {
        onlyPublic: true,
        orderBy: {
          field: 'ORDEN',
        },
      },
      false
    )

    // console.log('response: ', response)

    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(response)
  } catch (e) {
    console.error('Error general: ', e)
    res.statusCode = 500
    res.end(e)
  }
}
