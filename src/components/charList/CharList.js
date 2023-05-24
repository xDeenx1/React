import { Component } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.getCharList()
    }

    onListLoad = (charList) => {
        console.log(charList);
        this.setState({charList, loading: false})   
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    getCharList = () => {
        this.marvelService
        .getAllCharacters()
        .then(this.onListLoad)
        .catch(this.onError)
    }

    renderItems = (charList) => {
        const items = charList.map((item) => {

            let imgStyle = {objectFit : 'cover'};

            if(item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {objectFit: 'unset'}
            }
            
            return (
                <li className="char__item" key={item.id}
                    onClick={() => {this.props.onCharSelect(item.id)}}>
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


    render () {
        const {charList, loading, error} = this.state;

        const items = this.renderItems(charList);
        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        const content = !(error || loading) ? items : null;
        
        return (
            <div className="char__list">
                {spinner}
                {errorMessage}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
    
}

CharList.propTypes = {
    onCharSelect: PropTypes.func.isRequired
}

export default CharList;