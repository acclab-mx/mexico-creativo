import fetch from 'node-fetch'

class Airtable {
  headers = {
    'Content-Type': 'application/json',
  }

  baseURL = 'https://api.airtable.com/v0/'
  appId = ''
  apiKey = ''

  constructor(args) {
    this.config(args)
  }

  config(args) {
    this.baseURL = args.baseURL ? args.baseURL : this.baseURL
    this.appId = args.appId ? args.appId : this.appId
    this.apiKey = args.apiKey ? args.apiKey : this.apiKey
  }

  request(endpoint, config = {}, stringify) {
    return new Promise((resolve, reject) => {
      let url = `${this.baseURL}${this.appId}`

      if (endpoint) {
        url = `${url}/${endpoint}`
      }

      console.log('baseURL: ', url)

      if (Object.keys(config).length) {
        let urlConfig = ''
        if (config.pageSize) {
          urlConfig = `pageSize=${config.pageSize}&filterByFormula=PUBLICO`
        }
        if (config.offset) {
          urlConfig = `${urlConfig}&offset=${config.offset}`
        }
        url = `${url}?${urlConfig}`
      }

      if (this.apiKey !== '') {
        this.headers.Authorization = `Bearer ${this.apiKey}`
      }

      console.log('fetch url: ', url)
      console.log('fetch headers: ', JSON.stringify(this.headers))

      fetch(url, {
        headers: this.headers,
      })
        .then((result) => {
          console.log('result.status: ', result.status)
          if (result.status === 200) return result.json()
          reject(result)
        })
        .then((data) => {
          if (stringify) {
            const stringData = JSON.stringify(data)
            console.log('data: ', stringData)
            resolve(stringData)
          } else {
            resolve(data)
          }
        })
        .catch((error) => {
          console.error('Error: ', error)
          reject(error)
        })
    })
  }
}

const airtableConfig = {
  appId: process.env.AIRTABLE_APPID,
  apiKey: process.env.AIRTABLE_APIKEY,
}

console.log('Airtable config: ', JSON.stringify(airtableConfig))

const airtable = new Airtable(airtableConfig)

export default airtable

export { Airtable, airtable }
