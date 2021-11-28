import airtable from './airtable.js'
import helpers from './helpers.js'

const pageSize = 9 // items por categoría

const getPageHeader = async (table, field, value) => {
  try {
    let pageHeader = {}

    const page = await airtable.request(
      table,
      {
        filterBy: [
          {
            field,
            value,
          },
        ],
      },
      false
    )

    page.records = page.records.map((field) =>
      helpers.parseFields(table, field)
    )

    pageHeader = page.records[0]
      ? {
          title: page.records[0].nombre,
          description: page.records[0].descripcion,
        }
      : {}

    if (table === 'organizaciones') {
      pageHeader = {
        title: page.records[0].nombre,
        acronym: page.records[0].acronimo,
        logo: page.records[0].logo[0].url,
        link: page.records[0].link,
      }
    }

    return pageHeader
  } catch (e) {
    console.log('getPageHeader error: ', e)
    return {}
  }
}

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
    const response = {
      pageHeader: {},
      records: [],
      offset: 'end',
      count: 0,
    }

    if (parsedQuery.offset !== 'end') {
      const allContentFields = [
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
      ]

      if ('search' in parsedQuery) {
        allContentFields.map((field) =>
          filterBy.push({
            formulaType: 'regex',
            field,
            value: parsedQuery.search,
            optional: true,
          })
        )
      } else {
        if ('etiqueta' in parsedQuery) {
          filterBy.push({
            formulaType: 'regex',
            field: 'etiquetas_orden',
            value: parsedQuery.etiqueta,
          })

          response.pageHeader = await getPageHeader(
            'etiquetas',
            'orden',
            parsedQuery.etiqueta
          )
        }

        if ('autor' in parsedQuery) {
          filterBy.push({
            formulaType: 'regex',
            field: 'autoras_orden',
            value: parsedQuery.autor,
          })

          response.pageHeader = await getPageHeader(
            'autoras',
            'orden',
            parsedQuery.autor
          )
        }

        if ('fuente' in parsedQuery) {
          filterBy.push({
            formulaType: 'regex',
            field: 'fuentes_orden',
            value: parsedQuery.fuente,
          })

          response.pageHeader = await getPageHeader(
            'fuentes',
            'orden',
            parsedQuery.fuente
          )
        }

        if ('organizacion' in parsedQuery) {
          console.log('is organizacion!!!')
          filterBy.push({
            formulaType: 'regex',
            field: 'organizacion_orden',
            value: parsedQuery.organizacion,
          })

          response.pageHeader = await getPageHeader(
            'organizaciones',
            'orden',
            parsedQuery.organizacion
          )
        }

        if ('camposList' in parsedQuery) {
          const camposList = parsedQuery.camposList.split(',')

          camposList.forEach((campos) => {
            filterBy.push({
              field: 'campos_txt',
              value: `"${campos}"`,
              optional: true,
            })
          })

          if (camposList.length === 1) {
            console.log('camposList[0]: ', camposList[0])
            response.pageHeader = await getPageHeader(
              'campos',
              'id',
              `"${camposList[0]}"`
            )
          }
        }

        if ('componente' in parsedQuery) {
          filterBy.push({
            formulaType: 'regex',
            field: 'componentes_orden_txt',
            value: parsedQuery.componente,
            optional: true,
          })

          response.pageHeader = await getPageHeader(
            'componentes',
            'orden',
            parsedQuery.componente
          )
        }
      }

      const contenidos = await airtable.request(
        'contenidos',
        {
          onlyPublic: true,
          fields: allContentFields,
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

      response.records = contenidos.records
      response.offset = contenidos.offset || 'end'
      response.count = contenidos.records.length
    }

    // console.log('response.records: ', response.records)

    // console.log('contenidos: ', contenidos)
    console.log('response.pageHeader: ', response.pageHeader)

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
