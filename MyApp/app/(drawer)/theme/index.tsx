"use client";

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { useThemeStore } from "../../../stores/themeStore";

type CardSize = "small" | "medium" | "large";

type RouteParams = {
  tenant?: string;
};

export default function ThemeScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ params: RouteParams }, "params">>();

  // Load from Zustand store
  const {
    logo,
    storeName,
    primary,
    secondary,
    accent,
    background,
    font,
    homeCardSize,
    shopCardSize,
    blogCardSize,
    setLogo,
    setStoreName,
    setPrimary,
    setSecondary,
    setAccent,
    setBackground,
    setFont,
    setHomeCardSize,
    setShopCardSize,
    setBlogCardSize,
  } = useThemeStore();

  // Color Picker States
  const [colorModalVisible, setColorModalVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [currentSetter, setCurrentSetter] = useState<(color: string) => void>(
    () => {}
  );

  // Color Grid
  const presetColors = [
    "#FF0000",
    "#FF7F00",
    "#FFFF00",
    "#00FF00",
    "#0000FF",
    "#4B0082",
    "#8B00FF",
    "#FF1493",
    "#00FFFF",
    "#FFAA00",
    "#A52A2A",
    "#222222",
    "#444444",
    "#999999",
    "#FFFFFF",
  ];

  const openColorPicker = (value: string, setter: (color: string) => void) => {
    setSelectedColor(value);
    setCurrentSetter(() => setter);
    setColorModalVisible(true);
  };

  const applyColor = () => {
    currentSetter(selectedColor);
    setColorModalVisible(false);
  };

  // Load All Saved from AsyncStorage on mount
  useEffect(() => {
    (async () => {
      try {
        const [
          storedLogo,
          storedName,
          storedPrimary,
          storedSecondary,
          storedAccent,
          storedBackground,
          storedFont,
          storedHomeCard,
          storedShopCard,
          storedBlogCard,
        ] = await Promise.all([
          AsyncStorage.getItem("store_logo"),
          AsyncStorage.getItem("store_name"),
          AsyncStorage.getItem("store_primary"),
          AsyncStorage.getItem("store_secondary"),
          AsyncStorage.getItem("store_accent"),
          AsyncStorage.getItem("store_background"),
          AsyncStorage.getItem("store_font"),
          AsyncStorage.getItem("store_card_home"),
          AsyncStorage.getItem("store_card_shop"),
          AsyncStorage.getItem("store_card_blog"),
        ]);

        if (storedLogo) setLogo(storedLogo);
        if (storedName) setStoreName(storedName);
        if (storedPrimary) setPrimary(storedPrimary);
        if (storedSecondary) setSecondary(storedSecondary);
        if (storedAccent) setAccent(storedAccent);
        if (storedBackground) setBackground(storedBackground);
        if (storedFont) setFont(storedFont);
        if (storedHomeCard) setHomeCardSize(storedHomeCard as CardSize);
        if (storedShopCard) setShopCardSize(storedShopCard as CardSize);
        if (storedBlogCard) setBlogCardSize(storedBlogCard as CardSize);
      } catch (e) {
        console.warn("Error loading theme settings", e);
      }
    })();
  }, [
    setLogo,
    setStoreName,
    setPrimary,
    setSecondary,
    setAccent,
    setBackground,
    setFont,
    setHomeCardSize,
    setShopCardSize,
    setBlogCardSize,
  ]);

  // Logo Picker
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0].uri) {
      setLogo(result.assets[0].uri);
    }
  };

  // Save Everything to AsyncStorage and Zustand
  const handleSave = async () => {
    try {
      await Promise.all([
        AsyncStorage.setItem("store_logo", logo || ""),
        AsyncStorage.setItem("store_name", storeName),
        AsyncStorage.setItem("store_primary", primary),
        AsyncStorage.setItem("store_secondary", secondary),
        AsyncStorage.setItem("store_accent", accent),
        AsyncStorage.setItem("store_background", background),
        AsyncStorage.setItem("store_font", font),
        AsyncStorage.setItem("store_card_home", homeCardSize),
        AsyncStorage.setItem("store_card_shop", shopCardSize),
        AsyncStorage.setItem("store_card_blog", blogCardSize),
      ]);

      Alert.alert("Success", "Theme saved successfully!");
      navigation.navigate("index" as never);
    } catch (e) {
      Alert.alert("Error", "Error saving theme.");
      console.warn("Error saving theme", e);
    }
  };

  const cardSizes = ["small", "medium", "large"] as const;

  const getCardSizeStyle = (
    size: CardSize,
    page: "home" | "shop" | "blog"
  ) => {
    const sizes = {
      home: { small: 250, medium: 250, large: 300 },
      shop: { small: 200, medium: 245, large: 288 },
      blog: { small: 250, medium: 300, large: 350 },
    };

    const width =
      page === "home"
        ? sizes.home[size]
        : page === "shop"
        ? sizes.shop[size]
        : sizes.blog[size];

    return {
      width,
      height: 300,
    };
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: background }]}>
      <Text style={styles.title}>Store Settings</Text>

      {/* Logo & Store Name Section */}
      <Text style={styles.sectionTitle}>Store Branding</Text>
      <View style={styles.logoContainer}>
        {logo ? (
          <Image source={{ uri: logo }} style={styles.logo} />
        ) : (
          <View style={styles.logoPlaceholder}>
            <Text style={styles.placeholderText}>No Logo</Text>
          </View>
        )}
        <TouchableOpacity
          onPress={pickImage}
          style={[styles.button, { flex: 1, marginLeft: 10 }]}
        >
          <Text style={styles.buttonText}>Upload Logo</Text>
        </TouchableOpacity>
      </View>

      {/* Logo Preview */}
      {logo && (
        <View style={styles.previewSection}>
          <Text style={styles.label}>Logo Preview (as in header):</Text>
          <View
            style={[
              styles.headerPreview,
              { backgroundColor: primary, borderBottomColor: primary },
            ]}
          >
            <Image
              source={{ uri: logo }}
              style={styles.headerPreviewLogo}
            />
            <Text style={[styles.headerPreviewText, { color: getContrastColor(primary) }]}>
              {storeName}
            </Text>
          </View>
        </View>
      )}

      {/* Store Name Input */}
      <Text style={styles.label}>Store Name</Text>
      <TextInput
        value={storeName}
        onChangeText={setStoreName}
        style={styles.input}
        placeholder="Enter store name"
        placeholderTextColor="#999"
      />

      {/* Theme Colors */}
      <Text style={styles.sectionTitle}>Theme Colors</Text>

      <View style={{ gap: 12 }}>
        {[
          { label: "Primary", value: primary, setter: setPrimary },
          { label: "Secondary", value: secondary, setter: setSecondary },
          { label: "Accent", value: accent, setter: setAccent },
          { label: "Background", value: background, setter: setBackground },
        ].map((item) => (
          <TouchableOpacity
            key={item.label}
            onPress={() => openColorPicker(item.value, item.setter)}
            style={styles.colorRow}
          >
            <View
              style={[styles.colorPreview, { backgroundColor: item.value }]}
            />
            <Text style={styles.label}>
              {item.label}: {item.value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal With Color Grid */}
      <Modal transparent visible={colorModalVisible} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Pick Color</Text>

            {/* HEX INPUT */}
            <TextInput
              value={selectedColor}
              onChangeText={setSelectedColor}
              style={styles.colorInput}
              placeholder="#000000"
            />

            {/* GRID */}
            <View style={styles.grid}>
              {presetColors.map((c) => (
                <TouchableOpacity
                  key={c}
                  style={[styles.gridColor, { backgroundColor: c }]}
                  onPress={() => setSelectedColor(c)}
                />
              ))}
            </View>

            {/* BIG PREVIEW */}
            <View
              style={[styles.bigPreview, { backgroundColor: selectedColor }]}
            />

            <TouchableOpacity onPress={applyColor} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Apply</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setColorModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* CARD SIZE SECTION */}
      {["Home", "Shop", "Blog"].map((section) => {
        const sizeState =
          section === "Home"
            ? homeCardSize
            : section === "Shop"
            ? shopCardSize
            : blogCardSize;

        const setSizeState =
          section === "Home"
            ? setHomeCardSize
            : section === "Shop"
            ? setShopCardSize
            : setBlogCardSize;

        const previewStyle = getCardSizeStyle(
          sizeState,
          section.toLowerCase() as "home" | "shop" | "blog"
        );

        return (
          <View key={section}>
            <Text style={styles.sectionTitle}>{section} Card Size</Text>

            {/* Buttons */}
            <View style={styles.sizeButtonRow}>
              {cardSizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  onPress={() => setSizeState(size)}
                  style={[
                    styles.button,
                    sizeState === size
                      ? { backgroundColor: primary }
                      : { backgroundColor: "#eee" },
                  ]}
                >
                  <Text
                    style={{
                      color: sizeState === size ? "#fff" : "#000",
                      fontWeight: "600",
                    }}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* PREVIEW BOX */}
            <View style={[styles.previewBox, previewStyle]}>
              <Image
                source={{ uri: "https://via.placeholder.com/300x300?text=Product" }}
                style={{ width: "100%", height: "100%", resizeMode: "cover" }}
              />
            </View>
          </View>
        );
      })}

      {/* Save Button */}
      <TouchableOpacity
        onPress={handleSave}
        style={[styles.button, { backgroundColor: primary, marginTop: 20, marginBottom: 30 }]}
      >
        <Text style={[styles.buttonText, { color: getContrastColor(primary) }]}>
          Save Theme & Continue
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function getContrastColor(hexColor: string): string {
  try {
    const c = hexColor.replace("#", "");
    const r = parseInt(c.substring(0, 2), 16) / 255;
    const g = parseInt(c.substring(2, 4), 16) / 255;
    const b = parseInt(c.substring(4, 6), 16) / 255;
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance > 0.6 ? "#000" : "#fff";
  } catch (e) {
    return "#fff";
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 32, fontWeight: "bold", marginBottom: 20 },
  sectionTitle: { fontSize: 22, fontWeight: "600", marginBottom: 10, marginTop: 15 },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: { width: 80, height: 80, borderRadius: 10, resizeMode: "contain" },
  logoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: "#bd4646ff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  placeholderText: { color: "#999", fontWeight: "600" },
  previewSection: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
  headerPreview: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    borderBottomWidth: 1,
    marginTop: 8,
  },
  headerPreviewLogo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 10,
    resizeMode: "contain",
  },
  headerPreviewText: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  label: { fontWeight: "600", marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    fontSize: 14,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: { fontWeight: "600", color: "#fff" },

  /** Color Picker */
  colorRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#e41b1bff",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  colorPreview: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#999",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "85%",
    padding: 20,
    borderRadius: 15,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },

  colorInput: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 10,
    padding: 10,
    width: "100%",
    marginBottom: 10,
    textAlign: "center",
    fontSize: 14,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 15,
  },
  gridColor: {
    width: 40,
    height: 40,
    borderRadius: 8,
    margin: 5,
    borderWidth: 1,
    borderColor: "#222",
  },

  bigPreview: {
    width: "100%",
    height: 120,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#666",
    marginBottom: 20,
  },

  previewBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
    marginBottom: 20,
  },

  sizeButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    gap: 8,
  },

  modalButton: {
    backgroundColor: "#16a34a",
    padding: 12,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  modalButtonText: { color: "#fff", fontWeight: "600" },
  cancelText: { marginTop: 10, color: "#ff6b6b", fontWeight: "600" },
});

