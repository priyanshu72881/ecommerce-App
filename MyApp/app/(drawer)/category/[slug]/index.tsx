import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function CategoryPage() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [slug]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>
        {slug ? slug.replace("-", " ") : "Category"} Category
      </Text>

      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>Products for {slug} will be displayed here</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9fafb",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#1f2937",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholder: {
    padding: 16,
    backgroundColor: "#e5e7eb",
    borderRadius: 8,
    alignItems: "center",
  },
  placeholderText: {
    color: "#6b7280",
    fontSize: 14,
  },
});
