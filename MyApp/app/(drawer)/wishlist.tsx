import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  getActiveKey,
  getWishlistForKey,
  onActivePageChange,
  onActiveWishlistChange,
  removeFromPageWishlist,
} from "../../contexts/PageWishlistBridge";

export default function Wishlist() {
  const [items, setItems] = useState<any[]>([]);
  const [activeKey, setActiveKey] = useState<string | null>(getActiveKey());

  useEffect(() => {
    const update = () => setItems(getWishlistForKey(getActiveKey()));
    const unsubPage = onActivePageChange((k) => {
      setActiveKey(k);
      setItems(getWishlistForKey(k));
    });
    const unsubWishlist = onActiveWishlistChange(() => {
      setItems(getWishlistForKey(getActiveKey()));
    });
    // initial
    update();
    return () => {
      unsubPage();
      unsubWishlist();
    };
  }, []);

  if (!items || items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialIcons name="favorite-border" size={64} color="#ccc" />
        <Text style={styles.emptyText}>Your wishlist is empty.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(it) => `${it.id}`}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.image ? (
              <Image source={item.image} style={styles.image} />
            ) : null}
            <View style={styles.content}>
              <Text style={styles.name}>{item.name || item.title || `Item ${item.id}`}</Text>
              {item.price != null && <Text style={styles.price}>₹{item.price}</Text>}
            </View>
            <TouchableOpacity style={styles.removeBtn} onPress={() => removeFromPageWishlist(activeKey, item.id)}>
              <Text style={{ color: '#ef4444' }}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
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
  price: { fontSize: 14, color: "#10b981", fontWeight: "bold" },
  removeBtn: { padding: 8 },
});
