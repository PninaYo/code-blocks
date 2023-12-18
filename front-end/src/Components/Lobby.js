import React, {useEffect, useState} from "react";
import CodeBlockCard from "./CodeBlockCard";
import {Outlet} from "react-router-dom";
import './Card.css';
import axios from "axios";
import {BeatLoader} from "react-spinners";

function Lobby() {
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
        <>
            <div className="container">
                <h1 className="display-4 mb-4">Choose code block</h1>
                <div className="row d-flex justify-content-center ">
                    <div className="col-md-8">
                        <div className="row g-3">
                            {titles.map((elem, index) => (
                                <div key={index} className="col-md-6">
                                    <CodeBlockCard title={elem.title} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {isLoading && <BeatLoader
                    color="#693C9E"
                    size={30}
                />}
            </div>
            <Outlet />
        </>
    );
}

export default Lobby;
