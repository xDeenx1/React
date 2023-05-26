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
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.getCharList()
    }

    onListLoad = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true
        }


        this.setState(({charList, offset}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        })) 
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

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService
        .getAllCharacters(offset)
        .then(this.onListLoad)
        .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }


    // selected item becomes active and possibility to select using keyboard
    
    itemRefs = [];

    setRef = (ref) => {
        this.itemRefs.push(ref);
    }

    selectedItem = (id) => {
        this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemRefs[id].classList.add('char__item_selected');
        this.itemRefs[id].focus();
    }

    // rendering items for charList
    
    renderItems = (charList) => {
        const items = charList.map((item, i) => {

            let imgStyle = {objectFit : 'cover'};

            if(item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {objectFit: 'unset'}
            }
            
            return (
                <li className="char__item" key={item.id}
                    tabIndex={0}
                    ref={this.setRef}
                    onClick={() => {
                        this.props.onCharSelect(item.id);
                        this.selectedItem(i);
                        }}
                    onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            this.props.onCharSelect(item.id);
                            this.selectedItem(i);
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


    render () {
        const {charList, loading, error, offset, newItemLoading, charEnded} = this.state;

        const items = this.renderItems(charList);
        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        const content = !(error || loading) ? items : null;
        
        return (
            <div className="char__list">
                {spinner}
                {errorMessage}
                {content}
                <button className="button button__main button__long"
                        onClick={() => this.onRequest(offset)}
                        disabled={newItemLoading}
                        style={{display: charEnded ? 'none' : 'block'}}>
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