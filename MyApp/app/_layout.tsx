import React from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Header from "../components/header";
import { CartProvider } from "../contexts/CartContext";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CartProvider>
        <Header />
        <Stack
          screenOptions={{
            headerShown: false,   // Hide native header
          }}
        >
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          <Stack.Screen name="(tab)" options={{ headerShown: false }} />
        </Stack>
      </CartProvider>
    </GestureHandlerRootView>
  );
}
