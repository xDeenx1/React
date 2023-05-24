import { Component } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charInfo.scss';


class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    onCharLoading = () => {
        this.setState({loading: true})
    }

    onCharLoad = (char) => {
        this.setState({
            char, 
            loading: false
        })
    }

    onError = () => {
        this.setState({
            error: true, 
            loading: false
        })
    }

    updateChar = () => {
        const {charID} = this.props;
        if(!charID) return;

        this.onCharLoading();

        this.marvelService
            .getCharacter(charID)
            .then(this.onCharLoad)
            .catch(this.onError)
    }

    componentDidUpdate(prevProps) {
        if(this.props.charID !== prevProps.charID) {
            this.updateChar();
        }
    }

    render() {
        const {char, loading, error} = this.state;

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
}

const View = ({char}) => {
    const {name, descr, thumbnail, homepage, wiki, comics} = char;

    return (
        <>
                <div className="char__basics">
                    <img src={thumbnail} alt={name}/>
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

CharInfo.PropTypes = {
    charID: PropTypes.number
}

export default CharInfo;