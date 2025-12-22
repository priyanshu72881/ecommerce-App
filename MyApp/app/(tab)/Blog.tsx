import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { Heart, Plus } from "lucide-react-native";
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
import products from "../../Blog.json";
import CardItem from "../../components/CardItem";
import { useColorTheme } from "../../contexts/ColorThemeContext";

const imagePath = require("../../assets/images/Frame5.png");

export default function Blog() {
  const { addToCart } = useCart();
  const { cardSize } = useCardSize();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { colors } = useColorTheme();
  const pageKey = "Blog";

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
    <View style={{ flex: 1, backgroundColor: colors.background }}>
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
            page="blog"
            onToggleWishlist={toggleWishlist}
            isInWishlist={isInWishlist}
            onAddToCart={handleAddToCart}
          />
        )}
        contentContainerStyle={{ padding: 10, paddingBottom: 50 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 3,
  },

  imageContainer: {
    position: "relative",
    width: "100%",
  },

  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  wishlistBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#ffffff",
    padding: 6,
    borderRadius: 30,
    elevation: 5,
  },

  addBtn: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "#16a34a",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
  },

  cardContent: {
    padding: 12,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },

  cardSubtitle: {
    fontSize: 13,
    color: "#6b7280",
  },

  priceText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#16a34a",
  },
});
