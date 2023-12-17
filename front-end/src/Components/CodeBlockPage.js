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

    // set up socket connection for client
    useEffect(() => {
        const newSocket = io();
        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        };
    }, []);

    // get code block from server
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

    // listen for code block updates from server
    useEffect(() => {
        if (socket) {
            socket.on('codeBlockUpdated', (updatedCodeBlock) => {
                setCodeBlock(updatedCodeBlock);
            });
        }
    }, [socket]);

    // update code block changes and send code block updates to server
    const handleCodeChange = (newCode) => {
        const newCodeBlock = {
            ...codeBlock,
            code: newCode
        }
        setCodeBlock(newCodeBlock);
        if (socket) {
            socket.emit('updateCodeBlock', newCodeBlock);
        }
    };

    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <h1 className="mb-3">{title}</h1>
                <AceEditor
                    mode="javascript"
                    theme="textmate"
                    onChange={handleCodeChange}
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