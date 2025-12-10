import { create } from 'zustand';

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
  homeCardSize: 'small' | 'medium' | 'large';
  shopCardSize: 'small' | 'medium' | 'large';
  blogCardSize: 'small' | 'medium' | 'large';

  setHomeCardSize: (size: 'small' | 'medium' | 'large') => void;
  setShopCardSize: (size: 'small' | 'medium' | 'large') => void;
  setBlogCardSize: (size: 'small' | 'medium' | 'large') => void;

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
  homeCardSize: 'medium' as const,
  shopCardSize: 'medium' as const,
  blogCardSize: 'medium' as const,
};

export const useThemeStore = create<ThemeStore>((set) => ({
  ...DEFAULT_STATE,

  setLogo: (logo) => set({ logo }),
  setStoreName: (name) => set({ storeName: name }),

  setPrimary: (color) => set({ primary: color }),
  setSecondary: (color) => set({ secondary: color }),
  setAccent: (color) => set({ accent: color }),
  setBackground: (color) => set({ background: color }),
  setFont: (font) => set({ font }),

  setHomeCardSize: (size) => set({ homeCardSize: size }),
  setShopCardSize: (size) => set({ shopCardSize: size }),
  setBlogCardSize: (size) => set({ blogCardSize: size }),

  resetTheme: () => set(DEFAULT_STATE),
}));
