import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import AceEditor from "react-ace";
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-javascript';
import "ace-builds/src-noconflict/theme-textmate";
import io from 'socket.io-client';
import "./CodeBlockPage.css";

function CodeBlockPage() {
    const { title } = useParams();
    const [codeBlock, setCodeBlock] = useState({});
    const [socket, setSocket] = useState(null);
    const [role, setRole] = useState(null);
    const [codeCorrect, setCodeCorrect] = useState(false);


    // get code block from server
    useEffect(() => {
        axios.get(`/api/getCodeBlock/${title}`)
            .then(response => {
                const newb = response.data;
                console.log('Response:', response.data);
                setCodeBlock(newb);
                if(newb.code === newb.correctCode){
                    setCodeCorrect(true);
                }
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
        newSocket.on('codeCorrect',() => {
            setCodeCorrect(true);

        });
        newSocket.on('codeNotCorrect',() => {
            setCodeCorrect(false);

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
            <div className="mb-2">{role === 'mentor' ? 'Hi mentor, you can only read the code' : 'Hi student, you can edit the code'}</div>
            <div className="row d-flex justify-content-center">
                {codeCorrect && (
                    <div className="col-md-4">
                        <img src="/images/smile.png" style={{ width: '100px', height: '70px' }} alt="Smile" />
                    </div>
                )}
                <h2 className="display-6 mb-2">{title}</h2>
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
                <div className="back">
                    <Link to={`/`}>
                        <img src="/images/backbutton.svg" className="position-absolute top-0 start-0" style={{ width: '100px', height: '70px' }}></img>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CodeBlockPage;
