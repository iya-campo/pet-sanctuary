import { IconButton, Stack, Typography } from '@mui/material';
import React from 'react'
import { Box } from '@mui/material';
import { Message } from '@mui/icons-material';

interface MessagePreviewProps {
  name: string;
  message: string;
  imgUrl?: string;
}

const MessagePreview = ({ name, message, imgUrl }: MessagePreviewProps) => {
  return (
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
