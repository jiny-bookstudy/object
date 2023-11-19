class FetchController {
  #baseUrl = '';

  constructor(baseUrl) {
    this.#baseUrl = baseUrl;
  }

  async get(url = '') {
    const requestUrl = `${this.#baseUrl}${url}`;
    const responseData = await fetch(requestUrl).then((response) => response.json());
    return responseData;
  }
}

export default FetchController;
