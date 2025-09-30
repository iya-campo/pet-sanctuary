import React, { ReactNode } from 'react'
import Layout from '@/components/Layout';
import { Container, Stack, Typography } from '@mui/material';
import Filter from './components/Filter';
import Announcements from './components/Announcements';

const AnnouncementsPage = () => {
  return (
    <Container>
      <Stack spacing={4}>
        <Typography variant='h4'>Recents Announcements</Typography>
        <Filter />
        <Announcements />
      </Stack>
    </Container>
  );
};

AnnouncementsPage.getLayout = function getLayout(page: ReactNode) {
  return <Layout>{page}</Layout>;
};

export default AnnouncementsPage;
