// app/product/[id]/index.tsx

import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { useCart } from "../../../../contexts/CartContext";

// Fetch Single Product
async function getProduct(id: string) {
  try {
    const res = await fetch(
      `${process.env.EXPO_PUBLIC_BASE_URL}/api/product/${id}`
    );

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.log("API ERROR:", error);
    return null;
  }
}

export default function ProductPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const { addToCart } = useCart();

  React.useEffect(() => {
    if (id) {
      getProduct(id).then((data) => {
        setProduct(data);
        setLoading(false);
      });
    }
  }, [id]);

  // Loading State
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  // Product Not Found
  if (!product) {
    return (
      <View className="p-10 items-center">
        <Text className="text-red-500 text-xl">❌ Product Not Found!</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-6">
      
      {/* MAIN PRODUCT */}
      <View className="flex flex-col gap-10">

        {/* IMAGE */}
        <View className="items-center">
          <Image
            source={{ uri: product.image }}
            style={{
              width: 350,
              height: 350,
              borderRadius: 15,
            }}
            resizeMode="cover"
          />
        </View>

        {/* DETAILS */}
        <View>
          <Text className="text-3xl font-bold text-black mb-2">
            {product.name}
          </Text>

          <Text className="text-gray-500 text-sm mb-3">{product.type}</Text>

          <Text className="text-gray-700 mb-4 leading-relaxed">
            {product.description}
          </Text>

          <Text
            className="text-2xl font-extrabold mb-4"
            style={{ color: "#16a34a" }}
          >
            ₹{product.price}
          </Text>

          <TouchableOpacity
            onPress={() => {
              addToCart({
                id: parseInt(product.id || "0"),
                title: product.name,
                price: product.price,
                image: product.image,
              });
              Alert.alert("Success", `${product.name} added to cart!`);
            }}
            className="bg-black px-6 py-3 rounded-lg"
          >
            <Text className="text-white text-center text-base">Add to Cart</Text>
          </TouchableOpacity>
        </View>

      </View>

    </ScrollView>
  );
}
