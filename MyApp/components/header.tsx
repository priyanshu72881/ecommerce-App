import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
  FlatList,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { Heart, ShoppingCart, User, Menu, Search, Package } from "lucide-react-native";
import Sidebar from "./sidebar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";

// JSON products
import homeProducts from "../Product.json";
import shopProducts from "../shop.json";
import blogProducts from "../Blog.json";

export default function Header() {
  const router = useRouter();
  const { cartCount, addToCart } = useCart();
  const { items: wishlistItems, removeFromWishlist } = useWishlist();

  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchModalVisible, setSearchModalVisible] = useState(false);

  // Theme
  const [logo, setLogo] = useState<string | null>(null);
  const [storeName, setStoreName] = useState<string>("My Store");
  const [primary, setPrimary] = useState<string>("#3B82F6");
  const [background, setBackground] = useState<string>("#fff");
  const [font, setFont] = useState<string>("System");
  const [contrastColor, setContrastColor] = useState("#fff");

  const getContrastColor = (hex: string) => {
    try {
      const c = hex.replace("#", "");
      const r = parseInt(c.substring(0, 2), 16) / 255;
      const g = parseInt(c.substring(2, 4), 16) / 255;
      const b = parseInt(c.substring(4, 6), 16) / 255;
      const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      return luminance > 0.6 ? "#000" : "#fff";
    } catch {
      return "#fff";
    }
  };

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const [storedLogo, storedName, storedPrimary, storedBackground, storedFont] =
          await Promise.all([
            AsyncStorage.getItem("store_logo"),
            AsyncStorage.getItem("store_name"),
            AsyncStorage.getItem("store_primary"),
            AsyncStorage.getItem("store_background"),
            AsyncStorage.getItem("store_font"),
          ]);
        if (storedLogo) setLogo(storedLogo);
        if (storedName) setStoreName(storedName);
        if (storedPrimary) setPrimary(storedPrimary);
        if (storedBackground) setBackground(storedBackground);
        if (storedFont) setFont(storedFont);
      } catch (err) {
        console.warn(err);
      }
    };
    loadTheme();
  }, []);

  useEffect(() => {
    setContrastColor(getContrastColor(primary));
  }, [primary]);

  const toggleDrawer = () => setSidebarOpen(!sidebarOpen);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    const query = searchQuery.toLowerCase();
    const combined = [...homeProducts, ...shopProducts, ...blogProducts];
    const results = combined.filter(
      (item) =>
        (item.name && item.name.toLowerCase().includes(query)) ||
        (item.title && item.title.toLowerCase().includes(query))
    );
    setSearchResults(results);
    setSearchModalVisible(true);
  };

  const renderSearchItem = ({ item }: any) => (
    <View style={styles.searchResultRow}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.searchImage} />
      ) : (
        <View style={styles.searchImagePlaceholder} />
      )}
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.searchName}>{item.name || item.title}</Text>
        {item.price && <Text style={styles.searchPrice}>₹{item.price}</Text>}
      </View>
      <TouchableOpacity onPress={() => addToCart(item)}>
        <Text style={{ color: "#16a34a", fontWeight: "700" }}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <View style={[styles.header, { backgroundColor: primary }]}>
        <View style={styles.topRow}>
          {/* Sidebar */}
          <TouchableOpacity onPress={toggleDrawer}>
            <Menu size={26} color={contrastColor} />
          </TouchableOpacity>

          {/* Logo + Store */}
          <View style={styles.brandContainer}>
            {logo ? (
              <Image source={{ uri: logo }} style={styles.logoImage} />
            ) : (
              <View style={[styles.logoPlaceholder, { backgroundColor: contrastColor }]}>
                <Package size={20} color={primary} />
              </View>
            )}
            <Text style={[styles.storeName, { color: contrastColor, fontFamily: font }]}>
              {storeName}
            </Text>
          </View>

          {/* Right Icons */}
          <View style={styles.rightIcons}>
            <TouchableOpacity onPress={() => setWishlistOpen(true)}>
              <Heart size={22} color={contrastColor} />
              {wishlistItems.length > 0 && (
                <View style={styles.wishlistCountBadge}>
                  <Text style={styles.badgeText}>{wishlistItems.length}</Text>
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

        {/* Search */}
        <View style={styles.searchRow}>
          <TextInput
            placeholder="Search products..."
            style={[styles.searchInput, { backgroundColor: background }]}
            value={searchQuery}
            onChangeText={setSearchQuery}
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
          {wishlistItems.length === 0 ? (
            <Text style={styles.emptyText}>Your wishlist is empty.</Text>
          ) : (
            <FlatList
              data={wishlistItems}
              keyExtractor={(item: any) => `${item.id}`}
              renderItem={({ item }: any) => (
                <View style={styles.wishlistRow}>
                  {item.image ? (
                    <Image source={{ uri: item.image }} style={styles.wishlistImage} />
                  ) : (
                    <View style={styles.wishlistImagePlaceholder} />
                  )}
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.wishlistName}>{item.name || item.title}</Text>
                    {item.price && <Text style={styles.wishlistPrice}>₹{item.price}</Text>}
                  </View>
                  <TouchableOpacity onPress={() => removeFromWishlist(item.id)}>
                    <Text style={{ color: "#ef4444" }}>Remove</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        </View>
      </Modal>

      {/* Search Results Modal */}
      <Modal visible={searchModalVisible} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setSearchModalVisible(false)} />
        <View style={styles.searchModal}>
          <Text style={styles.searchTitle}>Search Results</Text>
          {searchResults.length === 0 ? (
            <Text style={styles.emptyText}>No results found for "{searchQuery}"</Text>
          ) : (
            <FlatList
              data={searchResults}
              keyExtractor={(item: any) => `${item.id}`}
              renderItem={renderSearchItem}
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
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brandContainer: { flexDirection: "row", alignItems: "center", flex: 1, marginHorizontal: 10 },
  logoImage: { width: 40, height: 40, borderRadius: 8, marginRight: 10, resizeMode: "contain" },
  logoPlaceholder: { width: 40, height: 40, borderRadius: 8, marginRight: 10, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(0,0,0,0.2)" },
  storeName: { fontSize: 18, fontWeight: "bold", flex: 1 },
  rightIcons: { flexDirection: "row", gap: 12, alignItems: "center" },
  badge: { position: "absolute", right: -8, top: -8, backgroundColor: "#ff6b6b", borderRadius: 10, minWidth: 20, height: 20, alignItems: "center", justifyContent: "center" },
  badgeText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
  wishlistCountBadge: { position: "absolute", top: -6, right: -6, backgroundColor: "#ff6b6b", borderRadius: 9, minWidth: 18, height: 18, alignItems: "center", justifyContent: "center" },
  searchRow: { flexDirection: "row", marginTop: 10, alignItems: "center" },
  searchInput: { flex: 1, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, fontSize: 15, color: "#333" },
  searchButton: { marginLeft: 10, backgroundColor: "#16a34a", padding: 10, borderRadius: 10, width: 50, alignItems: "center", justifyContent: "center" },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)" },
  wishlistModal: { position: "absolute", top: 70, right: 10, left: 10, backgroundColor: "#fff", borderRadius: 12, maxHeight: 360, padding: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.15, shadowRadius: 12, elevation: 8 },
  wishlistTitle: { fontSize: 16, fontWeight: "700", marginBottom: 8 },
  wishlistRow: { flexDirection: "row", alignItems: "center", paddingVertical: 8, borderBottomWidth: 1, borderColor: "#eee" },
  wishlistImage: { width: 48, height: 48, borderRadius: 8, resizeMode: "cover" },
  wishlistImagePlaceholder: { width: 48, height: 48, borderRadius: 8, backgroundColor: "#f3f4f6" },
  wishlistName: { fontSize: 14, fontWeight: "600" },
  wishlistPrice: { color: "#10b981", fontWeight: "700", marginTop: 4 },
  searchModal: { position: "absolute", top: 70, right: 10, left: 10, backgroundColor: "#fff", borderRadius: 12, maxHeight: 400, padding: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.15, shadowRadius: 12, elevation: 8 },
  searchTitle: { fontSize: 16, fontWeight: "700", marginBottom: 8 },
  searchResultRow: { flexDirection: "row", alignItems: "center", paddingVertical: 8, borderBottomWidth: 1, borderColor: "#eee" },
  searchImage: { width: 48, height: 48, borderRadius: 8, resizeMode: "cover" },
  searchImagePlaceholder: { width: 48, height: 48, borderRadius: 8, backgroundColor: "#f3f4f6" },
  searchName: { fontSize: 14, fontWeight: "600" },
  searchPrice: { color: "#10b981", fontWeight: "700", marginTop: 4 },
  emptyText: { color: "#666", padding: 8 },
});
