import React from 'react';
import { Link } from 'react-router-dom';

function BackToLobby() {
    return (
        <div className="back">
            <Link to={`/`}>
                <img src="/images/backbutton.svg" className="position-absolute top-0 start-0 mt-2" alt="Back" />
            </Link>
        </div>
    );
}
export default BackToLobby;
