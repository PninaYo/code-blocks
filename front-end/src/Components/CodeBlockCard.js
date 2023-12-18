import React from "react";
import {Link} from "react-router-dom";
import '../Styles/CodeBlockCard.css';

function CodeBlockCard({title}) {
    return (
        <div className="card">
            <div className="card-body">
                <Link className="text-decoration-none text-white" to={`/codeBlockPage/${title}`}>
                    <h5 className="card-title">{title}</h5>
                </Link>
            </div>
        </div>
    );
}

export default CodeBlockCard;
