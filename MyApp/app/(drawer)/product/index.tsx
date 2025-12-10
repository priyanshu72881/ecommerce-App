// app/(drawer)/product/index.tsx - Product List Page

import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, FlatList, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useCart } from "../../../contexts/CartContext";

export default function ProductPage() {
  const router = useRouter();
  const { addToCart } = useCart();

  // MAIN PRODUCT
  const product = {
    id: "1",
    name: "Men's Classic Shirt",
    type: "Shirt",
    price: 1299,
    description:
      "Premium cotton slim-fit shirt designed for comfort and durability, suitable for stylish everyday wear.",
    image: "https://via.placeholder.com/300",
  };

  // RELATED PRODUCTS
  const relatedProducts = [
    {
      id: 1,
      name: "Blue Shirt",
      type: "Shirt",
      price: 999,
      description:
        "Soft cotton blue casual shirt offering comfort and a modern daily wear look.",
      image: "https://via.placeholder.com/200/87ceeb",
    },
    {
      id: 2,
      name: "Black Hoodie",
      type: "Hoodie",
      price: 1499,
      description:
        "Warm winter hoodie with a perfect fit and comfortable soft fabric.",
      image: "https://via.placeholder.com/200/000000",
    },
    {
      id: 3,
      name: "White T-Shirt",
      type: "T-Shirt",
      price: 599,
      description:
        "Premium lightweight white tee made from breathable cotton fabric.",
      image: "https://via.placeholder.com/200/ffffff",
    },
    {
      id: 4,
      name: "Denim Jacket",
      type: "Jacket",
      price: 1999,
      description:
        "Durable denim jacket ideal for layering and everyday fashion.",
      image: "https://via.placeholder.com/200/1e90ff",
    },
  ];

  const renderRelatedItem = ({ item }: { item: any }) => (
    <View style={{
      backgroundColor: '#fff',
      borderRadius: 20,
      padding: 12,
      marginRight: 16,
      width: 180,
      shadowColor: '#4f46e5',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 5,
    }}>
      <View style={{ position: 'relative' }}>
        <Image
          source={{ uri: item.image }}
          style={{ width: 180, height: 180, borderRadius: 15 }}
        />
        <TouchableOpacity
          onPress={() => {
            addToCart({
              id: item.id,
              title: item.name,
              price: item.price,
              image: item.image,
            });
            Alert.alert("Success", `${item.name} added to cart!`);
          }}
          style={{
          position: 'absolute',
          top: 8,
          right: 8,
          width: 32,
          height: 32,
          borderRadius: 16,
          backgroundColor: '#facc15',
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#f97316',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.4,
          shadowRadius: 4,
          elevation: 3,
        }}>
          <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 8, alignItems: 'center' }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#7c3aed', textAlign: 'center' }}>{item.name}</Text>
        <Text style={{ fontSize: 12, color: '#3b82f6', textAlign: 'center' }}>{item.type}</Text>
        <Text style={{ fontSize: 10, color: '#374151', textAlign: 'center', marginTop: 4 }}>{item.description}</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#ef4444', textAlign: 'center', marginTop: 4 }}>₹{item.price}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f3f4f6', padding: 16 }}>
      
      {/* MAIN PRODUCT */}
      <View style={{
        alignItems: 'center',
        marginBottom: 24,
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 20,
        shadowColor: '#7c3aed',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
      }}>
        <Image
          source={{ uri: product.image }}
          style={{ width: 300, height: 300, borderRadius: 20 }}
        />
        <Text style={{ fontSize: 28, fontWeight: '800', color: '#4f46e5', textAlign: 'center', marginTop: 12 }}>{product.name}</Text>
        <Text style={{ fontSize: 14, color: '#10b981', textAlign: 'center', marginTop: 4 }}>{product.type}</Text>
        <Text style={{ fontSize: 14, color: '#374151', textAlign: 'center', marginTop: 6 }}>{product.description}</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#f97316', textAlign: 'center', marginTop: 6 }}>₹{product.price}</Text>

        <TouchableOpacity
          onPress={() => {
            addToCart({
              id: product.id,
              title: product.name,
              price: product.price,
              image: product.image,
            });
            Alert.alert("Success", `${product.name} added to cart!`);
          }}
          style={{
          marginTop: 16,
          paddingVertical: 12,
          paddingHorizontal: 32,
          borderRadius: 12,
          backgroundColor: '#8b5cf6',
          shadowColor: '#f472b6',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.4,
          shadowRadius: 6,
          elevation: 5,
        }}>
          <Text style={{ color: 'white', fontWeight: '700', fontSize: 16 }}>Add to Cart</Text>
        </TouchableOpacity>
      </View>

      {/* RELATED PRODUCTS */}
      <Text style={{ fontSize: 22, fontWeight: '700', color: '#4f46e5', marginBottom: 12 }}>Related Products</Text>

      <FlatList
        data={relatedProducts}
        renderItem={renderRelatedItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 12 }}
      />
    </ScrollView>
  );
}
