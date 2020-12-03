import airtable from './airtable.js'

const orderBy = (columnName) => (records) => {
  /* por cada record obtener el índice, obtener el record que coincide con el indice + 1 (porque index comienza con cero)
   * Ej. index = 0, obtiene el record con el field {nombre de la columna} = (index + 1), es decir ORDEN = 1
   * Tabla de resultados esperados
   * index | item con el {nombre de la columna} igual a
   * 0     | 1
   * 1     | 2
   * 2     | 3
   * ...   | ...
   * N     | N + 1
   *
   * Nota:
   * filter(i = 1) retorna todos los elementos no falsy de una lista,
   * sirve para eliminar los elementos que hayan generado null por algún fallo en la función filter
   */

  return records
    .map((record, index) => {
      return (
        records.filter(
          (record) => parseInt(record.fields[columnName]) === index + 1
        )[0] || null
      )
    })
    .filter((i) => i)
}

const orderByORDEN = orderBy('ORDEN')

// Obtener la lista de temáticas
export default async function (req, res) {
  try {
    const data = await airtable.request('tematicas', {})

    if (
      'records' in data &&
      Array.isArray(data.records) &&
      data.records.length
    ) {
      // data.records = orderByORDEN(data.records)
    }
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(JSON.stringify(data) + '\n')
  } catch (e) {
    console.error('Error general: ', e)
    res.statusCode = 500
    res.end(e)
  }
}
