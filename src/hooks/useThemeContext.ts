import { useContext, useMemo } from 'react';
import { ThemeContext, ThemeContextType } from '@/context/ThemeContext';

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeContextProvider');
  }

  return useMemo(() => context, [context]);
}