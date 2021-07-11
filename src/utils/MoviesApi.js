class MoviesApi {
  constructor(config) {
    this._url = config.baseUrl;
  }

  getInitialContent() {
    return fetch(`${this._url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(this._resProcess);
  }

  _resProcess(res) {
    return res.ok ? res.json() : Promise.reject(new Error(`Ошибка: ${res.status}, ${res.statusText}`));
  }
}

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
});

export default moviesApi;