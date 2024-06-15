import './ChatAI.scss';
import { useState, useEffect } from 'react';

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
        <df-messenger
            intent="WELCOME"
            chat-title="OYO-AI-CHAT"
            agent-id="87607474-856f-4b85-aeef-c146b271cb9f"
            language-code="vi"
        ></df-messenger>
    );
}
