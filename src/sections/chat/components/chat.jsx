import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import socket from 'src/services/socket';

const Chat = ({ user }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('message', (receivedMessage) => {
            setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });

        return () => {
            socket.off('message');
        };
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit('message', { user, text: message });
            setMessage('');
        }
    };

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.user.name}</strong>: {msg.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button type='button' onClick={sendMessage}>Send</button>
        </div>
    );
};

Chat.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }).isRequired,
};

export default Chat;