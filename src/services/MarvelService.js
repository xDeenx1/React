import { useHTTP } from "../hooks/htttp.hook";

const useMarvelService = () => {
    const {loading, error, request, clearError} = useHTTP();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/characters';
    const _apiKey = 'apikey=4564f847344360f1ae3e9c553d76d20a';
    const _baseOffset = 210;



    const getAllCharacters = async(offset = _baseOffset) => {
        const res = await request(`${_apiBase}?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformChar);
    }

    const getCharacter = async(id) => {
        const res = await request(`${_apiBase}/${id}?${_apiKey}`);
        return _transformChar(res.data.results[0]);
    }

    const _transformChar = (char) => {
        return {
                    id: char.id,
                    name: char.name,
                    descr: char.description ? char.description.slice(0, 210) + '...' : 'There is no description for this character',
                    thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
                    homePage: char.urls[0].url,
                    wiki: char.urls[1].url,
                    comics: char.comics.items
                }
            }

    return {loading, error, clearError, getAllCharacters, getCharacter}
}

export default useMarvelService;