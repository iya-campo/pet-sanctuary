import { Components, Theme } from '@mui/material/styles';

export const components: Components<Omit<Theme, 'components'>> = {
  MuiSvgIcon: {
    styleOverrides: {
        root: {
        },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
      },
    },
  },
};