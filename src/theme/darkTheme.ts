import { createTheme } from '@mui/material/styles';
import { darkPalette } from './palette';
import { typography } from './typography';
import { components } from './components';

export const darkTheme = createTheme({
  palette: darkPalette,
  typography,
  components,
});