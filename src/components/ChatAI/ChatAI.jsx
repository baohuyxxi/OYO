import './ChatAI.scss';
import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function ChatAI({ onClose }) {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');

    // Hàm để tải script Dialogflow khi component được mount
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
        script.async = true;
        document.body.appendChild(script);

        // Cleanup script khi component unmount
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        // <div className="chat-ai paper">
        //     {/* <div className="chat-ai__messages">
        //         <div className="chat-ai__message chat-ai__message--bot">{response}</div>
        //         <textarea
        //             value={input}
        //             onChange={(e) => setInput(e.target.value)}
        //             placeholder="Type your prompt here..."
        //             className="chat-ai__textarea"
        //         />
        //         <button className="chat-ai__button">Send</button>
        //     </div> */}
        //     <df-messenger
        //         intent="WELCOME"
        //         chat-title="OYO-AI-CHAT"
        //         agent-id="87607474-856f-4b85-aeef-c146b271cb9f"
        //         language-code="vi"
        //     ></df-messenger>
        // </div>
           <df-messenger
                intent="WELCOME"
                chat-title="OYO-AI-CHAT"
                agent-id="87607474-856f-4b85-aeef-c146b271cb9f"
                language-code="vi"
            ></df-messenger>
    );
}
