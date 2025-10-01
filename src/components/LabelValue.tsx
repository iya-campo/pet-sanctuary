import React from 'react'
import { Stack, SxProps, Typography } from '@mui/material';
import { Theme } from '@emotion/react';

type orientationType = 'horizontal' | 'vertical';

interface LabelValueProps {
  label: string;
  value: string | number;
  orientation?: orientationType;
  style?: SxProps<Theme>;
}

const LabelValue = ({ label, value, orientation = 'vertical', style }: LabelValueProps) => {
  return (
    <Stack
      sx={style}
      direction={orientation === 'vertical' ? 'column' : 'row'} 
      spacing={orientation === 'vertical' ? 0 : 1}>
        <Typography className='label' variant='subtitle1'>{label}:</Typography>
        <Typography className='value' variant='body1'>{value}</Typography>
    </Stack>
  )
}

export default LabelValue