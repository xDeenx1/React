import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useMarvelService from '../../../services/MarvelService';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import AppBanner from '../../appBanner/AppBanner';

import './singleComicPage.scss';

const SingleComicPage = () => {
    const [comic,setComic] = useState({});
    const {comicID} = useParams();
    const {getComic, loading, error} = useMarvelService();

    const updateComic = () => {
        const id = comicID;

        getComic(id)
            .then(onComicLoad)
    }

    const onComicLoad = (comic) => {
        setComic(comic);
    }

    useEffect(() => {
        updateComic()
    }, [])

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !(error || loading) ? <View comic={comic}/> : null;

    return (
        <>
            <AppBanner/>
            {spinner}
            {errorMessage}
            {content}
        </>
    )
}

const View = ({comic}) => {
    const {title, description, pageCount, prices, thumbnail, languages} = comic;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {languages}</p>
                <div className="single-comic__price">{prices}</div>
            </div>
            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;