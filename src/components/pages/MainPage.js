import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundart";
import decoration from '../../resources/img/vision.png';

const MainPage = () => {
    
    const [selectedChar, setChar] = useState();

    const onCharSelect = (id) => {
        setChar(id)
    }

    return (
        <>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelect={onCharSelect}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharInfo charID={selectedChar}/>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )

}

export default MainPage;