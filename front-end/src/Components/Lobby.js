import React from "react";
import CodeBlockCard from "./CodeBlockCard";
import {Outlet} from "react-router-dom";
import './Card.css';

function Lobby({titles}) {
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
            </div>
            <Outlet />
        </>
    );
}

export default Lobby;
