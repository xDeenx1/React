import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";
import ErrorBoundary from "../errorBoundary/ErrorBoundart";
import decoration from '../../resources/img/vision.png';
import { Helmet } from "react-helmet";


const ComicsPage = () => {

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel comics page"
                />
                <title>Marvel comics</title>
            </Helmet>
            <ErrorBoundary/>
                <AppBanner/>
                <ComicsList/>
            <ErrorBoundary/>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default ComicsPage;