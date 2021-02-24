import airtable from './airtable.js'
import helpers from './helpers.js'

const pageSize = 100 // items por categoría

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

    const filterBy = []

    // Se crea la respuesta, los valores por defecto son en caso de que se haya llegado al fin de la lista
    let response = {
      records: [],
      offset: 'end',
      count: 0,
    }

    if (parsedQuery.offset !== 'end') {
      if ('id' in parsedQuery) {
        filterBy.push({
          formulaType: 'regex',
          field: 'etiquetas_orden',
          value: parsedQuery.id,
          optional: true
        })
      }

      const contenidos = await airtable.request(
        'contenidos',
        {
          onlyPublic: true,
          fields: [
            'titulo',
            'portada',
            'descripcion',
            'enlace',
            'autoras',
            'autoras_txt',
            'fuentes',
            'fuentes_txt',
            'organizacion',
            'organizacion_txt',
            'campos',
            'campos_txt',
            'campos_orden_txt',
            'componentes',
            'componentes_txt',
            'componentes_orden_txt',
            'etiquetas',
            'etiquetas_orden',
            'etiquetas_txt',
            'orden',
          ],
          filterBy,
          orderBy: {
            field: 'orden',
          },
          pageSize,
          offset: parsedQuery.offset,
        },
        false
      )

      contenidos.records = contenidos.records
        .map((field) => helpers.parseFields('contenidos', field))
        .map((r) => ({
          ...r,
          portada: r.portada ? r.portada[0].url : null,
        }))

      response = contenidos
    }

    response.offset = response.offset || 'end'
    response.count = response.records.length

    // console.log('response.records: ', response.records)

    // console.log('contenidos: ', contenidos)

    console.log('response.offset: ', response.offset)
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
