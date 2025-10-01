import React from 'react'
import { Button, Link, Stack, Typography } from '@mui/material'
import { Add } from '@mui/icons-material'

const GlobalHeader = () => {
  return (
    <Stack direction='row' justifyContent='space-between' alignItems='center' my={2}>
        <Typography variant='h4'>Pet Sanctuary</Typography>
        <Stack direction='row' alignItems='center' spacing={2}>
            <Link href='/'>Home</Link>
            <Link href='/announcements'>All Announcements</Link>
            <Link href='/register'>Register / Sign In</Link>
            <Link href='/create-announcement'>
              <Button variant='outlined' startIcon={<Add/>} size='small'>
                  Add Announcement
              </Button>
            </Link>
        </Stack>
    </Stack>
  )
}

export default GlobalHeader