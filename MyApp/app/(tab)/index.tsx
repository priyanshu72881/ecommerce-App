import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../../contexts/CartContext";
import {
  useRegisterPageWishlist,
  setActivePage,
  notifyWishlistChanged,
} from "../../contexts/PageWishlistBridge";

export default function Home() {
  const [homeCardSize, setHomeCardSize] = useState("medium");
  const { addToCart } = useCart();
  // Page-specific wishlist (local)
  const pageKey = "Home";
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
      const itemObj = { id: prod.id, name: prod.name, price: prod.price, image: prod.img };
      setWishlist((prev) => [...prev, itemObj]);
      notifyWishlistChanged(pageKey);
    }
  };

  // register page wishlist with bridge
  useRegisterPageWishlist(pageKey, {
    getItems: () => wishlist,
    remove: (id: number) => setWishlist((prev) => prev.filter((x) => x.id !== id)),
  });

  const navigation = useNavigation();

  React.useEffect(() => {
    const didFocus = () => setActivePage(pageKey);
    const didBlur = () => setActivePage(null);
    // listen to navigation focus/blur via navigation.addListener if available
    const unsubFocus = (navigation as any)?.addListener?.("focus", didFocus);
    const unsubBlur = (navigation as any)?.addListener?.("blur", didBlur);
    // set active on mount
    didFocus();
    return () => {
      unsubFocus && unsubFocus();
      unsubBlur && unsubBlur();
      didBlur();
    };
  }, []);

  const products = [
    { id: 1, img: require("../../assets/images/Frame1.png"), name: "Organic Rice", price: 28.85, old: 32, off: 12 },
    { id: 2, img: require("../../assets/images/Frame 2.png"), name: "Chicken Meatballs", price: 52.85, old: 55, off: 4 },
    { id: 3, img: require("../../assets/images/Frame3.png"), name: "Kettle Corn", price: 48.85, old: 60, off: 24 },
  ];

  const deals = [
    require("../../assets/images/p11.webp"),
    require("../../assets/images/p12.webp"),
    require("../../assets/images/p14.webp"),
  ];

  return (
    <ScrollView style={styles.container}>
      {/* BANNER */}
      <View style={styles.banner}>
        <Image
          source={require("../../assets/images/Frame10.jpg")}
          style={styles.bannerImage}
        />
        <View style={styles.bannerOverlay} />
      </View>

      {/* POPULAR PRODUCTS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Products</Text>

        <View style={styles.productsGrid}>
          {products.map((p) => (
            <View key={p.id} style={styles.productCard}>
              {/* ⭐ Offer Badge */}
              <Text style={styles.discountBadge}>{p.off}% Off</Text>

              {/* ⭐ Wishlist Icon */}
              <TouchableOpacity
                style={styles.wishlistBtn}
                onPress={() => toggleWishlist(p.id)}
              >
                <MaterialIcons
                  name="favorite"
                  size={22}
                  color={isInWishlist(p.id) ? "red" : "#ccc"}
                />
              </TouchableOpacity>

              <Image source={p.img} style={styles.productImage} />

              <Text style={styles.productName}>{p.name}</Text>
              <Text style={styles.company}>By NestFood</Text>

              <View style={styles.priceRow}>
                <Text style={styles.price}>₹{p.price}</Text>
                <Text style={styles.oldPrice}>₹{p.old}</Text>
              </View>

              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => {
                  addToCart({
                    id: p.id,
                    title: p.name,
                    price: p.price,
                    image: p.img,
                  });
                  Alert.alert("Success", `${p.name} added to cart!`);
                }}
              >
                <Text style={styles.addBtnText}>+ Add to Cart</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {/* DEALS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Deals Of The Day</Text>

        <View style={styles.dealsGrid}>
          {[
            { id: 4, img: deals[0], name: "Fresh Vegetables Mix", price: 100 },
            { id: 5, img: deals[1], name: "Organic Fruits Bundle", price: 100 },
            { id: 6, img: deals[2], name: "Premium Groceries", price: 100 },
          ].map((p) => (
            <View key={p.id} style={styles.dealCard}>
              <Image source={p.img} style={styles.dealImage} />
              <Text style={styles.dealPrice}>₹{p.price}</Text>

              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => {
                  addToCart({
                    id: p.id,
                    title: p.name,
                    price: p.price,
                    image: p.img,
                  });
                  Alert.alert("Success", `${p.name} added to cart!`);
                }}
              >
                <Text style={styles.addBtnText}>Add</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {/* CATEGORY */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shop by Categories</Text>

        <View style={styles.categoryGrid}>
          <View style={styles.catBox}>
            <MaterialIcons
              name="local-grocery-store"
              size={36}
              color="#16a34a"
            />
            <Text style={styles.catTitle}>Vegetables</Text>
            <Text style={styles.catCount}>34 items</Text>
          </View>

          <View style={styles.catBox}>
            <MaterialIcons name="apple" size={36} color="#10b981" />
            <Text style={styles.catTitle}>Fresh Fruits</Text>
            <Text style={styles.catCount}>18 items</Text>
          </View>

          <View style={styles.catBox}>
            <MaterialIcons name="set-meal" size={36} color="#3b82f6" />
            <Text style={styles.catTitle}>Fish & Meat</Text>
            <Text style={styles.catCount}>12 items</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  banner: { height: 260, position: "relative" },
  bannerImage: { width: "100%", height: "100%", resizeMode: "cover" },
  bannerOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.2)" },

  section: { padding: 16 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 14 },

  productsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12, justifyContent: "space-between" },

  productCard: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    position: "relative",
    alignItems: "center",
  },

  discountBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#10b981",
    color: "#fff",
    fontSize: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    zIndex: 10,
  },

  wishlistBtn: { position: "absolute", top: 8, right: 8, padding: 4, zIndex: 10 },

  productImage: { width: "100%", height: 120, resizeMode: "contain", marginTop: 22 },
  productName: { fontWeight: "600", fontSize: 14, marginTop: 6 },
  company: { fontSize: 12, color: "#6b7280" },

  priceRow: { flexDirection: "row", gap: 8, marginTop: 4 },
  price: { fontWeight: "bold", color: "#10b981" },
  oldPrice: { textDecorationLine: "line-through", color: "#9ca3af" },

  addBtn: { backgroundColor: "#10b981", paddingVertical: 8, borderRadius: 6, marginTop: 8, width: "100%" },
  addBtnText: { textAlign: "center", color: "#fff", fontWeight: "bold" },

  dealsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  dealCard: { width: "47%", backgroundColor: "#ecfdf5", padding: 12, borderRadius: 10, alignItems: "center" },
  dealImage: { width: 80, height: 80, resizeMode: "contain" },
  dealPrice: { marginTop: 8, color: "#16a34a", fontSize: 16, fontWeight: "bold" },

  categoryGrid: { flexDirection: "row", justifyContent: "space-between" },
  catBox: { width: "30%", backgroundColor: "#fff", padding: 12, borderRadius: 10, alignItems: "center", borderWidth: 1, borderColor: "#e5e7eb" },
  catTitle: { fontWeight: "bold", marginTop: 4 },
  catCount: { fontSize: 12, color: "#777" },
});
