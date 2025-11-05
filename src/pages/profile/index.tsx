import React, { ReactNode, useEffect } from 'react'
import Layout from '@/components/Layout';
import { Stack } from '@mui/material';
import ProfileSection from './components/ProfileSection';
import MessagesSection from './components/MessagesSection';
import AnnouncementsSection from './components/AnnouncementSection';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdoptionsSection from './components/AdoptionsSection';
// import AdoptionsSection from './components/AdoptionsSection';

const ProfilePage = () => {

  return (
    <ProtectedRoute>
      <Stack direction='row' spacing={8}>
        <ProfileSection />
        <Stack flex={1} spacing={8}>
          <MessagesSection />
          <AnnouncementsSection />
          <AdoptionsSection />
        </Stack>
      </Stack>
    </ProtectedRoute>
  )
};

ProfilePage.getLayout = function getLayout(page: ReactNode) {
  return <Layout>{page}</Layout>;
};

export default ProfilePage;
 