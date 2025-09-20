import { createTheme } from '@mui/material/styles';
import { lightPalette } from './palette';
import { typography } from './typography';
import { components } from './components';

export const lightTheme = createTheme({
  palette: lightPalette,
  typography,
  components,
});