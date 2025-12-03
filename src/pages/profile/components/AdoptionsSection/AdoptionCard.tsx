import { BASE_URL } from '@/constants/apiConstants';
import { Box, Typography } from '@mui/material';
import React from 'react'

interface AdoptionCardProps {
  name: string;
  imageUrls?: string;
}

const AdoptionCard = ({ name, imageUrls }: AdoptionCardProps) => {
  return (
    <Box 
      position='relative'
      bgcolor='#ddd' 
      borderRadius={2} 
      height={150} 
      width={100} 
      textAlign='center'
      sx={{
          backgroundImage: imageUrls ? `url(${BASE_URL}${imageUrls.split(',')[0]})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
      }}
      >
        <Typography 
          position='absolute' 
          width='100%' 
          sx={{ 
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            color: '#ddd',
            bottom: 10,
          }}>{name}</Typography>
    </Box>
  )
}

export default AdoptionCard
