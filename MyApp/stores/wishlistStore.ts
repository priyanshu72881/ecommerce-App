import { create } from 'zustand';

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  img: any;
}

interface WishlistStore {
  items: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
}

export const useWishlistStore = create<WishlistStore>((set) => ({
  items: [],
  addToWishlist: (item) =>
    set((state) => {
      // Avoid duplicates
      const exists = state.items.find((i) => i.id === item.id);
      if (exists) return state;
      return { items: [...state.items, item] };
    }),
  removeFromWishlist: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
}));
