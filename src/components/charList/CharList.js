import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        getCharList()
    }, [])

    const onListLoad = (newCharList) => {

        let ended = false;
        if (newCharList.length < 9) {
            ended = true
        }

        setCharList(charList => [...charList, ...newCharList]);
        setLoading(false);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }

    const onError = () => {

        setLoading(false);
        setError(true);
    }

    const getCharList = () => {
        marvelService
        .getAllCharacters()
        .then(onListLoad)
        .catch(onError)
    }

    const onRequest = (offset) => {
        onCharListLoading();
        marvelService
        .getAllCharacters(offset)
        .then(onListLoad)
        .catch(onError)
    }

    const onCharListLoading = () => {

        setNewItemLoading(true);
    }


    // selected item becomes active and possibility to select using keyboard
    
    const itemRefs = useRef([]);

    const selectedItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    // rendering items for charList
    
    const renderItems = (charList) => {
        const items = charList.map((item, i) => {

            let imgStyle = {objectFit : 'cover'};

            if(item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {objectFit: 'unset'}
            }
            
            return (
                <li className="char__item" key={item.id}
                    tabIndex={0}
                    ref={el => itemRefs.current[i] = el}
                    onClick={() => {
                        props.onCharSelect(item.id);
                        selectedItem(i);
                        }}
                    onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharSelect(item.id);
                            selectedItem(i);
                        }
                    }}
                    >
                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(charList);
    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !(error || loading) ? items : null;
    
    return (
        <div className="char__list">
            {spinner}
            {errorMessage}
            {content}
            <button className="button button__main button__long"
                    onClick={() => onRequest(offset)}
                    disabled={newItemLoading}
                    style={{display: charEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
    
}

CharList.propTypes = {
    onCharSelect: PropTypes.func.isRequired
}

export default CharList;