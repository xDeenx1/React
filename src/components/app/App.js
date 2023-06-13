import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const AppHeader = lazy(() => import ("../appHeader/AppHeader")) ;
const MainPage = lazy(() => import ("../pages/MainPage"));
const ComicsPage = lazy(() => import ("../pages/ComicsPage"));
const Page404 = lazy(() => import ("../pages/Page404"));
const SinglePage = lazy(() => import ("../pages/SinglePage"));
const SingleCharLayot = lazy(() => import ("../pages/SingleCharLayout/SingleCharLayout"));
const SingleComicLayot = lazy(() => import ("../pages/SingleComicLayout/SingleComicLayout"));

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
                            <Route path='/comics/:id' element={<SinglePage Component={SingleComicLayot} dataType='comic'/>}/>
                            <Route path='/characters/:id' element={<SinglePage Component={SingleCharLayot} dataType='character'/>}/>
                            <Route path='*' element={<Page404/>}/>                        
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;