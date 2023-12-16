import './App.css';
import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Lobby from "./Components/Lobby";
import axios from 'axios';
import CodeBlockPage from "./Components/CodeBlockPage";
import {BeatLoader} from "react-spinners";


function App() {
    const [titles, setTitles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios.get('/api/getTitles')
            .then(response => {
                console.log('Response:', response.data.titles);
                setTitles(response.data.titles);
            })
            .catch(error => {
                console.error('Error fetching titles:', error);
            })
            .finally(()=> setIsLoading(false));
    }, []);

    return (
        <div className="App">
            <BrowserRouter>
                <img src="/images/CODE.svg" alt="logo" width="185" height="185"/>
                <Routes path="/">
                    <Route path="/" element={<Lobby titles={titles}/>}/>
                    <Route path="/codeBlockPage/:title" element={<CodeBlockPage/>}/>
                </Routes>
            </BrowserRouter>
            {isLoading && <BeatLoader
                color="#36bed6"
                size={30}
            />}
        </div>
    );
}

export default App;
