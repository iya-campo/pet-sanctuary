import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { VERIFICATION_API } from '@/constants/apiConstants';

const index = () => {
  const router = useRouter();
  const { token } = router.query;
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 3000);

    // Clean up the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, [router]);

  useEffect(() => {
    if (token && typeof token === 'string') {
      fetch(`${VERIFICATION_API}?token=${token}`)
        .then((res) => res.json())
        .then((data) => setMessage(data.message || 'Email verification successful.'))
        .catch((err) => {
            console.error('Fetch error:', err);
            setMessage('Email verification failed.');
        });
    }
  }, [token]);

  return <Box>{message}</Box>;
}

export default index
