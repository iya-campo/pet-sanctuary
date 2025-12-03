import React from 'react'
import { Box, Card, Stack, Typography } from '@mui/material'
import { LocationOn, SentimentNeutral, SentimentSatisfiedAlt, SentimentVeryDissatisfied } from '@mui/icons-material';
import { capitalize, formatDate } from '@/util/commonUtils';
import { PetSpecies, PetStatus } from '@/types/Pet';
import { PET_STATUS } from '@/constants/petConstants';
import { BASE_URL } from '@/constants/apiConstants';

interface PetCardProps {
    imageUrls: string;
    name?: string;
    species: PetSpecies;
    breed: string;
    description?: string;
    location: string;
    date: string;
    status: PetStatus;
}

const PetCard = ({ imageUrls, name, species, breed, description, location, date, status }: PetCardProps) => {
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
        <Box 
            flex={1}
            bgcolor='#ddd' 
            height={250}
            sx={{
                backgroundImage: imageUrls ? `url(${BASE_URL}${imageUrls.split(',')[0]})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        />
        <Stack spacing={2} p={4}>
            <Stack direction='row' justifyContent='space-between'>
                <Stack direction='row' spacing={0.5}>
                  <LocationOn />
                  <Typography variant='body1'>{location}</Typography>
                </Stack>
                <Stack direction='row' spacing={0.5}>
                  {
                    status === PET_STATUS.FOUND ? <SentimentSatisfiedAlt /> : 
                    status === PET_STATUS.LOST ? <SentimentVeryDissatisfied /> :
                    <SentimentNeutral />
                  }
                  <Typography variant='body1'>{formatDate(date)}</Typography>
                </Stack>
            </Stack>
            <Typography variant='h6'>{`${capitalize(species)}, ${name || breed}`}</Typography>
            {description && (
              <Box sx={{ maxHeight: 80, overflow: 'auto' }}>
                <Typography variant='body2'>{description}</Typography>
              </Box>
            )}
        </Stack>
    </Card>
  )
}

export default PetCard