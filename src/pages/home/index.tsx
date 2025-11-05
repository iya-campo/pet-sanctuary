import React, { ReactNode } from 'react'
import Layout from '@/components/Layout';
import { Stack } from '@mui/material';
import HeroSection from './components/HeroSection';
import Categories from './components/Categories';

const HomePage = () => {
  return (
    <Stack spacing={4} pb={4}>
        <HeroSection />
        <Categories />
    </Stack>
  );
};

HomePage.getLayout = function getLayout(page: ReactNode) {
  return <Layout>{page}</Layout>;
};

export default HomePage;
