import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AceEditor from "react-ace";
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-javascript';
import "ace-builds/src-noconflict/theme-textmate";

import io from 'socket.io-client';


function CodeBlockPage() {
    const { title } = useParams();
    const [codeBlock, setCodeBlock] = useState({});
    const [socket, setSocket] = useState(null);
    const [isMentor, setIsMentor] = useState(false);



    useEffect(() => {
        axios.get(`/api/getCodeBlock/${title}`)
            .then(response => {
                console.log('Response:', response.data);
                setCodeBlock(response.data);

            })
            .catch(error => {
                console.error('Error fetching codeBlock:', error);
            });
    }, [title]);

    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <h1 className="mb-3">{title}</h1>
                <AceEditor
                    mode="javascript"
                    theme="textmate"
                   // onChange={this.onChange}
                    fontSize={14}
                    value={codeBlock.code}
                    setOptions={{
                        useWorker: false
                    }}
                    className="rounded-3"
                />
            </div>
        </div>
    );
}

export default CodeBlockPage;
