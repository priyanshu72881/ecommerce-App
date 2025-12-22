import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

interface ColorThemeContextType {
  colors: ThemeColors;
  updateColors: (newColors: Partial<ThemeColors>) => void;
}

const defaultColors: ThemeColors = {
  primary: '#3B82F6',
  secondary: '#6B7280',
  accent: '#10B981',
  background: '#FFFFFF',
};

const ColorThemeContext = createContext<ColorThemeContextType | null>(null);

export const useColorTheme = () => {
  const context = useContext(ColorThemeContext);
  if (!context) throw new Error('useColorTheme must be used within ColorThemeProvider');
  return context;
};

export const ColorThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [colors, setColors] = useState<ThemeColors>(defaultColors);

  useEffect(() => {
    const loadColors = async () => {
      try {
        const [
          primary,
          secondary,
          accent,
          background,
        ] = await Promise.all([
          AsyncStorage.getItem('store_primary'),
          AsyncStorage.getItem('store_secondary'),
          AsyncStorage.getItem('store_accent'),
          AsyncStorage.getItem('store_background'),
        ]);

        setColors({
          primary: primary || defaultColors.primary,
          secondary: secondary || defaultColors.secondary,
          accent: accent || defaultColors.accent,
          background: background || defaultColors.background,
        });
      } catch (e) {
        console.warn('Error loading theme colors', e);
      }
    };
    loadColors();
  }, []);

  const updateColors = (newColors: Partial<ThemeColors>) => {
    setColors(prev => ({ ...prev, ...newColors }));
  };

  return (
    <ColorThemeContext.Provider value={{ colors, updateColors }}>
      {children}
    </ColorThemeContext.Provider>
  );
};