import React from 'react'
import { useAuth } from '@/hooks/useAuth';
import { AccountCircle, Lock, Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, Checkbox, FormControl, FormControlLabel, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import * as Yup from 'yup';

type FormData = {
    email: string;
    password: string;
    valPassword: string;
    termsAccepted: boolean;
}

const SignupUI = () => {
    const { registerUser } = useAuth();
    const [showPassword, setShowPassword] = React.useState(false);

    const handleShowPassword = () => setShowPassword(!showPassword);
    
    const formik = useFormik<FormData>({
        initialValues: {
            email: '',
            password: '',
            valPassword: '',
            termsAccepted: false,
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .required('Password is required')
                .min(6, 'Password must be at least 6 characters'),
                // .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                // .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
                // .matches(/\d/, 'Password must contain at least one number')
                // .matches(/[@$!%*?&^#()_\-+=]/, 'Password must contain at least one special character'),
            valPassword: Yup.string()
                .required('Please confirm your password')
                .oneOf([Yup.ref('password')], 'Passwords must match'),
            termsAccepted: Yup.boolean()
                .oneOf([true], 'You must accept the policy and terms'),
        }),
        onSubmit: async (values) => {
            console.log('Form data submitted:', values);
            await registerUser(values.email, values.password);
        },
    });

    return (
        <Stack spacing={2}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl fullWidth margin="normal" variant="outlined">
                    <Stack alignItems="center" spacing={2}>
                        <TextField
                            variant="outlined"
                            placeholder="Email"
                            size='small'
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
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
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end" sx={{ cursor: 'pointer' }} onClick={handleShowPassword}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </InputAdornment>
                                )
                            }}
                            fullWidth
                        />
                        <TextField
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            placeholder="Re-enter password"
                            size='small'
                            name="valPassword"
                            value={formik.values.valPassword}
                            onChange={formik.handleChange}
                            error={formik.touched.valPassword && Boolean(formik.errors.valPassword)}
                            helperText={formik.touched.valPassword && formik.errors.valPassword}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end" sx={{ cursor: 'pointer' }} onClick={handleShowPassword}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </InputAdornment>
                                )
                            }}
                            fullWidth
                        />
                    </Stack>
                </FormControl>
            </form>
            <FormControlLabel
                control={
                    <Checkbox
                        name="termsAccepted"
                        checked={formik.values.termsAccepted}
                        onChange={formik.handleChange}
                        color="primary"
                    />
                }
                label={
                    <Typography variant="body2" color="textSecondary">
                        I accept the
                        <Typography component="span" variant="inherit" color="primary" sx={{ ml: 0.5 }}>
                            policy and terms.
                        </Typography>
                    </Typography>
                }
            />
            {formik.touched.termsAccepted && formik.errors.termsAccepted && (
                <Typography variant="caption" color="error">
                    {formik.errors.termsAccepted}
                </Typography>
            )}
            <Button variant='contained' size='large' onClick={() => formik.handleSubmit()} fullWidth>Sign Up</Button>
        </Stack>
    )
}

export default SignupUI
