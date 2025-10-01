import React from 'react'
import Image from 'next/image'
import { Card, Stack, Typography } from '@mui/material'
import { LocationOn, SentimentSatisfiedAlt, SentimentVeryDissatisfied } from '@mui/icons-material';
import { capitalize } from '@/util/commonUtils';
import { PetSpecies, PetStatus } from '@/types/Pet';

interface PetCardProps {
    imageUrl?: string;
    name?: string;
    species: PetSpecies;
    breed: string;
    description?: string;
    location: string;
    date: string;
    status: PetStatus;
}

const PetCard = ({ imageUrl, name, species, breed, description, location, date, status }: PetCardProps) => {
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
        {/* <Image src={imageUrl || ''} width={300} height={200} alt={name || breed} /> */}
      {imageUrl && <img src={imageUrl} alt={`${name}'s profile`} />}
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
            <Typography variant='h6'>{`${capitalize(species)}, ${name || breed}`}</Typography>
            {description && <Typography variant='body2'>{description}</Typography>}
        </Stack>
    </Card>
  )
}

export default PetCard