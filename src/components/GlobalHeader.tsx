import React from 'react'
import { Button, Stack, Typography } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

const GlobalHeader = () => {
  const { logoutUser, isAuthenticated } = useAuth();
  
  const handleLogout = async (e: React.FormEvent) => {
      e.preventDefault();
      await logoutUser();
  };

  return (
    <Stack direction='row' justifyContent='space-between' alignItems='center' my={2} height={40}>
        <Typography variant='h4'>Pet Sanctuary</Typography>
        <Stack direction='row' alignItems='center' spacing={2}>
            <Link href='/'>Home</Link>
            <Link href='/announcements'>All Announcements</Link>
            {/* {!isAuthenticated ? <Link href='/login'>Register / Sign In</Link> : <Link href='/profile'>John Doe</Link>} */}
            {!isAuthenticated ? <Link href='/login'>Register / Sign In</Link> : <Link href='/' onClick={handleLogout}>Logout</Link>}
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