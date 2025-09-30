import React, { ReactNode } from 'react'
import Layout from '@/components/Layout';
import { Container, Stack, Typography } from '@mui/material';
import HeroSection from './components/HeroSection';
import Categories from './components/Categories';

const HomePage = () => {
  return (
    <Container sx={{ pb: 4 }}>
    <Stack spacing={4}>
        <HeroSection />
        <Categories />
    </Stack>
    </Container>
  );
};

HomePage.getLayout = function getLayout(page: ReactNode) {
  return <Layout>{page}</Layout>;
};

export default HomePage;
