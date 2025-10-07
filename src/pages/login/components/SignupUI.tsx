import { AccountCircle, Lock } from '@mui/icons-material'
import { Button, Checkbox, FormControl, FormControlLabel, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import React from 'react'

const SignupUI = () => {
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
                    <TextField
                        variant="outlined"
                        placeholder="Re-enter password"
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
            <FormControlLabel
                control={<Checkbox />}
                label={
                    <Typography variant="body2" color="textSecondary">
                        I accept the
                        <Typography component="span" variant="inherit" color="primary" sx={{ ml: 0.5 }}>
                            policy and terms.
                        </Typography>
                    </Typography>
                }
            />
            <Button variant='contained' size='large' fullWidth>Sign Up</Button>
        </Stack>
    )
}

export default SignupUI
