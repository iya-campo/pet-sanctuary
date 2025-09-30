import React, { ReactNode } from 'react'
import Layout from '@/components/Layout';
import HomePage from './home';

const Index = () => {
  return <HomePage />
};

Index.getLayout = function getLayout(page: ReactNode) {
  return <Layout>{page}</Layout>;
};

export default Index;
