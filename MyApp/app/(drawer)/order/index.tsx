import React from "react";
import { View, Text } from "react-native";

export default function OrdersPage() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Orders Page
      </Text>

      <Text style={{ marginTop: 10 }}>
        View your orders here
      </Text>
    </View>
  );
}
