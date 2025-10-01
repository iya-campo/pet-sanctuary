import { PetStatus } from '@/types/Pet'
import { capitalize } from '@/util/commonUtils';
import { Box, Stack, Typography } from '@mui/material';
import React from 'react'

type AnnouncementPreviewProps = {
  status: PetStatus;
  name: string;
  desc?: string;
  date: string;
  imgUrl?: string;
}

const AnnouncementPreview = ({ status, name, desc, date, imgUrl }: AnnouncementPreviewProps) => {
  return (
    <Stack direction='row' spacing={2}>
      <Box
        height={150}
        bgcolor={'#ccc'}
        flex={0.5}
        sx={{
          backgroundImage: imgUrl ? `url(${imgUrl})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#ccc',
        }}
      />
      <Stack flex={1}>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Typography variant='caption' color={status === 'Lost' ? 'error' : 'primary'}>{capitalize(status)}</Typography>
          <Typography variant='caption'>{date}</Typography>
        </Stack>
        <Typography variant='h6'>{name}</Typography>
        <Typography variant='body2'>{desc}</Typography>
      </Stack>
    </Stack>
  )
}

export default AnnouncementPreview
