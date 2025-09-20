import React from 'react'
import { Button, Link, Stack, Typography } from '@mui/material'
import { Add } from '@mui/icons-material'

const GlobalHeader = () => {
  return (
    <Stack direction='row' justifyContent='space-between' alignItems='center' my={2}>
        <Typography variant='h4'>Pet Sanctuary</Typography>
        <Stack direction='row' alignItems='center' spacing={2}>
            <Link>Main</Link>
            <Link>All Announcements</Link>
            <Link>Register / Sign In</Link>
            <Button variant='outlined' startIcon={<Add/>} size='small'>
                Add Announcement
            </Button>
        </Stack>
    </Stack>
  )
}

export default GlobalHeader