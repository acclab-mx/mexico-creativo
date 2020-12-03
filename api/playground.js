import airtable from './airtable.js'

const pageSize = 50

const mapPropuestas = (p) => {
  const r = {
    id: p.id,
    topicId: p.fields.TEMATICA[0],
    title: p.fields.PROPUESTA,
    description: p.fields.DESCRIPCION_CORTA,
  }

  if (p.fields.AUTORA_TXT && p.fields.AUTORA_TXT.length)
    r.autoras = p.fields.AUTORA_TXT.split(',').filter((i) => i && i.length)

  if (p.fields.ORGANIZACION_TXT && p.fields.ORGANIZACION_TXT.length)
    r.organizacion = p.fields.ORGANIZACION_TXT.split(',').filter(
      (i) => i && i.length
    )

  if (
    p.fields.CONCEPTOS_RELACIONADOS_TXT &&
    p.fields.CONCEPTOS_RELACIONADOS_TXT.length
  )
    r.conceptos = p.fields.CONCEPTOS_RELACIONADOS_TXT.split(',').filter(
      (i) => i && i.length
    )

  if (p.fields.FOTOGRAFIA && p.fields.FOTOGRAFIA.length)
    r.image = p.fields.FOTOGRAFIA[0].url

  if (p.fields.LINK) r.link = p.fields.LINK

  return r
}

const mapCitas = (c) => {
  const r = {
    id: c.id,
    topicId: c.fields.TEMATICA[0],
    title: c.fields.CITA,
    description: c.fields.AUTORA,
  }

  if (c.fields.FUENTE_TXT && c.fields.FUENTE_TXT.length)
    r.autoras = c.fields.FUENTE_TXT.split(',').filter((i) => i && i.length)

  if (c.fields.ORGANIZACION_TXT && c.fields.ORGANIZACION_TXT.length)
    r.organizacion = c.fields.ORGANIZACION_TXT.split(',').filter(
      (i) => i && i.length
    )

  if (
    c.fields.CONCEPTOS_RELACIONADOS_TXT &&
    c.fields.CONCEPTOS_RELACIONADOS_TXT.length
  )
    r.conceptos = c.fields.CONCEPTOS_RELACIONADOS_TXT.split(',').filter(
      (i) => i && i.length
    )

  if (c.fields.FOTO && c.fields.FOTO.length) r.image = c.fields.FOTO[0].url

  return r
}

const mapEstudios = (e) => {
  const r = {
    id: e.id,
    topicId: e.fields.TEMATICA[0],
    title: e.fields.ESTUDIO,
    description: e.fields.DESCRIPCION,
  }

  if (e.fields.FUENTE_TXT && e.fields.FUENTE_TXT.length)
    r.autoras = e.fields.FUENTE_TXT.split(',').filter((i) => i && i.length)

  if (e.fields.ORGANIZACION_TXT && e.fields.ORGANIZACION_TXT.length)
    r.organizacion = e.fields.ORGANIZACION_TXT.split(',').filter(
      (i) => i && i.length
    )

  if (
    e.fields.CONCEPTOS_RELACIONADOS_TXT &&
    e.fields.CONCEPTOS_RELACIONADOS_TXT.length
  )
    r.conceptos = e.fields.CONCEPTOS_RELACIONADOS_TXT.split(',').filter(
      (i) => i && i.length
    )

  if (e.fields.FOTOGRAFIA && e.fields.FOTOGRAFIA.length)
    r.image = e.fields.FOTOGRAFIA[0].url

  if (e.fields.LINK) r.link = e.fields.LINK

  return r
}

