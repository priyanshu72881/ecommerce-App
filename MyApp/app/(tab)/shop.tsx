import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useCart } from "../../contexts/CartContext";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useRegisterPageWishlist,
  setActivePage,
  notifyWishlistChanged,
} from "../../contexts/PageWishlistBridge";
import { useCardSize } from "../(drawer)/theme";
import { useWishlist } from "../../contexts/WishlistContext";
import { Heart } from "lucide-react-native";
import products from "../../shop.json";
import CardItem from "../../components/CardItem";
import { useColorTheme } from "../../contexts/ColorThemeContext";

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { addToCart } = useCart();
  const { cardSize } = useCardSize();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { colors } = useColorTheme();

  const navigation = useNavigation();
  React.useEffect(() => {
    const didFocus = () => null;
    const didBlur = () => null;
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

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={styles.title}>Popular Products</Text>

      {/* Product List */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <CardItem
            id={item.id}
            image={item.image}
            title={item.name}
            price={item.price}
            page="shop"
            onToggleWishlist={toggleWishlist}
            isInWishlist={isInWishlist}
            onAddToCart={handleAddToCart}
          />
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

  card: { backgroundColor: "#fff", borderRadius: 14, overflow: "hidden", elevation: 3, margin: 6 },

  imageContainer: {
    position: "relative",
    width: "100%",
  },

  discountBadge: { position: "absolute", top: 10, left: 10, backgroundColor: "#dcfce7", paddingHorizontal: 6, paddingVertical: 3, borderRadius: 6, zIndex: 10 },
  discountText: { color: "#10b981", fontSize: 12, fontWeight: "600" },
  image: { width: "100%", height: "100%", resizeMode: "contain", borderTopLeftRadius: 14, borderTopRightRadius: 14 },
  wishlistBtn: { position: "absolute", top: 10, right: 10, zIndex: 10 },

  cardContent: {
    padding: 12,
  },

  productTitle: { fontSize: 14, fontWeight: "600", color: "#111827", marginBottom: 4 },
  brand: { fontSize: 12, color: "#6b7280", marginBottom: 12 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  price: { fontSize: 16, fontWeight: "700", color: "#10b981" },
  addBtn: { backgroundColor: "#10b981", paddingHorizontal: 16, paddingVertical: 6, borderRadius: 8 },
  addBtnText: { color: "#fff", fontWeight: "600" },
});
