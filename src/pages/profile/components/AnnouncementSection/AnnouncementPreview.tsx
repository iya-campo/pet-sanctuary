import { BASE_URL } from '@/constants/apiConstants';
import { PET_STATUS } from '@/constants/petConstants';
import { PetStatus } from '@/types/Pet'
import { capitalize, formatDate } from '@/util/commonUtils';
import { Box, Stack, Typography } from '@mui/material';
import React from 'react'

type AnnouncementPreviewProps = {
  name: string;
  status: PetStatus;
  date: Date;
  desc?: string;
  imageUrls?: string;
}

const AnnouncementPreview = ({ status, name, desc, date, imageUrls }: AnnouncementPreviewProps) => {
  return (
    <Stack direction='row' spacing={2}>
      <Box
        height={150}
        bgcolor={'#ccc'}
        flex={0.5}
        sx={{
          backgroundImage: imageUrls ? `url(${BASE_URL}${imageUrls.split(',')[0]})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
      }}
      />
      <Stack flex={1}>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Typography variant='caption' color={status === PET_STATUS.LOST ? 'error' : 'primary'}>{capitalize(status)}</Typography>
          <Typography variant='caption'>{formatDate(date?.toString())}</Typography>
        </Stack>
        <Typography variant='h6'>{name}</Typography>
        <Typography variant='body2'>{desc}</Typography>
      </Stack>
    </Stack>
  )
}

export default AnnouncementPreview
