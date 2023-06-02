import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";
import ErrorBoundary from "../errorBoundary/ErrorBoundart";
import decoration from '../../resources/img/vision.png';


const ComicsPage = () => {

    return (
        <>
            <ErrorBoundary/>
                <AppBanner/>
                <ComicsList/>
            <ErrorBoundary/>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default ComicsPage;