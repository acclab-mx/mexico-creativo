import helpers from './helpers.js'
import airtable from './airtable.js'

// console.log('helpers: ', helpers);

// Obtener la lista de componentes
export default async function (req, res) {
  try {
    const componentes = await airtable.request(
      'componentes',
      {
        onlyPublic: true,
        fields: ['nombre', 'id', 'orden', 'descripcion'],
        orderBy: {
          field: 'orden',
        },
      },
      false
    )

    componentes.records = componentes.records.map((field) =>
      helpers.parseFields('componentes', field)
    )

    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(JSON.stringify(componentes) + '\n')
  } catch (e) {
    console.error('Error general: ', e)
    res.statusCode = 500
    res.end(e)
  }
}
