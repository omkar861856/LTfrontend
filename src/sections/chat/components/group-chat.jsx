import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import socket from 'src/services/socket';

import Chat from 'src/sections/chat/components/chat';

const GroupChat = ({ user }) => {
  const [group, setGroup] = useState('');
  const [groups, setGroups] = useState([]);
  const [inGroup, setInGroup] = useState(false);

  useEffect(() => {
    socket.on('groupList', (receivedGroups) => {
      setGroups(receivedGroups);
    });

    socket.emit('getGroups');

    return () => {
      socket.off('groupList');
    };
  }, []);

  const createGroup = () => {
    if (group.trim()) {
      socket.emit('createGroup', group);
      setGroup('');
    }
  };

  const joinGroup = (newGroup) => {
    socket.emit('joinGroup', newGroup);
    setInGroup(true);
  };

  return (
    <div>
      {inGroup ? (
        <Chat user={user} room={group} />
      ) : (
        <div>
          <input
            type="text"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            placeholder="Create new group..."
          />
          <button type="button" onClick={createGroup}>
            Create Group
          </button>
          <h3>Available Groups</h3>
          <ul>
            {groups.map((grp, index) => (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
              <li
                key={index}
                onClick={() => joinGroup(grp)}
                onKeyDown={(e) => e.key === 'Enter' && joinGroup(grp)}
              >
                {grp}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

GroupChat.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default GroupChat;