import React, { createContext, useContext, useState, ReactNode } from 'react';
import cardSizes from '../assets/cardSizes.json';

interface CardSize {
  width: number;
  height: number;
}

interface ThemeContextType {
  cardSize: CardSize;
  setCardSize: (size: CardSize) => void;
  setHomeSize: () => void;
  setShopSize: () => void;
  setBlogSize: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [cardSize, setCardSize] = useState<CardSize>(cardSizes.home);

  const setHomeSize = () => setCardSize(cardSizes.home);
  const setShopSize = () => setCardSize(cardSizes.shop);
  const setBlogSize = () => setCardSize(cardSizes.blog);

  return (
    <ThemeContext.Provider value={{ cardSize, setCardSize, setHomeSize, setShopSize, setBlogSize }}>
      {children}
    </ThemeContext.Provider>
  );
};