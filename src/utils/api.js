class Api {
    constructor({ baseUrl, headers }) {  
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

    _handleResponse(res) {
        if (res.ok) return res.json();
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getGames() {        
        return fetch(this._baseUrl, {
            method: 'GET',
            
            headers: this._headers,
        })
        .then((res) => this._handleResponse(res));
    }

    
}

const api = new Api({
    baseUrl: 'https://api.rawg.io/api/games?key=d7e0b61b08524995bb85e38edfb69fb4&dates=2019-09-01,2019-09-30&platforms=18,1,7',
    headers: { 
      'Content-Type': 'application/json',
    },
});

export default api;