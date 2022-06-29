class TenorApi {
  private _tenorUrl: string = "https://tenor.googleapis.com/v2/"
  private _apiKey: string
  private _clientKey: string

  constructor(apiKey: string, clientKey: string) {
    this._apiKey = apiKey
    this._clientKey = clientKey
  }

  fillKeys() {
    return `&key=${this._apiKey}&client_key=${this._clientKey}`
  }

  async searchGif(searchTerm: string, limit: number) {
    const response = await fetch(`${this._tenorUrl}search?q=${searchTerm}${this.fillKeys()}&limit=${limit}`)
    return await response.json()
  }
  async featuredGif(limit: number, pos?: string) {
    let url = `${this._tenorUrl}featured?${this.fillKeys()}&limit=${limit}`
    if (pos) {
      url = `${url}&pos=${pos}`
    }
    const response = await fetch(url)
    return await response.json()
  }
}
const apiKey = "AIzaSyBnSXAasihVw1rdaJwKWBzWp1m0KXFIql4"
const clientKey = "gif_dashboard"
const tenorApi = new TenorApi(apiKey, clientKey)

export { tenorApi }