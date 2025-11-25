import { Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import MessagePreview from './MessagePreview'
import { Message } from '@/types/Message';

const MessagesSection = () => {
  const [messages, setMessages] = React.useState<Message[]>([]);

  useEffect(() => {
    // Fetch messages from the backend here
    const fetchMessages = async () => {
      try {
        const response = await fetch('/pet-sanctuary/api/messages');
        const data = await response.json();
        // Handle the fetched messages
        setMessages([data[0]] as any);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [])

  return (
    <Stack spacing={2}>
        <Typography variant='h6'>Messages</Typography>
        <Stack spacing={2}>
          {messages.length > 0 ? messages.map((msg: Message) => (
            <MessagePreview 
              key={msg.id}
              name={msg.user.name}
              message={msg.message}
              imgUrl={msg.user.imgUrl as string}
            />
          )) : (
            <Typography>No messages yet.</Typography>
          )}
        </Stack>
    </Stack>
  )
}

export default MessagesSection
