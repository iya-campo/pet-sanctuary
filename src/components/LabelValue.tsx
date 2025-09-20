import React from 'react'
import { Stack, Typography } from '@mui/material';

interface LabelValueProps {
  label: string;
  value: string | number;
}

const LabelValue = ({ label, value }: LabelValueProps) => {
  return (
    <Stack direction='row' spacing={1}>
        <Typography variant='subtitle1'>{label}:</Typography>
        <Typography variant='body1'>{value}</Typography>
    </Stack>
  )
}

export default LabelValue