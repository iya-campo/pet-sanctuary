import { createContext, useState, ReactNode } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from '../theme';

type ThemeContextType = {
  mode: boolean;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export function ThemeContextProvider({ children }: Props) {
  const [mode, setMode] = useState(false);

  const toggleTheme = () => setMode((prev) => !prev);
  const theme = mode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}