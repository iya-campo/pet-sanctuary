import React from 'react'
import Image from 'next/image'
import { Card, Stack, Typography } from '@mui/material'
import { LocationOn, Pets, SentimentDissatisfied, SentimentSatisfiedAlt, SentimentVeryDissatisfied } from '@mui/icons-material';

type Status = 'lost' | 'found';

interface PetCardProps {
    imageUrl?: string;
    name?: string;
    type: string;
    breed: string;
    description?: string;
    location: string;
    date: string;
    status: Status;
}

const PetCard = ({ imageUrl, name, type, breed, description, location, date, status }: PetCardProps) => {
  return (
    <Card 
      onClick={() => {}}
      sx={{ 
        borderRadius: 2, 
        cursor: 'pointer', 
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', 
        '&:hover': { 
          boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.2)' 
      }}}>
        <Image src={imageUrl || ''} alt={name || breed} />
        <Stack spacing={2} p={4}>
            <Stack direction='row' justifyContent='space-between'>
                <Stack direction='row' spacing={1}>
                  <LocationOn />
                  <Typography variant='body1'>{location}</Typography>
                </Stack>
                <Stack direction='row' spacing={1}>
                  {status === 'found' ? <SentimentSatisfiedAlt /> : <SentimentVeryDissatisfied />}
                  <Typography variant='body1'>{date}</Typography>
                </Stack>
            </Stack>
            <Typography variant='h6'>{`${type}, ${name || breed}`}</Typography>
            {description && <Typography variant='body2'>{description}</Typography>}
        </Stack>
    </Card>
  )
}

export default PetCard