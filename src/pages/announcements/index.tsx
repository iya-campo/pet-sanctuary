import React from 'react';
import Announcements from '@/components/Announcements/Announcements';
import Layout from '@/components/Layout';

const AnnouncementsPage = () => {
  return <Announcements />;
};

AnnouncementsPage.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

export default AnnouncementsPage;
