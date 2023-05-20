

class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/characters';
    _apiKey = 'apikey=4564f847344360f1ae3e9c553d76d20a'

    getResources = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, request status: ${res.status}`);
        };

        return await res.json();
    }

    getAllCharacters = () => {
        return this.getResources(`${this._apiBase}?limit=9&offset=210&${this._apiKey}`);
    }

    getCharacter = (id) => {
        return this.getResources(`${this._apiBase}/${id}?${this._apiKey}`);
    }
}

// For test
export default MarvelService;