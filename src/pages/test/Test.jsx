import React from 'react';
import { Client } from '@stomp/stompjs';
import './test.css';

const Test = () => {
    const client = new Client({
        brokerURL: 'ws://localhost:8080/ws',
        onConnect: () => {
            client.subscribe('/topic/public', (payload) => {
                console.log(payload.body);
            });
        }
    });

    client.activate();

    return (
        <div>
            <button
                type="button"
                onClick={() => {
                    client.publish({ destination: '/app/booking-noti' });
                }}
                className="icon-button"
            >
                <span className="material-icons">notifications</span>
                <span className="icon-button__badge">2</span>
            </button>
        </div>
    );
};

export default Test;
