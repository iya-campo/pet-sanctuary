import { AccountCircle, Facebook, Google, Lock } from '@mui/icons-material'
import { Button, Checkbox, Divider, FormControl, FormControlLabel, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const LoginUI = () => {
    return (
        <Stack spacing={2}>
            <FormControl fullWidth margin="normal" variant="outlined">
                <Stack alignItems="center" spacing={2}>
                    <TextField
                        variant="outlined"
                        placeholder="Username"
                        size='small'
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
                        variant="outlined"
                        placeholder="Enter password"
                        size='small'
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <Lock />
                            </InputAdornment>
                            ),
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
            <Button variant='contained' size='large' fullWidth>Login</Button>
            <Divider textAlign="center">
                <Typography variant='body2' color='textSecondary'>Login with Others</Typography>
            </Divider>
            <Button variant='contained' size='large' color='inherit' startIcon={<Google color='primary' />} fullWidth sx={{ textTransform: 'initial' }}>Login with Google</Button>
            <Button variant='contained' size='large' color='inherit' startIcon={<Facebook color='primary' />} fullWidth sx={{ textTransform: 'initial' }}>Login with Facebook</Button>
        </Stack>
    )
}

export default LoginUI
