import React from 'react'
import LabelValue from '@/components/LabelValue'
import { Box, Stack, Typography } from '@mui/material'

const ProfileSection = () => {
  const labelStyle = { 
      '.label': { color: '#333' },
      '.value': { color: '#555', fontWeight: 600 }
   };

  return (
    <Stack bgcolor='lightgray' p={4} spacing={2}>
        <Typography variant='h6'>My Account</Typography>
        <Stack alignItems='center'>
            <Box my={1} height={100} width={100} bgcolor='#ddd' borderRadius='50%'></Box>
            <Typography variant='subtitle1'>John Doe</Typography>
            <Typography variant='caption'>Cat Dad</Typography>
        </Stack>
        <Stack spacing={1}>
            <LabelValue style={labelStyle} label='Email' value='john.doe@example.com' orientation='vertical' />
            <LabelValue style={labelStyle} label='Mobile' value='(123) 456-7890' orientation='vertical' />
            <LabelValue style={labelStyle} label='Location' value='New York, NY' orientation='vertical' />
        </Stack>
    </Stack>
  )
}

export default ProfileSection
