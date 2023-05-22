import { Component } from 'react';

import Spinner from '../spinner/Spinner';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

import MarvelService from '../../services/MarvelService';

class RandomChar extends Component {

    state = {
        char: {},
        loading: true
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    onCharLoad = (char) => {
        this.setState({char, loading: false})
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoad)
            .catch(this.updateChar)
    }


    render() {
        const {char, loading} = this.state;

        return (
            <div className="randomchar">
                {loading ? <Spinner/> : <View char={char}/>}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={this.updateChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, descr, thumbnail, homePage, wiki} = char;
    const imgNotFound = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    
    return (
        <div className="randomchar__block">
                    <img src={thumbnail} style={thumbnail === imgNotFound ? {objectFit: 'contain'} : null} alt="Random character" className="randomchar__img"/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                           {descr}
                        </p>
                        <div className="randomchar__btns">
                            <a href={homePage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
    )
}

export default RandomChar;