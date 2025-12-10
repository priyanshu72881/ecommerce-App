import React from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useCart } from "../../contexts/CartContext";
import { MaterialIcons } from "@expo/vector-icons";
import { Heart } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import {
  useRegisterPageWishlist,
  setActivePage,
  notifyWishlistChanged,
} from "../../contexts/PageWishlistBridge";

export default function Cart() {
  const { items, removeFromCart } = useCart();
  // Page-specific wishlist (local to Cart page)
  const pageKey = "Cart";
  const [wishlist, setWishlist] = React.useState<any[]>([]);
  const isInWishlist = (id: number) => wishlist.some((i) => i.id === id);
  const toggleWishlist = (id: number) => {
    const existing = wishlist.find((i) => i.id === id);
    if (existing) {
      setWishlist((prev) => prev.filter((x) => x.id !== id));
      notifyWishlistChanged(pageKey);
    } else {
      const prod = items.find((p: any) => p.id === id);
      if (!prod) return;
      const itemObj = { id: prod.id, name: prod.title || prod.name, price: prod.price, image: prod.image };
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

  const totalPrice = items.reduce((sum: number, item: any) => sum + (item.price * (item.quantity || 1)), 0);

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialIcons name="shopping-cart" size={64} color="#ccc" />
        <Text style={styles.emptyText}>Your cart is empty</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      <FlatList
        data={items}
        keyExtractor={(item: any) => `${item.id}`}
        renderItem={({ item }: any) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.content}>
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.price}>₹{item.price}</Text>
              <Text style={styles.qty}>Qty: {item.quantity || 1}</Text>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity
                onPress={() => toggleWishlist(item.id)}
                style={styles.wishlistBtn}
              >
                <Heart 
                  size={20} 
                  color={isInWishlist(item.id) ? "#ef4444" : "#999"}
                  fill={isInWishlist(item.id) ? "#ef4444" : "none"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => removeFromCart(item.id)}
                style={styles.removeBtn}
              >
                <MaterialIcons name="close" size={20} color="#ef4444" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <View style={styles.footer}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalPrice}>₹{totalPrice.toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.checkoutBtn}>
        <Text style={styles.checkoutText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  emptyText: { marginTop: 16, fontSize: 16, color: "#999" },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  image: { width: 80, height: 80, resizeMode: "contain" },
  content: { flex: 1, marginLeft: 12 },
  name: { fontWeight: "600", fontSize: 14, marginBottom: 4 },
  price: { fontSize: 14, color: "#10b981", fontWeight: "bold", marginBottom: 4 },
  qty: { fontSize: 12, color: "#666" },
  actionButtons: { flexDirection: "row", gap: 8, alignItems: "center" },
  wishlistBtn: { padding: 8 },
  removeBtn: { padding: 8 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    marginBottom: 16,
  },
  totalLabel: { fontSize: 16, fontWeight: "bold" },
  totalPrice: { fontSize: 18, fontWeight: "bold", color: "#10b981" },
  checkoutBtn: {
    backgroundColor: "#10b981",
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkoutText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
