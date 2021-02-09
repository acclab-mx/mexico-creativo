const parseTXT = (field, value) =>
  field.includes('_TXT') ? value.split(',') : value

const parseFields = (table, record) => {
  // console.log('record: ', record)
  const fields = Object.keys(record.fields).reduce(
    (fields, field) => ({
      ...fields,
      [field.toLowerCase()]: Array.isArray(record.fields[field])
        ? record.fields[field].flat()
        : parseTXT(field, record.fields[field]),
    }),
    []
  )
  // console.log('fields: ', JSON.stringify(fields, null, 2))
  const parsedRecord = {
    table,
    id: record.id,
    ...fields,
    createdTime: record.createdTime,
  }
  return parsedRecord
}

export default {
  parseTXT,
  parseFields,
}
