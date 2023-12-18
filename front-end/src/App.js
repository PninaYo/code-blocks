import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Lobby from "./Components/Lobby";
import CodeBlockPage from "./Components/CodeBlockPage";

function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <img className="logo" src="/images/LOGO.svg" alt="logo"/>
                <Routes path="/">
                <Route path="/" element={<Lobby/>}/>
                <Route path="/codeBlockPage/:title" element={<CodeBlockPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default App;
