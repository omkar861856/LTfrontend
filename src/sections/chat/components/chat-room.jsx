import PropTypes from 'prop-types';
import React, { useState } from 'react';

import socket from 'src/services/socket';

import Chat from 'src/sections/chat/components/chat';




const ChatRoom = ({ user }) => {
    const [room, setRoom] = useState('');
    const [inRoom, setInRoom] = useState(false);

    const joinRoom = () => {
        if (room.trim()) {
            socket.emit('join', room);
            setInRoom(true);
        }
    };

    return (
        <div>
            {inRoom ? (
                <Chat user={user} room={room} />
            ) : (
                <div>
                    <input
                        type="text"
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                        placeholder="Enter room name..."
                    />
                    <button type='button' onClick={joinRoom}>Join Room</button>
                </div>
            )}
        </div>
    );
};

ChatRoom.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }).isRequired,
};


export default ChatRoom;
