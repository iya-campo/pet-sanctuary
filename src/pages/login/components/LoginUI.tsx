import React from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth'
import { AccountCircle, Facebook, Google, Lock, Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, Checkbox, Divider, FormControl, FormControlLabel, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import Link from 'next/link'

const LoginUI = () => {
    const { loginUser } = useAuth();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);

    const handleHidePassword = () => setShowPassword(!showPassword);
    
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        await loginUser(email, password);
    };

    return (
        <Stack spacing={2}>
            <FormControl fullWidth margin="normal" variant="outlined">
                <Stack alignItems="center" spacing={2}>
                    <TextField
                        variant="outlined"
                        placeholder="Email"
                        size='small'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                            ),
                        }}
                        fullWidth
                    />
                    <TextField
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        placeholder="Enter password"
                        size='small'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end" sx={{ cursor: 'pointer' }} onClick={handleHidePassword}>
                                    {!showPassword ? <Visibility /> : <VisibilityOff />}
                                </InputAdornment>
                            )
                        }}
                        fullWidth
                    />
                </Stack>
            </FormControl>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <FormControlLabel
                    control={<Checkbox />}
                    label={
                        <Typography variant="body2" color="textSecondary">
                            Remember me
                        </Typography>
                    }
                />
                <Link href="/forgot-password">
                    <Typography variant='body2' color='textSecondary'>Forgot password?</Typography>
                </Link>
            </Stack>
            <Button variant='contained' size='large' fullWidth onClick={handleLogin}>Login</Button>
            <Divider textAlign="center">
                <Typography variant='body2' color='textSecondary'>Login with Others</Typography>
            </Divider>
            <Button variant='contained' size='large' color='inherit' startIcon={<Google color='primary' />} fullWidth sx={{ textTransform: 'initial' }}>Login with Google</Button>
            <Button variant='contained' size='large' color='inherit' startIcon={<Facebook color='primary' />} fullWidth sx={{ textTransform: 'initial' }}>Login with Facebook</Button>
        </Stack>
    )
}

export default LoginUI
