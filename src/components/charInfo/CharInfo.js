import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charInfo.scss';


const CharInfo = (props) => {

    const [char, setChar] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar();
    }, [])

    const onCharLoading = () => {
        setLoading(true)
    }

    const onCharLoad = (char) => {
        setChar(char);
        setLoading(false);
    }

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const updateChar = () => {
        const {charID} = props;
        if(!charID) return;

        onCharLoading();

        marvelService
            .getCharacter(charID)
            .then(onCharLoad)
            .catch(onError)
    }

    useEffect(() => {
        updateChar();
    }, [props.charID])

        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        const skeleton = char || error || loading ? null : <Skeleton/>;
        const content = !(error || loading || !char) ? <View char={char}/> : null;

        return (
            <div className="char__info">
                {spinner}
                {errorMessage}
                {skeleton}
                {content}
            </div>
        )
}

const View = ({char}) => {
    const {name, descr, thumbnail, homepage, wiki, comics} = char;

    let imgStyle = {objectFit : 'cover'};

    if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {objectFit: 'unset'}
    }

    return (
        <>
                <div className="char__basics">
                    <img src={thumbnail} alt={name} style={imgStyle}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">Homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {descr}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comics.length > 0 ? null : "There are no comics found for this character."}
                    {
                        comics.map((item,i) => {
                            if(i > 9) return;
                            return (
                                <li key={i} className="char__comics-item">
                                    <a href={item.resourceURI}>{item.name}</a>
                                </li>
                            )
                        })
                    }
                </ul>            
        </>
    )
}

CharInfo.propTypes = {
    charID: PropTypes.number
}

export default CharInfo;