import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Wishlist item structure - we keep it flexible so callers can add minimal info (id)
export interface WishlistItem {
  id: number;
  name?: string;
  price?: number | string;
  image?: any; // local require or uri
}

interface WishlistContextType {
  items: WishlistItem[];
  toggleWishlist: (payload: number | WishlistItem) => void;
  addToWishlist: (payload: number | WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  clearWishlist: () => void;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<WishlistItem[]>([]);

  // Load from AsyncStorage on mount
  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const stored = await AsyncStorage.getItem('wishlist');
        if (stored) {
          setItems(JSON.parse(stored));
        }
      } catch (e) {
        console.warn('Error loading wishlist', e);
      }
    };
    loadWishlist();
  }, []);

  // Save to AsyncStorage whenever items change
  useEffect(() => {
    const saveWishlist = async () => {
      try {
        await AsyncStorage.setItem('wishlist', JSON.stringify(items));
      } catch (e) {
        console.warn('Error saving wishlist', e);
      }
    };
    saveWishlist();
  }, [items]);

  const findIndex = (id: number) => items.findIndex((i) => i.id === id);

  const toggleWishlist = (payload: number | WishlistItem) => {
    const id = typeof payload === 'number' ? payload : payload.id;
    const idx = findIndex(id);
    if (idx >= 0) {
      // remove
      setItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      // add - preserve any provided metadata
      const itemToAdd: WishlistItem = typeof payload === 'number' ? { id: payload } : payload;
      setItems((prev) => [...prev, itemToAdd]);
    }
  };

  const addToWishlist = (payload: number | WishlistItem) => {
    const id = typeof payload === 'number' ? payload : payload.id;
    if (items.some((i) => i.id === id)) return;
    const itemToAdd: WishlistItem = typeof payload === 'number' ? { id: payload } : payload;
    setItems((prev) => [...prev, itemToAdd]);
  };

  const removeFromWishlist = (id: number) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  };

  const isInWishlist = (id: number) => {
    return items.some((i) => i.id === id);
  };

  const clearWishlist = () => {
    setItems([]);
  };

  const wishlistCount = items.length;

  return (
    <WishlistContext.Provider
      value={{
        items,
        toggleWishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
