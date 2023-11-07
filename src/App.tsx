import React from 'react';
import {Route, Routes} from "react-router";
import {BrowserRouter} from "react-router-dom";
import Header from "./components/header";
import Main from "./components/main";
import './assets/app.sass'
import DreamRoute from "./components/dreamRoute";


const App = () => {

    const Map: any = () => {};

    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Main/>} />
                <Route path="/route" element={<DreamRoute/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;