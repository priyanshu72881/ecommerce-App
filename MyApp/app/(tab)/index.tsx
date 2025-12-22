import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../../contexts/CartContext";
import { useCardSize } from "../(drawer)/theme";
import { useWishlist } from "../../contexts/WishlistContext";
import products from "../../Product.json";
import CardItem from "../../components/CardItem";
import { useColorTheme } from "../../contexts/ColorThemeContext";

export default function Home() {
  const navigation = useNavigation();
  const { addToCart } = useCart();
  const { cardSizeForPage } = useCardSize();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { colors } = useColorTheme();

  const homeCardSize = cardSizeForPage("home");

  // Determine number of columns based on card width
  const getNumColumns = () => {
    if (homeCardSize.width >= 250) return 1; // Large: one card per row
    if (homeCardSize.width >= 160) return 2; // Medium: two cards
    return 2; // Small: two cards (or 3 if you prefer)
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
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

        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          numColumns={getNumColumns()}
          renderItem={({ item }) => {
            if (getNumColumns() === 1) {
              // Center single card for large size
              return (
                <View style={{ alignItems: "center", marginVertical: 8 }}>
                  <CardItem
                    id={item.id}
                    image={item.image}
                    title={item.name}
                    price={item.price}
                    page="home"
                    cardSize={homeCardSize}
                    onToggleWishlist={toggleWishlist}
                    isInWishlist={isInWishlist}
                    onAddToCart={addToCart}
                  />
                </View>
              );
            }

            // For multi-column layout
            return (
              <CardItem
                id={item.id}
                image={item.image}
                title={item.name}
                price={item.price}
                page="home"
                cardSize={homeCardSize}
                onToggleWishlist={toggleWishlist}
                isInWishlist={isInWishlist}
                onAddToCart={addToCart}
                style={{ marginBottom: 12 }}
              />
            );
          }}
          columnWrapperStyle={getNumColumns() > 1 ? { justifyContent: "space-between" } : undefined}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  banner: { height: 260 },
  bannerImage: { width: "100%", height: "100%", resizeMode: "cover" },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  section: { padding: 16 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 14 },
});
