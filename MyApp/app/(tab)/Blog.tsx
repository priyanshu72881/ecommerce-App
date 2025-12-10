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
import {
  useRegisterPageWishlist,
  setActivePage,
  notifyWishlistChanged,
} from "../../contexts/PageWishlistBridge";

const imagePath = require("../../assets/images/Frame5.png");

const dataList = [
  { id: 1, title: "The intermediate Guide to Healthy Food", image: imagePath, author: "Admin", date: "Jan 20, 2024", price: 12.99 },
  { id: 2, title: "Summer Quinoa Salad With Lemon Dill", image: imagePath, author: "Chef Laura", date: "Jan 19, 2024", price: 14.99 },
  { id: 3, title: "Caprese Chicken With Marinated Potatoes", image: imagePath, author: "Admin", date: "Jan 18, 2024", price: 15.99 },
  { id: 4, title: "Harissa Chickpeas With Whipped Feta", image: imagePath, author: "Jenny Rose", date: "Jan 17, 2024", price: 13.99 },
  { id: 5, title: "Almond Butter Chocolate Zucchini Bars", image: imagePath, author: "Admin", date: "Jan 15, 2024", price: 10.99 },
  { id: 6, title: "Smoky Beans & Greens Tacos With Salsa Verde", image: imagePath, author: "David Smith", date: "Jan 13, 2024", price: 11.99 },
  { id: 7, title: "Sticky Ginger Rice Bowls with Pickled Veg", image: imagePath, author: "Chef Roy", date: "Jan 10, 2024", price: 13.49 },
  { id: 8, title: "Creamy Garlic Sun-Dried Tomato Pasta", image: imagePath, author: "Jenny Rose", date: "Jan 08, 2024", price: 12.49 },
];

export default function Blog() {
  const { addToCart } = useCart();
  const pageKey = "Blog";
  const [wishlist, setWishlist] = React.useState<any[]>([]);
  const isInWishlist = (id: number) => wishlist.some((i) => i.id === id);
  const toggleWishlist = (id: number) => {
    const existing = wishlist.find((i) => i.id === id);
    if (existing) {
      setWishlist((prev) => prev.filter((x) => x.id !== id));
      notifyWishlistChanged(pageKey);
    } else {
      const article = dataList.find((d) => d.id === id);
      if (!article) return;
      const itemObj = { id: article.id, name: article.title, price: article.price, image: article.image };
      setWishlist((prev) => [...prev, itemObj]);
      notifyWishlistChanged(pageKey);
    }
  };

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

  const handleToggleWishlist = (id: number) => {
    toggleWishlist(id);
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.cardImage} />

        {/* ❤️ Wishlist Button - Top Right */}
        <TouchableOpacity
          style={styles.wishlistBtn}
          onPress={() => handleToggleWishlist(item.id)}
        >
          <Heart
            size={22}
            color={isInWishlist(item.id) ? "red" : "#6b7280"}
            fill={isInWishlist(item.id) ? "red" : "none"}
          />
        </TouchableOpacity>

        {/* ➕ Add Button - Overlay on Image */}
        <TouchableOpacity 
          style={styles.addBtn}
          onPress={() => handleAddToCart(item)}
        >
          <Plus size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.cardSubtitle}>
            {item.date} • {item.author}
          </Text>
          <Text style={styles.priceText}>${item.price.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={dataList}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 10, paddingBottom: 50 }}
    />
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
    height: 180,
  },

  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
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
