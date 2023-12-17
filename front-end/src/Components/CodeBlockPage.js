import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
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
    const [role, setRole] = useState(null);


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

    // set up socket connection
    useEffect(() => {
        const newSocket = io();
        setSocket(newSocket);
        newSocket.on('role', (receivedRole) => {
            setRole(receivedRole);
        });
        const cleanup = (e) => {
            e.preventDefault();
            e.returnValue = '';
            newSocket.disconnect();
        }
        window.addEventListener('beforeunload', cleanup);
        window.addEventListener('unload', cleanup);
        return () => {
            newSocket.disconnect();
            window.removeEventListener('beforeunload', cleanup);
            window.removeEventListener('unload', cleanup);
        };
    }, []);

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
        if (role === 'student') {
            const newCodeBlock = {
                ...codeBlock,
                code: newCode
            };
            setCodeBlock(newCodeBlock);
            if (socket) {
                socket.emit('updateCodeBlock', newCodeBlock);
            }
        }
    };



    return (
        <div className="container">
            <div className="mb-3">{role === 'mentor' ? 'Hi mentor, you can only read the code' : 'Hi student, you can edit the code'}</div>
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
                    readOnly={role === 'mentor'}
                    className="rounded-3"
                />
                <Link className="text-decoration-none text-white" to={`/`}>
                    <h5 className="card-title">back</h5>
                </Link>
            </div>
        </div>
    );
}

export default CodeBlockPage;
