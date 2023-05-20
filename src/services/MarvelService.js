

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

    getAllCharacters = async() => {
        const res = await this.getResources(`${this._apiBase}?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformChar);
    }

    getCharacter = async(id) => {
        const res = await this.getResources(`${this._apiBase}/${id}?${this._apiKey}`);
        return this._transformChar(res.data.results[0]);
    }

    _transformChar = (char) => {
        return {
                    name: char.name,
                    descr: char.description,
                    thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
                    homePage: char.urls[0].url,
                    wiki: char.urls[1].url
                }
            }
}

export default MarvelService;