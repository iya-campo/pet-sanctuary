import React from 'react'
import { Button, Stack, Typography } from '@mui/material'
import CardLink, { CardLinkProps } from '@/components/Card/CardLink'
import { Add } from '@mui/icons-material'

const LINKS: Record<string, CardLinkProps> = {
    DOGS: { title: 'Dogs', href: '/announcements?species=DOG', img: '' },
    CATS: { title: 'Cats', href: '/announcements?species=CAT', img: '' },
    BIRDS: { title: 'Birds', href: '/announcements?species=BIRD', img: '' },
    OTHERS: { title: 'Others', href: '/announcements?species=OTHERS', img: '' },
}

const Categories = () => {
  return (
    <Stack spacing={4}>
        <Typography variant='h4'>Categories of Announcements</Typography>
        <Typography variant='body1'>Rescue is more than a mission—it’s a community effort. This Announcements page is dedicated to keeping our wonderful supporters informed and inspired. Here you’ll find updates about adoption fairs, donation drives, shelter improvements, and all the ways you can get involved. We also highlight the victories we achieve together: from animals rescued in need, to pets finding their forever families. Every announcement is a reminder that, with your help, we’re creating a kinder, more compassionate world for animals.</Typography>
        <Stack direction='row' flexWrap='wrap' gap={2}>
            {Object.keys(LINKS).map((key, index) => 
                <CardLink 
                    key={index}
                    title={LINKS[key].title} 
                    href={LINKS[key].href} 
                />
            )}
        </Stack>
        <Button variant='outlined' startIcon={<Add />} size='large' sx={{ 
            alignSelf: 'center',
            width: 'fit-content',
        }}>
            Add Announcement
        </Button>
    </Stack>
  )
}

export default Categories