import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";


const Page404 = () => {
    return (
        <div>
            <Helmet>
                <meta
                    name="description"
                    content="Page not found"
                />
                <title>Page not found</title>
            </Helmet>
            <ErrorMessage/>
            <Link to='/'>Return to Homepage</Link>
        </div>
    )
}

export default Page404;