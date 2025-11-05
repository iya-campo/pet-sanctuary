// src/hooks/useSocket.ts
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

// URL of your Socket.IO server (make sure this matches your server configuration)
const socket = io('http://localhost:5000', {
  transports: ['websocket'], // Optional: you can configure it based on your requirements
});

const useSocket = () => {
  const [messages, setMessages] = useState<string[]>([]);

  // Listen for incoming messages when the component mounts
  useEffect(() => {
    socket.on('receive-message', (message) => {
      console.log('Received message:', message);
      setMessages((prevMessages) => [...prevMessages, message.content]);
    });

    // Cleanup: Disconnect the socket when the component unmounts
    return () => {
      socket.off('receive-message');
    };
  }, []);

  const sendMessage = (message: string) => {
    socket.emit('send-message', { content: message });
  };

  return {
    messages,
    sendMessage,
  };
};

export default useSocket;