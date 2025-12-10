import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useCart } from "../../contexts/CartContext";
import { useNavigation } from "@react-navigation/native";
import {
  useRegisterPageWishlist,
  setActivePage,
  notifyWishlistChanged,
} from "../../contexts/PageWishlistBridge";

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { addToCart } = useCart();
  // Page-specific wishlist (local)
  const pageKey = "Shop";
  const [wishlist, setWishlist] = React.useState<any[]>([]);
  const isInWishlist = (id: number) => wishlist.some((i) => i.id === id);
  const toggleWishlist = (id: number) => {
    const existing = wishlist.find((i) => i.id === id);
    if (existing) {
      setWishlist((prev) => prev.filter((x) => x.id !== id));
      notifyWishlistChanged(pageKey);
    } else {
      const prod = products.find((p) => p.id === id);
      if (!prod) return;
      const itemObj = { id: prod.id, name: prod.title, price: prod.price, image: prod.image };
      setWishlist((prev) => [...prev, itemObj]);
      notifyWishlistChanged(pageKey);
    }
  };

  // register page wishlist
  useRegisterPageWishlist(pageKey, {
    getItems: () => wishlist,
    remove: (id: number) => setWishlist((prev) => prev.filter((x) => x.id !== id)),
  });

  const navigation = useNavigation();
  React.useEffect(() => {
    const didFocus = () => setActivePage(pageKey);
    const didBlur = () => setActivePage(null);
    const unsubFocus = (navigation as any)?.addListener?.("focus", didFocus);
    const unsubBlur = (navigation as any)?.addListener?.("blur", didBlur);
    didFocus();
    return () => {
      unsubFocus && unsubFocus();
      unsubBlur && unsubBlur();
      didBlur();
    };
  }, []);

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
    });
    Alert.alert("Success", `${item.title} added to cart!`);
  };


  const products = [
    { id: 1, title: "Seeds of Change Organic Red Rice", brand: "NestFood", price: "₹28.85", image: require("../../assets/images/Frame3.png"), discount: "12%", category: "All" },
    { id: 2, title: "All Natural Chicken Meatballs", brand: "NestFood", price: "₹52.85", image: require("../../assets/images/Frame3.png"), discount: "4%", category: "All" },
    { id: 3, title: "Sweet & Salty Kettle Corn", brand: "Country Crock", price: "₹48.85", image: require("../../assets/images/Frame3.png"), discount: "24%", category: "All" },
    { id: 4, title: "Crispy Classic", brand: "Country Crock", price: "₹17.85", image: require("../../assets/images/Frame3.png"), discount: "32%", category: "All" },
     { id: 5, title: "Seeds of Change Organic Red Rice", brand: "NestFood", price: "₹28.85", image: require("../../assets/images/Frame3.png"), discount: "12%", category: "All" },
    { id: 6, title: "All Natural Chicken Meatballs", brand: "NestFood", price: "₹52.85", image: require("../../assets/images/Frame3.png"), discount: "4%", category: "All" },
    { id: 7, title: "Sweet & Salty Kettle Corn", brand: "Country Crock", price: "₹48.85", image: require("../../assets/images/Frame3.png"), discount: "24%", category: "All" },
    { id: 8, title: "Crispy Classic", brand: "Country Crock", price: "₹17.85", image: require("../../assets/images/Frame3.png"), discount: "32%", category: "All" },
  ];

  const categories: string[] = [];

  const filtered = products.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Popular Products</Text>

      {/* Category Tabs */}
      <View style={styles.categoryRow}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setActiveCategory(cat)}
            style={[
              styles.categoryBtn,
              activeCategory === cat && styles.categoryActive,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                activeCategory === cat && styles.categoryActiveText,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Product List */}
      <FlatList
        data={filtered}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{item.discount} OFF</Text>
            </View>

            <Image source={item.image} style={styles.image} />

            {/* ⭐ Wishlist Icon */}
            <TouchableOpacity
              style={styles.wishlistBtn}
              onPress={() => toggleWishlist(item.id)}
            >
              <MaterialIcons
                name="favorite"
                size={22}
                color={isInWishlist(item.id) ? "red" : "#ccc"} // 🔴 Full red when clicked
              />
            </TouchableOpacity>

            <Text style={styles.productTitle} numberOfLines={2}>
              {item.title}
            </Text>

            <Text style={styles.brand}>By {item.brand}</Text>

            <View style={styles.row}>
              <Text style={styles.price}>{item.price}</Text>
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => handleAddToCart(item)}
              >
                <Text style={styles.addBtnText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F3F4F6" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16, color: "#111827" },

  categoryRow: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 20 },
  categoryBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: "#d1d5db" },
  categoryActive: { backgroundColor: "#10b981", borderColor: "#10b981" },
  categoryText: { color: "#374151" },
  categoryActiveText: { color: "#fff" },

  card: { width: "48%", backgroundColor: "#fff", borderRadius: 14, padding: 10, marginBottom: 18, elevation: 3, position: "relative" },
  discountBadge: { position: "absolute", top: 10, left: 10, backgroundColor: "#dcfce7", paddingHorizontal: 6, paddingVertical: 3, borderRadius: 6 },
  discountText: { color: "#10b981", fontSize: 12, fontWeight: "600" },
  image: { width: "100%", height: 130, resizeMode: "cover", borderRadius: 10, marginBottom: 10 },
  wishlistBtn: { position: "absolute", top: 10, right: 10 },
  productTitle: { fontSize: 14, fontWeight: "600", color: "#111827", marginBottom: 4 },
  brand: { fontSize: 12, color: "#6b7280", marginBottom: 12 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  price: { fontSize: 16, fontWeight: "700", color: "#10b981" },
  addBtn: { backgroundColor: "#10b981", paddingHorizontal: 16, paddingVertical: 6, borderRadius: 8 },
  addBtnText: { color: "#fff", fontWeight: "600" },
});
