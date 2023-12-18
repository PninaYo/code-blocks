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

    // get code block from server by title
    useEffect(() => {
        axios.get(`/api/getCodeBlock/${title}`)
            .then(response => {
                const code = response.data.code;
                setCodeBlock({code});
            })
            .catch(error => {
                console.error('Error fetching codeBlock:', error);
            });
    }, [title]);
    // set up socket connection
    useEffect(() => {
        const newSocket = io();
        setSocket(newSocket);

        // set the role - mentor or student
        newSocket.on('role', (receivedRole) => {
            setRole(receivedRole);
        });

        // check if code correct and update smile icon
        newSocket.on('codeCorrect',() => {
            setCodeCorrect(true);
        });
        newSocket.on('codeNotCorrect',() => {
            setCodeCorrect(false);
        });

        // disconnect socket
        const cleanup = (e) => {
            e.preventDefault();
            e.returnValue = '';
            newSocket.disconnect();
        }
        // disconnect when closing window
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

    // update code block changes from student and send code block updates to server
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
                        <img src="/images/smile.png" style={{ width: '70px', height: '30px' }} alt="Smile" />
                    </div>
                )}
                <h3 className="display-6 mb-1">{title}</h3>
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
                        <img src="/images/backbutton.svg" className="position-absolute top-0 start-0 mt-2"></img>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CodeBlockPage;