import React, { useEffect, useState } from 'react';
import { MatrixClient } from 'matrix-js-sdk';

interface ChatRoomProps {
    roomId: string;
    matrixClient: MatrixClient;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ roomId, matrixClient }) => {
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        const onMessage = (event: any) => {
            if (event.getRoomId() === roomId) {
                setMessages((prev) => [...prev, event.getContent().body]);
            }
        };

        matrixClient.on('Room.timeline', onMessage);

        return () => {
            matrixClient.removeListener('Room.timeline', onMessage);
        };
    }, [matrixClient, roomId]);

    const sendMessage = () => {
        matrixClient.sendTextMessage(roomId, input);
        setInput('');
    };

    return (
        <div>
            <div>
                {messages.map((msg, idx) => (
                    <div key={idx}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ChatRoom;
