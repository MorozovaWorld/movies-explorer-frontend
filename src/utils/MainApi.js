class MainApi {
  constructor(config) {
    this._authUrl = config.baseAuthUrl;
    this._singupUrl = config.singupUrl;
    this._singinUrl = config.singinUrl;

    this._url = config.baseUrl;
    this._moviesUrl = config.moviesUrl;
    this._usersUrl = config.usersUrl;
    this._userUrl = config.userUrl;
    this._token = localStorage.getItem('jwt');
  }

  _getToken = () => {
    this._token = localStorage.getItem("jwt");
  };

  register(name, email, password) {
    return fetch(`${this._authUrl}${this._singupUrl}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })
    .then((res) => res.ok ? res.json() : res);
  }

  authorize(email, password) {
    return fetch(`${this._authUrl}${this._singinUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then((res) => res.ok ? res.json() : res);
  }

  _resProcess(res) {
    return res.ok ? res.json() : Promise.reject(new Error(`Ошибка: ${res.status}, ${res.statusText}`));
  }

  getUserInfo(token) {
    return fetch(`${this._url}${this._usersUrl}${this._userUrl}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(this._resProcess);
  }

  setUserInfo(email, name) {
    if (this._token === null) {
      this._getToken()
    }

    return fetch(`${this._url}${this._usersUrl}${this._userUrl}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._token}`,
      },
      body: JSON.stringify({ email, name })
    })
    .then((res) => res.ok ? res.json() : res);
  }

  getSavedMovies(token) {
    return fetch(`${this._url}${this._moviesUrl}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(this._resProcess);
  };
  
  saveMovie(data) {
    if (this._token === null) {
      this._getToken()
    }

    return fetch(`${this._url}${this._moviesUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._token}`,
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: `${'https://api.nomoreparties.co'}${data.image.url}`,
        trailer: data.trailerLink,
        thumbnail: `${'https://api.nomoreparties.co'}${data.image.formats.thumbnail.url}`,
        movieId: data.id.toString(),
        nameRU: data.nameRU,
        nameEN: data.nameEN
      })
    })
    .then(this._resProcess);
  };

  deleteMovie(movieId) {
    return fetch(`${this._url}${this._moviesUrl}/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._token}`,
      },
    })
    .then(this._resProcess);
  }
}

const mainApi = new MainApi({
  // baseAuthUrl: `${window.location.protocol}${'//api.movies-morozova.nomoredomains.club' || '//localhost:3001'}`,
  baseAuthUrl: 'https://api.movies-morozova.nomoredomains.club',

  singupUrl: '/signup',
  singinUrl: '/signin',

  // baseUrl: `${window.location.protocol}${'//api.movies-morozova.nomoredomains.club' || '//localhost:3001'}`,
  baseUrl: 'https://api.movies-morozova.nomoredomains.club',

  moviesUrl: '/movies',
  usersUrl: '/users',
  userUrl: '/me',
});

export default mainApi;