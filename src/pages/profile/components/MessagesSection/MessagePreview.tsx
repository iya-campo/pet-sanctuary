import React, { useState } from 'react'
import useSocket from '@/hooks/useSocket';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { Message } from '@mui/icons-material';

interface MessagePreviewProps {
  name: string;
  message: string;
  imgUrl: string;
}

const MessagePreview = ({ name, message, imgUrl }: MessagePreviewProps) => {
  // const [message, setMessage] = useState('');
  // const { messages, sendMessage } = useSocket(); // Use the custom hook

  // const handleSendMessage = () => {
  //   if (message.trim()) {
  //     sendMessage(message);
  //     setMessage('');
  //   }
  // };

  return (
    // <div>
    //   <h1>Chat Application</h1>
      
    //   {/* Display the messages */}
    //   <div>
    //     <ul>
    //       {messages.map((msg, idx) => (
    //         <li key={idx}>{msg}</li>
    //       ))}
    //     </ul>
    //   </div>

    //   {/* Input for sending messages */}
    //   <input
    //     type="text"
    //     value={message}
    //     onChange={(e) => setMessage(e.target.value)}
    //     placeholder="Type a message"
    //   />
    //   <button onClick={handleSendMessage}>Send</button>
    // </div>
    <Stack direction='row' alignItems='center'>
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          backgroundImage: imgUrl ? `url(${imgUrl})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#ccc',
          mr: 2,
        }}
      />
      <Stack flex={1}>
        <Typography variant='body2' sx={{ fontWeight: 'bold' }}>{name}</Typography>
        <Typography variant='subtitle2'>{message}</Typography>
      </Stack>
      <IconButton>
        <Message />
      </IconButton>
    </Stack>
  )
}

export default MessagePreview
