import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const AppHeader = lazy(() => import ("../appHeader/AppHeader")) ;
const MainPage = lazy(() => import ("../pages/MainPage"));
const ComicsPage = lazy(() => import ("../pages/ComicsPage"));
const Page404 = lazy(() => import ("../pages/Page404"));
const SingleComicPage = lazy(() => import ("../pages/SingleCmicPage/SingleComicPage"));

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense>
                        <Routes>
                            <Route path='/' element={<MainPage/>}/>
                            <Route path='/comics' element={<ComicsPage/>}/>
                            <Route path='/comics/:comicID' element={<SingleComicPage/>}/>
                            <Route path='*' element={<Page404/>}/>                        
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;