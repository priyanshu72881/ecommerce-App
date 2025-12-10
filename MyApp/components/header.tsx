import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, Alert, Modal, FlatList, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { Heart, ShoppingCart, User, Menu, Search, Package } from "lucide-react-native";
import { useCartStore } from "../stores/cartStore";
import { useThemeStore } from "../stores/themeStore";
import { useCart } from "../contexts/CartContext";
import {
  onActivePageChange,
  onActiveWishlistChange,
  getWishlistForKey,
  getActiveKey,
  removeFromPageWishlist,
} from "../contexts/PageWishlistBridge";
import Sidebar from "./sidebar";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Header() {
  const navigation = useNavigation();
  const router = useRouter();

  // Get cart count from Context API
  const { cartCount } = useCart();
  // Page-specific wishlist bridge
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [activeKeyLocal, setActiveKeyLocal] = useState<string | null>(null);
  const [currentWishlist, setCurrentWishlist] = useState<any[]>([]);
  useEffect(() => {
    // subscribe to active page changes
    const unsub = onActivePageChange((k) => {
      setActiveKeyLocal(k);
      setCurrentWishlist(getWishlistForKey(k));
    });
    const unsub2 = onActiveWishlistChange(() => {
      setCurrentWishlist(getWishlistForKey(getActiveKey()));
    });
    // initialize
    setActiveKeyLocal(getActiveKey());
    setCurrentWishlist(getWishlistForKey(getActiveKey()));
    return () => {
      unsub();
      unsub2();
    };
  }, []);
  const cartCountStore = useCartStore((state: any) => state.items.length);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load theme from Zustand store
  const logo = useThemeStore((state) => state.logo);
  const storeName = useThemeStore((state) => state.storeName);
  const primary = useThemeStore((state) => state.primary);
  const background = useThemeStore((state) => state.background);
  const font = useThemeStore((state) => state.font);

  // Compute contrast color based on primary background
  const [contrastColor, setContrastColor] = useState<string>("#fff");

  const getContrastColor = (hexColor: string): string => {
    try {
      const c = hexColor.replace("#", "");
      const r = parseInt(c.substring(0, 2), 16) / 255;
      const g = parseInt(c.substring(2, 4), 16) / 255;
      const b = parseInt(c.substring(4, 6), 16) / 255;
      const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      return luminance > 0.6 ? "#000" : "#fff";
    } catch (e) {
      return "#fff";
    }
  };

  // Load theme from AsyncStorage on mount to persist between sessions
  useEffect(() => {
    const loadThemeFromStorage = async () => {
      try {
        const [storedLogo, storedName, storedPrimary, storedBackground, storedFont] =
          await Promise.all([
            AsyncStorage.getItem("store_logo"),
            AsyncStorage.getItem("store_name"),
            AsyncStorage.getItem("store_primary"),
            AsyncStorage.getItem("store_background"),
            AsyncStorage.getItem("store_font"),
          ]);

        if (storedLogo) useThemeStore.setState({ logo: storedLogo });
        if (storedName) useThemeStore.setState({ storeName: storedName });
        if (storedPrimary) useThemeStore.setState({ primary: storedPrimary });
        if (storedBackground) useThemeStore.setState({ background: storedBackground });
        if (storedFont) useThemeStore.setState({ font: storedFont });
      } catch (err) {
        console.warn("[Header] loadThemeFromStorage error", err);
      }
    };

    loadThemeFromStorage();

    // Listen to focus event to reload theme after settings are saved
    const unsubscribe = (navigation as any)?.addListener?.("focus", () => {
      loadThemeFromStorage();
    });

    return () => {
      try {
        unsubscribe && typeof unsubscribe === "function" && unsubscribe();
      } catch (e) {}
    };
  }, [navigation]);

  // Update contrast color whenever primary changes
  useEffect(() => {
    setContrastColor(getContrastColor(primary));
  }, [primary]);

  const toggleDrawer = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      Alert.alert("Search", `Searching for: ${searchQuery}`);
      setSearchQuery("");
    }
  };

  // Check if we're inside drawer screen
  const state = (navigation as any).getState && (navigation as any).getState();
  const isInDrawer = state?.routeNames?.includes("(drawer)") &&
                     state?.routes?.[state.index]?.name?.includes("(drawer)");

  // Minimal header for drawer screens
  if (isInDrawer) {
    return (
      <View style={[styles.minimalHeader, { backgroundColor: primary }]}>
        <TouchableOpacity onPress={toggleDrawer}>
          <Menu size={26} color={contrastColor} />
        </TouchableOpacity>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </View>
    );
  }

  // Full header for tab screens
  return (
    <>
      <View style={[styles.header, { backgroundColor: primary }]}>
        <View style={styles.topRow}>
          {/* Sidebar Toggle */}
          <View style={styles.menuContainer}>
            <TouchableOpacity onPress={toggleDrawer}>
              <Menu size={26} color={contrastColor} />
            </TouchableOpacity>
          </View>

          {/* Logo + Store Name */}
          <View style={styles.brandContainer}>
            {logo ? (
              <Image
                source={{ uri: logo }}
                style={styles.logoImage}
                accessibilityLabel="store-logo"
              />
            ) : (
              <View style={[styles.logoPlaceholder, { backgroundColor: contrastColor }]}>
                <Package size={20} color={primary} />
              </View>
            )}
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                styles.storeName,
                {
                  color: contrastColor,
                  fontFamily: font || "Inter",
                },
              ]}
            >
              {storeName || "My Store"}
            </Text>
          </View>

          {/* Right Icons */}
          <View style={styles.rightIcons}>
            <TouchableOpacity onPress={() => setWishlistOpen(true)}>
              <Heart size={22} color={contrastColor} />
              {currentWishlist.length > 0 && (
                <View style={styles.wishlistCountBadge}>
                  <Text style={styles.badgeText}>{currentWishlist.length}</Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/(drawer)/cart")}>
              <ShoppingCart size={22} color={contrastColor} />
              {cartCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartCount}</Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/(drawer)/profile")}>
              <User size={22} color={contrastColor} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchRow}>
          <TextInput
            placeholder="Search for products..."
            style={[styles.searchInput, { backgroundColor: background }]}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Search size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        {/* Wishlist Modal */}
        <Modal visible={wishlistOpen} transparent animationType="fade">
          <Pressable style={styles.modalOverlay} onPress={() => setWishlistOpen(false)} />
          <View style={styles.wishlistModal}>
            <Text style={styles.wishlistTitle}>Wishlist</Text>
            {currentWishlist.length === 0 ? (
              <Text style={styles.emptyText}>Your wishlist is empty.</Text>
            ) : (
              <FlatList
                data={currentWishlist}
                keyExtractor={(item: any) => `${item.id}`}
                renderItem={({ item }: any) => (
                  <View style={styles.wishlistRow}>
                    {item.image ? (
                      <Image source={item.image} style={styles.wishlistImage} />
                    ) : (
                      <View style={styles.wishlistImagePlaceholder} />
                    )}
                    <View style={{ flex: 1, marginLeft: 10 }}>
                      <Text style={styles.wishlistName}>{item.name || item.title || `Item ${item.id}`}</Text>
                      {item.price != null && <Text style={styles.wishlistPrice}>₹{item.price}</Text>}
                    </View>
                    <TouchableOpacity
                      style={styles.wishlistRemove}
                      onPress={() => removeFromPageWishlist(activeKeyLocal, item.id)}
                    >
                      <Text style={{ color: '#ef4444' }}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            )}
          </View>
        </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 45,
    paddingBottom: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  minimalHeader: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    justifyContent: "center",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  cartBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#ff6b6b",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  wishlistBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#ff6b6b",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginHorizontal: 10,
  },
  logoImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 10,
    resizeMode: "contain",
  },
  logoPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
  },
  storeName: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  rightIcons: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    right: -8,
    top: -8,
    backgroundColor: "#ff6b6b",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  wishlistCountBadge: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "#ff6b6b",
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  wishlistModal: {
    position: "absolute",
    top: 70,
    right: 10,
    left: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    maxHeight: 360,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  wishlistTitle: { fontSize: 16, fontWeight: "700", marginBottom: 8 },
  emptyText: { color: "#666", padding: 8 },
  wishlistRow: { flexDirection: "row", alignItems: "center", paddingVertical: 8, borderBottomWidth: 1, borderColor: "#eee" },
  wishlistImage: { width: 48, height: 48, borderRadius: 8, resizeMode: "cover" },
  wishlistImagePlaceholder: { width: 48, height: 48, borderRadius: 8, backgroundColor: "#f3f4f6" },
  wishlistName: { fontSize: 14, fontWeight: "600" },
  wishlistPrice: { color: "#10b981", fontWeight: "700", marginTop: 4 },
  wishlistRemove: { paddingHorizontal: 8, paddingVertical: 4 },
  searchRow: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
    color: "#333",
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: "#16a34a",
    padding: 10,
    borderRadius: 10,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
