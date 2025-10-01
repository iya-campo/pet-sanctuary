import { Stack, Typography } from '@mui/material'
import React from 'react'
import AdoptionCard from './AdoptionCard'

const AdoptionsSection = () => {
  return (
    <Stack spacing={2}>
        <Typography variant='h6'>My Adoptions</Typography>
        <Stack>
            <AdoptionCard />
            {/* <Typography>No adoptions yet.</Typography> */}
        </Stack>
    </Stack>
  )
}

export default AdoptionsSection
