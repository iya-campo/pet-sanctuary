import { Box, Typography } from '@mui/material';
import React from 'react'

interface AdoptionCardProps {
  name: string;
  imageUrl?: string;
}

const AdoptionCard = ({ name, imageUrl }: AdoptionCardProps) => {
  return (
    <Box 
      position='relative'
      bgcolor='#ddd' 
      borderRadius={2} 
      height={150} 
      width={100} 
      textAlign='center'
      >
        <Typography position='absolute' width='100%' sx={{ bottom: 10 }}>{name}</Typography>
    </Box>
  )
}

export default AdoptionCard
