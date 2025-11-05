import React from 'react'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { useAuth } from '@/hooks/useAuth';
import DynamicField from '@/components/DynamicField';
import { Edit } from '@mui/icons-material';

const ProfileSection = () => {
  const { user } = useAuth();

  const handleEditProfile = () => {
    // edit profile
  }
  
  const labelStyle = { 
      '.label': { color: '#333' },
      '.value': { color: '#555', fontWeight: 600 }
   };

  return (
    <Stack bgcolor='lightgray' p={4} spacing={2}>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Typography variant='h6'>My Account</Typography>
          <IconButton onClick={handleEditProfile} sx={{ p: 0 }}>
            <Edit />
          </IconButton>
        </Stack>
        <Stack alignItems='center'>
            <Box my={1} height={100} width={100} bgcolor='#ddd' borderRadius='50%'></Box>
            <Typography variant='subtitle1'>John Doe</Typography>
            <Typography variant='caption'>Cat Dad</Typography>
        </Stack>
        <Stack spacing={1}>
            <DynamicField style={labelStyle} label='Email' value={user?.email as string} orientationType='vertical' />
            <DynamicField style={labelStyle} label='Mobile' value='(123) 456-7890' orientationType='vertical' />
            <DynamicField style={labelStyle} label='Location' value='New York, NY' orientationType='vertical' />
        </Stack>
    </Stack>
  )
}

export default ProfileSection
