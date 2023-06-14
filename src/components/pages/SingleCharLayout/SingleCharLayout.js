import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './singleCharLayout.scss';

const SingleCharLayot = ({data}) => {
    const {name, descr, thumbnail} = data;

    return (
        <div className="single-char">
            <Helmet>
                <meta
                    name="description"
                    content={`${name} page`}
                />
                <title>{name}</title>
            </Helmet>
            <img src={thumbnail} alt={name} className="single-char__img"/>
            <div className="single-char__info">
                <h2 className="single-char__name">{name}</h2>
                <p className="single-char__descr">{descr}</p>
            </div>
            <Link to='/' className="single-comic__back">Back to Main-page</Link>
        </div>
    )
}

export default SingleCharLayot;