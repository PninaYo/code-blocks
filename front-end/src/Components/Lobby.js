import React, {useEffect, useState} from "react";
import CodeBlockCard from "./CodeBlockCard";
import {Outlet} from "react-router-dom";
import '../Styles/CodeBlockCard.css';
import axios from "axios";
import {BeatLoader} from "react-spinners";


function Lobby() {
    const [titles, setTitles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // get titles of codes from server
    useEffect(() => {
        setIsLoading(true);
        // Fetching titles when the component mounts
        axios.get(`https://code-blocks-z5h4.onrender.com/api/getTitles`)
            .then(response => {
                console.log('Response:', response.data.titles);
                setTitles(response.data.titles);
            })
            .catch(error => {
                console.error('Error fetching titles:', error);
            })
            // set loading icon
            .finally(()=> setIsLoading(false));
    }, []);

    return (
        <>
            <div className="container">
                <h2 className="display-4 mb-3">Choose code block</h2>
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
