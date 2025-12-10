import { useEffect } from 'react';

// Simple in-memory bridge to let pages keep local wishlist state
// while exposing the "current page" wishlist to the Header.

type Getter = () => any[];
type Remover = (id: number) => void;
type PageAPI = { getItems: Getter; remove?: Remover };

const registry = new Map<string, PageAPI>();
let activeKey: string | null = null;

const activePageListeners = new Set<(key: string | null) => void>();
const activeWishlistListeners = new Set<() => void>();

export const registerPageWishlist = (key: string, api: PageAPI) => {
  registry.set(key, api);
};

export const unregisterPageWishlist = (key: string) => {
  registry.delete(key);
};

export const setActivePage = (key: string | null) => {
  activeKey = key;
  activePageListeners.forEach((cb) => cb(activeKey));
};

export const onActivePageChange = (cb: (key: string | null) => void) => {
  activePageListeners.add(cb);
  return () => activePageListeners.delete(cb);
};

export const notifyWishlistChanged = (key: string) => {
  // notify listeners only if this page is active
  if (key === activeKey) {
    activeWishlistListeners.forEach((cb) => cb());
  }
};

export const onActiveWishlistChange = (cb: () => void) => {
  activeWishlistListeners.add(cb);
  return () => activeWishlistListeners.delete(cb);
};

export const getWishlistForKey = (key: string | null) => {
  if (!key) return [];
  const api = registry.get(key);
  try {
    return api ? api.getItems() : [];
  } catch (e) {
    return [];
  }
};

export const removeFromPageWishlist = (key: string | null, id: number) => {
  if (!key) return;
  const api = registry.get(key);
  try {
    api?.remove && api.remove(id);
    // notify listeners that active wishlist changed
    if (key === activeKey) {
      activeWishlistListeners.forEach((cb) => cb());
    }
  } catch (e) {}
};

export const getActiveKey = () => activeKey;

// small helper React hook to register + cleanup (optional convenience)
export const useRegisterPageWishlist = (key: string, api: PageAPI) => {
  useEffect(() => {
    registerPageWishlist(key, api);
    return () => unregisterPageWishlist(key);
  }, [key]);
};
