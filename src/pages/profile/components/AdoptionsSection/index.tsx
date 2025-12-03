import React from 'react'
import { Stack, Typography } from '@mui/material'
import { useAuth } from '@/hooks/useAuth';
import { Pet } from '@/types/Pet';
import AdoptionCard from './AdoptionCard'

const AdoptionsSection = () => {
  const { user } = useAuth();

  return (
    <Stack spacing={2}>
        <Typography variant='h6'>My Adoptions</Typography>
        <Stack direction='row' gap={2} flexWrap='wrap'>
          {
            (user?.adoptedPets?.length ?? 0) > 0 ?
              user?.adoptedPets?.map((pet: Pet) => (
                <AdoptionCard 
                  key={pet.id} 
                  name={pet.name} 
                  imageUrls={pet.imageUrls} />
              ))
              : <Typography>No adoptions yet.</Typography>
          }
        </Stack>
    </Stack>
  )
}

export default AdoptionsSection
