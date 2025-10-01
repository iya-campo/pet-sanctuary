import React, { ReactNode } from 'react'
import Layout from '@/components/Layout';
import { Container, Stack } from '@mui/material';
import ProfileSection from './components/ProfileSection';
import MessagesSection from './components/MessagesSection';
import AnnouncementsSection from './components/AnnouncementSection';
// import AdoptionsSection from './components/AdoptionsSection';

const ProfilePage = () => {

  return (
    <Container>
      <Stack direction='row' spacing={8}>
        <ProfileSection />
        <Stack flex={1} spacing={8}>
          <MessagesSection />
          <AnnouncementsSection />
          {/* <AdoptionsSection /> */}
        </Stack>
      </Stack>
    </Container>
  )
};

ProfilePage.getLayout = function getLayout(page: ReactNode) {
  return <Layout>{page}</Layout>;
};

export default ProfilePage;
 