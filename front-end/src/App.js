import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Lobby from "./Components/Lobby";
import CodeBlockPage from "./Components/CodeBlockPage";

function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <img src="/images/CODE.svg" alt="logo" width="185" height="185"/>
                <Routes path="/">
                    <Route path="/" element={<Lobby/>}/>
                    <Route path="/codeBlockPage/:title" element={<CodeBlockPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
