import React from 'react'
import { Button, Stack, Typography } from '@mui/material'

const HeroSection = () => {
  return (
    <Stack direction='row' bgcolor='#ddd'>
      <Stack flexDirection='column' flex='0 0 50%' padding={5} spacing={2}>
        <Typography variant='h3'>Let's Help You Find Your Beloved Pet!</Typography>
        <Typography variant='h6'>We have gathered announcements about lost and found animals from all over Alberta.</Typography>
        <Button variant='contained' sx={{ width: 'fit-content' }}>Start Search</Button>
      </Stack>
    </Stack>
  )
}

export default HeroSection