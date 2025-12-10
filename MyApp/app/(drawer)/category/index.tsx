import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";

export default function CategoriesMainPage() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        {/* PAGE TITLE */}
        <Text style={styles.title}>All Categories</Text>

        {/* PLACEHOLDER: Popular Products Section */}
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Categories will be displayed here</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  innerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 16,
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
