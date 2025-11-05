import { Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import AdoptionCard from './AdoptionCard'
import { useAuth } from '@/hooks/useAuth';
import { Pet } from '@/types/Pet';

const AdoptionsSection = () => {
  const { user } = useAuth();


  return (
    <Stack spacing={2}>
        <Typography variant='h6'>My Adoptions</Typography>
        <Stack direction='row' gap={2} flexWrap='wrap'>
          {user && user?.adoptedPets?.length > 0 ?
            user.adoptedPets.map((pet: Pet, index: number) => <AdoptionCard key={index} name={pet.name} />) 
            : <Typography>No adoptions yet.</Typography>
          }
        </Stack>
    </Stack>
  )
}

export default AdoptionsSection
