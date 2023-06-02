import { useState, useEffect, useRef } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';


const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);
    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onListLoad = (newComicsList) => {
        let ended = false;
        if(newComicsList.length < 8) {
            ended = true;
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 8);
        setComicsEnded(ended);
    }

    const onRequest = (offset,initial) => {
         
        initial ? setNewItemLoading(false) : setNewItemLoading(true);

        console.log(offset);

        getAllComics(offset)
            .then(onListLoad)
    }

    const itemRefs = useRef([]);

    const renderItems = (comicsList) => {
        console.log(comicsList);
        const items = comicsList.map((item, i) => {

            return (
                <li className="comics__item" key={item.id}
                    tabIndex={0}
                    ref={el => itemRefs.current[i] = el }>
                    <a href="#">
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.prices ? item.prices : `Not available`}</div>
                    </a>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(comicsList);
    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;


    return (
        <div className="comics__list">
            {spinner}
            {errorMessage}
            {items}
            <button className="button button__main button__long" onClick={() => onRequest(offset)}
            disabled={newItemLoading}
            style={{display: comicsEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;