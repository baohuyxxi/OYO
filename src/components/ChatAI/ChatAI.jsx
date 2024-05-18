import './ChatAI.scss';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function ChatAI({ onClose }) {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const callApi = async () => {
        try {
            const result = await axios.post(
                'https://api.openai.com/v1/completions', // Sử dụng endpoint miễn phí
                {
                    model: 'text-davinci-003', // Sử dụng một trong các mô hình miễn phí, ví dụ: text-davinci-003
                    prompt: input,
                    max_tokens: 100,
                    temperature: 0.7
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${import.meta.env.VITE_APP_OPENAI_API_KEY}`,
                    },
                }
            );
            setResponse(result.data.choices[0].text);
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
            setResponse('An error occurred while calling the OpenAI API.');
        }
    };

    return (
        <div className="chat-ai paper">
            <header>
                <div></div>
                <Button className="closeDialog" onClick={onClose}>
                    <CloseIcon />
                </Button>
            </header>
            <div className="chat-ai__messages">
                <div className="chat-ai__message chat-ai__message--bot">{response}</div>
                <textarea
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type your prompt here..."
                    className="chat-ai__textarea"
                />
                <button onClick={callApi} className="chat-ai__button">Send</button>
            </div>
        </div>
    );
}
