import { create } from 'zustand';

const cardSizes = {
  small: { width: 140, minHeight: 210, imageHeight: 80 },
  medium: { width: 170, minHeight: 250, imageHeight: 110 },
  large: { width: 200, minHeight: 300, imageHeight: 150 },
};

interface ThemeStore {
  // Logo & Branding
  logo: string | null;
  storeName: string;
  setLogo: (logo: string | null) => void;
  setStoreName: (name: string) => void;

  // Theme Colors
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  font: string;

  setPrimary: (color: string) => void;
  setSecondary: (color: string) => void;
  setAccent: (color: string) => void;
  setBackground: (color: string) => void;
  setFont: (font: string) => void;

  // Card Sizes
  selectedSize: 'small' | 'medium' | 'large';
  cardSize: { width: number; minHeight: number; imageHeight: number };
  setSize: (size: 'small' | 'medium' | 'large') => void;

  // Reset to defaults
  resetTheme: () => void;
}

const DEFAULT_STATE = {
  logo: null,
  storeName: 'My Store',
  primary: '#3B82F6',
  secondary: '#FACC15',
  accent: '#10B981',
  background: '#FFFFFF',
  font: 'Inter',
  selectedSize: 'medium' as const,
};

export const useThemeStore = create<ThemeStore>((set, get) => ({
  ...DEFAULT_STATE,
  cardSize: cardSizes.medium,

  setLogo: (logo) => set({ logo }),
  setStoreName: (name) => set({ storeName: name }),

  setPrimary: (color) => set({ primary: color }),
  setSecondary: (color) => set({ secondary: color }),
  setAccent: (color) => set({ accent: color }),
  setBackground: (color) => set({ background: color }),
  setFont: (font) => set({ font }),

  setSize: (size) => set({ selectedSize: size, cardSize: cardSizes[size] }),

  resetTheme: () => set({ ...DEFAULT_STATE, cardSize: cardSizes.medium }),
}));