const mapConceptos = (c) => {
  const r = {
    id: c.id,
    topicId: c.fields.TEMATICA[0],
    title: c.fields.CONCEPTO,
    description: c.fields.DEFINICION,
  }

  if (c.fields.FUENTE_TXT && c.fields.FUENTE_TXT.length)
    r.fuentes = c.fields.FUENTE_TXT.split(',').filter((i) => i && i.length)

  if (c.fields.AUTORA_TXT && c.fields.AUTORA_TXT.length)
    r.autoras = c.fields.AUTORA_TXT.split(',').filter((i) => i && i.length)

  /* if (c.fields.ORGANIZACION_TXT && c.fields.ORGANIZACION_TXT.length)
    r.organizacion = c.fields.ORGANIZACION_TXT.split(',').filter(i => i && i.length) */

  if (c.fields.FOTOGRAFIA && c.fields.FOTOGRAFIA.length)
    r.image = c.fields.FOTOGRAFIA[0].url

  return r
}

// Obtener la lista de temáticas
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
      : {
          categoryList: [],
        }

    console.log('parsedQuery: ', parsedQuery)

    let propuestasList = []
    let propuestasOffset = parsedQuery.offsetPropuestas
    if (
      parsedQuery.categoryList.includes('propuestas') &&
      parsedQuery.offsetPropuestas !== 'end'
    ) {
      const propuestas = await airtable.request('propuestas', {
        pageSize,
        offset: parsedQuery.offsetPropuestas,
        topicId: parsedQuery.topicId,
      })
      propuestasList = propuestas.records.map(mapPropuestas) || []
      propuestasOffset = propuestas.offset || 'end'
    }

    let citasList = []
    let citasOffset = parsedQuery.offsetCitas
    if (
      parsedQuery.categoryList.includes('citas') &&
      parsedQuery.offsetCitas !== 'end'
    ) {
      const citas = await airtable.request('citas', {
        pageSize,
        offset: parsedQuery.offsetCitas,
        topicId: parsedQuery.topicId,
      })
      citasList = citas.records.map(mapCitas) || []
      citasOffset = citas.offset || 'end'
    }

    let estudiosList = []
    let estudiosOffset = parsedQuery.offsetEstudios
    if (
      parsedQuery.categoryList.includes('estudios') &&
      parsedQuery.offsetEstudios !== 'end'
    ) {
      const estudios = await airtable.request('estudios', {
        pageSize,
        offset: parsedQuery.offsetEstudios,
        topicId: parsedQuery.topicId,
      })
      estudiosList = estudios.records.map(mapEstudios) || []
      estudiosOffset = estudios.offset || 'end'
    }

    let conceptosList = []
    let conceptosOffset = parsedQuery.offsetConceptos
    if (
      parsedQuery.categoryList.includes('conceptos') &&
      parsedQuery.offsetConceptos !== 'end'
    ) {
      const conceptos = await airtable.request('conceptos', {
        pageSize,
        offset: parsedQuery.offsetConceptos,
        topicId: parsedQuery.topicId,
      })
      conceptosList = conceptos.records.map(mapConceptos) || []
      conceptosOffset = conceptos.offset || 'end'
    }

    const cards = []

    const maxLen = Math.max(
      propuestasList.length,
      citasList.length,
      estudiosList.length,
      conceptosList.length
    )

    console.log('maxLen: ', maxLen)

    for (let i = 0; i < maxLen; i++) {
      if (propuestasList[i])
        cards.push({ ...propuestasList[i], category: 'Propuestas' })
      if (citasList[i]) cards.push({ ...citasList[i], category: 'Citas' })
      if (estudiosList[i])
        cards.push({ ...estudiosList[i], category: 'Estudios' })
      if (conceptosList[i])
        cards.push({ ...conceptosList[i], category: 'Conceptos' })
    }

    const lastCards = parsedQuery.topicId
      ? cards.filter((c) => c.topicId === parsedQuery.topicId)
      : cards

    const response = {
      cards: lastCards,
      offsets: {
        propuestas: propuestasOffset,
        citas: citasOffset,
        estudios: estudiosOffset,
        conceptos: conceptosOffset,
      },
      count: lastCards.length,
    }

    console.log('response: ', response)

    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(JSON.stringify(response) + '\n')
  } catch (e) {
    console.error('Error general: ', e)
    res.statusCode = 500
    res.end(e)
  }
}
