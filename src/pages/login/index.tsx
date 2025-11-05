import Layout from '@/components/Layout';
import { Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React, { ReactNode, useState } from 'react'
import LoginUI from './components/LoginUI';
import SignupUI from './components/SignupUI';

const LoginPage = () => {
    const HEADER_HEIGHT = 72;

    const [authMode, setAuthMode] = useState<string>('login');

    const handleChange = (event: React.MouseEvent<HTMLElement>, newAuthMode: string) => {
        if (newAuthMode !== null) {
            setAuthMode(newAuthMode);
        }
    };

    return (
        <Stack alignItems='center' spacing={2} mt={16} height={`calc(100vh - ${HEADER_HEIGHT}px)`}>
            <Typography variant='h4' gutterBottom>
                Welcome
            </Typography>
            <ToggleButtonGroup
                exclusive
                value={authMode}
                onChange={handleChange}
                sx={{ width: 250 }}
            >
                <ToggleButton fullWidth value="login">Login</ToggleButton>
                <ToggleButton fullWidth value="signup">Signup</ToggleButton>
            </ToggleButtonGroup>
            {authMode === 'login' ? <LoginUI /> : <SignupUI />}
        </Stack>
    )
}


LoginPage.getLayout = function getLayout(page: ReactNode) {
  return <Layout>{page}</Layout>;
};

export default LoginPage;
