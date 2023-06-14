import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './singleComicLayout.scss';

const SingleComicLayot = ({data}) => {
    const {title, description, pageCount, prices, thumbnail, languages} = data;

    return (
        <div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content={`${title} comics book`}
                />
                <title>{title}</title>
            </Helmet>
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

export default SingleComicLayot;