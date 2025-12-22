import React from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Header from "../components/header";
import { CartProvider } from "../contexts/CartContext";
import { ThemeProvider } from "../contexts/ThemeContext";
import { CardSizeProvider } from "./(drawer)/theme";
import { WishlistProvider } from "../contexts/WishlistContext";
import { ColorThemeProvider } from "../contexts/ColorThemeContext";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CardSizeProvider>
        <ColorThemeProvider>
          <ThemeProvider>
            <WishlistProvider>
              <CartProvider>
                <Header />
                <Stack>
                  <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
                  <Stack.Screen name="(tab)" options={{ headerShown: false }} />
                </Stack>
              </CartProvider>
            </WishlistProvider>
          </ThemeProvider>
        </ColorThemeProvider>
      </CardSizeProvider>
    </GestureHandlerRootView>
  );
}
