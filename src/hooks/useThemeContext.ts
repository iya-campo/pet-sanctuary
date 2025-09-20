import { ThemeContext } from '@/context/ThemeContext';
import { useContext } from 'react';

export function useThemeContext() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeContextProvider');
  }

  return context;
}