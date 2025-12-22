"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
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
import { router } from "expo-router";
import { useColorTheme } from "../../../contexts/ColorThemeContext";

// Card sizes for each page
const sizes = {
  home: {
    small: { width: 145, minHeight: 200, imageHeight: 80 },
    medium: { width: 160, minHeight: 250, imageHeight: 110 },
    large: { width: 250, minHeight: 300, imageHeight: 150 },
  },
  shop: {
    small: { width: 150, minHeight: 180, imageHeight: 70 },
    medium: { width: 160, minHeight: 220, imageHeight: 100 },
    large: { width: 170, minHeight: 260, imageHeight: 130 },
  },
  blog: {
    small: { width: 370, minHeight: 240, imageHeight: 90 },
    medium: { width: 370, minHeight: 280, imageHeight: 120 },
    large: { width: 370, minHeight: 320, imageHeight: 160 },
  },
};

type CardSize = "small" | "medium" | "large";
type Page = "home" | "shop" | "blog";

// Card Size Context
const CardSizeContext = createContext<{
  cardSizeForPage: (page: Page) => any;
  selectedSizes: Record<Page, CardSize>;
  setHomeSize: (size: CardSize) => void;
  setShopSize: (size: CardSize) => void;
  setBlogSize: (size: CardSize) => void;
} | null>(null);

export const useCardSize = () => {
  const context = useContext(CardSizeContext);
  if (!context) throw new Error("useCardSize must be used within CardSizeProvider");
  return context;
};

export const CardSizeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedSizes, setSelectedSizes] = useState<Record<Page, CardSize>>({
    home: "medium",
    shop: "medium",
    blog: "medium",
  });

  useEffect(() => {
    const loadSelectedSizes = async () => {
      try {
        const storedSizes = await AsyncStorage.getItem("store_card_sizes");
        if (storedSizes) setSelectedSizes(JSON.parse(storedSizes));
      } catch (e) {
        console.warn("Error loading card sizes", e);
      }
    };
    loadSelectedSizes();
  }, []);

  const setHomeSize = (size: CardSize) => setSelectedSizes(prev => ({ ...prev, home: size }));
  const setShopSize = (size: CardSize) => setSelectedSizes(prev => ({ ...prev, shop: size }));
  const setBlogSize = (size: CardSize) => setSelectedSizes(prev => ({ ...prev, blog: size }));

  const cardSizeForPage = (page: Page) => sizes[page][selectedSizes[page]];

  return (
    <CardSizeContext.Provider value={{ cardSizeForPage, selectedSizes, setHomeSize, setShopSize, setBlogSize }}>
      {children}
    </CardSizeContext.Provider>
  );
};

export default function ThemeScreen() {
  const { selectedSizes, setHomeSize, setShopSize, setBlogSize, cardSizeForPage } = useCardSize();
  const { updateColors } = useColorTheme();

  const [logo, setLogo] = useState<string>("");
  const [storeName, setStoreName] = useState<string>("My Store");
  const [primary, setPrimary] = useState<string>("#3B82F6");
  const [secondary, setSecondary] = useState<string>("#6B7280");
  const [accent, setAccent] = useState<string>("#10B981");
  const [background, setBackground] = useState<string>("#FFFFFF");
  const [font, setFont] = useState<string>("System");

  const [colorModalVisible, setColorModalVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [currentSetter, setCurrentSetter] = useState<(color: string) => void>(() => {});

  const presetColors = [
    "#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF",
    "#4B0082", "#8B00FF", "#FF1493", "#00FFFF", "#FFAA00",
    "#A52A2A", "#222222", "#444444", "#999999", "#FFFFFF",
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
        ] = await Promise.all([
          AsyncStorage.getItem("store_logo"),
          AsyncStorage.getItem("store_name"),
          AsyncStorage.getItem("store_primary"),
          AsyncStorage.getItem("store_secondary"),
          AsyncStorage.getItem("store_accent"),
          AsyncStorage.getItem("store_background"),
          AsyncStorage.getItem("store_font"),
        ]);

        if (storedLogo) setLogo(storedLogo);
        if (storedName) setStoreName(storedName);
        if (storedPrimary) setPrimary(storedPrimary);
        if (storedSecondary) setSecondary(storedSecondary);
        if (storedAccent) setAccent(storedAccent);
        if (storedBackground) setBackground(storedBackground);
        if (storedFont) setFont(storedFont);
      } catch (e) {
        console.warn("Error loading theme settings", e);
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled && result.assets?.[0].uri) setLogo(result.assets[0].uri);
  };

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
        AsyncStorage.setItem("store_card_sizes", JSON.stringify(selectedSizes)),
      ]);
      Alert.alert("Success", "Theme saved successfully!");
      updateColors({ primary, secondary, accent, background });
      router.push("/(tab)");
    } catch (e) {
      Alert.alert("Error", "Error saving theme.");
      console.warn("Error saving theme", e);
    }
  };

  const cardSizes: CardSize[] = ["small", "medium", "large"];

  return (
    <ScrollView style={[styles.container, { backgroundColor: background }]}>
      <Text style={styles.title}>Store Settings</Text>

      {/* Branding */}
      <Text style={styles.sectionTitle}>Store Branding</Text>
      <View style={styles.logoContainer}>
        {logo ? (
          <Image source={{ uri: logo }} style={styles.logo} />
        ) : (
          <View style={styles.logoPlaceholder}>
            <Text style={styles.placeholderText}>No Logo</Text>
          </View>
        )}
        <TouchableOpacity onPress={pickImage} style={[styles.button, { flex: 1, marginLeft: 10 }]}>
          <Text style={styles.buttonText}>Upload Logo</Text>
        </TouchableOpacity>
      </View>

      {logo && (
        <View style={styles.previewSection}>
          <Text style={styles.label}>Logo Preview (as in header):</Text>
          <View style={[styles.headerPreview, { backgroundColor: primary, borderBottomColor: primary }]}>
            <Image source={{ uri: logo }} style={styles.headerPreviewLogo} />
            <Text style={[styles.headerPreviewText, { color: getContrastColor(primary) }]}>{storeName}</Text>
          </View>
        </View>
      )}

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
        {[{ label: "Primary", value: primary, setter: setPrimary },
          { label: "Secondary", value: secondary, setter: setSecondary },
          { label: "Accent", value: accent, setter: setAccent },
          { label: "Background", value: background, setter: setBackground },
        ].map(item => (
          <TouchableOpacity key={item.label} onPress={() => openColorPicker(item.value, item.setter)} style={styles.colorRow}>
            <View style={[styles.colorPreview, { backgroundColor: item.value }]} />
            <Text style={styles.label}>{item.label}: {item.value}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Color Modal */}
      <Modal transparent visible={colorModalVisible} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Pick Color</Text>
            <TextInput value={selectedColor} onChangeText={setSelectedColor} style={styles.colorInput} placeholder="#000000" />
            <View style={styles.grid}>
              {presetColors.map(c => (
                <TouchableOpacity key={c} style={[styles.gridColor, { backgroundColor: c }]} onPress={() => setSelectedColor(c)} />
              ))}
            </View>
            <View style={[styles.bigPreview, { backgroundColor: selectedColor }]} />
            <TouchableOpacity onPress={applyColor} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Apply</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setColorModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Card Sizes */}
      <Text style={styles.sectionTitle}>Card Size</Text>
      <View style={styles.sizeButtonRow}>
        {cardSizes.map(size => (
          <TouchableOpacity key={size} onPress={() => setHomeSize(size)} style={[styles.button, selectedSizes.home === size ? { backgroundColor: primary } : { backgroundColor: "#eee" }]}>
            <Text style={{ color: selectedSizes.home === size ? "#fff" : "#000", fontWeight: "600" }}>{size}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Previews */}
      {["Home", "Shop", "Blog"].map(section => {
        const page = section.toLowerCase() as Page;
        const previewStyle = cardSizeForPage(page);
        const handlePreviewPress = () => {
          if (section === "Shop") router.push("/(tab)/shop");
          else if (section === "Blog") router.push("/(tab)/Blog");
        };

        return (
          <View key={section}>
            <Text style={styles.sectionTitle}>{section} Preview</Text>
            {(section === "Shop" || section === "Blog") && (
              <View style={styles.sizeButtonRow}>
                {cardSizes.map(size => (
                  <TouchableOpacity key={size} onPress={() => section === "Shop" ? setShopSize(size) : setBlogSize(size)}
                    style={[styles.button, selectedSizes[page] === size ? { backgroundColor: primary } : { backgroundColor: "#eee" }]}>
                    <Text style={{ color: selectedSizes[page] === size ? "#fff" : "#000", fontWeight: "600" }}>{size}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <TouchableOpacity style={styles.previewBox} onPress={section === "Home" ? undefined : handlePreviewPress}>
              <View style={[styles.previewCard, previewStyle]} />
            </TouchableOpacity>
          </View>
        );
      })}

      <TouchableOpacity onPress={handleSave} style={[styles.button, { backgroundColor: primary, marginTop: 20, marginBottom: 30 }]}>
        <Text style={[styles.buttonText, { color: getContrastColor(primary) }]}>Save Theme & Continue</Text>
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
  logoContainer: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  logo: { width: 80, height: 80, borderRadius: 10, resizeMode: "contain" },
  logoPlaceholder: { width: 80, height: 80, borderRadius: 10, backgroundColor: "#bd4646ff", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#ddd" },
  placeholderText: { color: "#999", fontWeight: "600" },
  previewSection: { marginBottom: 20, padding: 12, backgroundColor: "#f9f9f9", borderRadius: 10 },
  headerPreview: { flexDirection: "row", alignItems: "center", padding: 12, borderRadius: 10, borderBottomWidth: 1, marginTop: 8 },
  headerPreviewLogo: { width: 40, height: 40, borderRadius: 8, marginRight: 10, resizeMode: "contain" },
  headerPreviewText: { fontSize: 16, fontWeight: "bold", flex: 1 },
  label: { fontWeight: "600", marginBottom: 5 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 10, marginBottom: 10, fontSize: 14 },
  button: { padding: 10, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  buttonText: { fontWeight: "600", color: "#fff" },
  colorRow: { flexDirection: "row", alignItems: "center", padding: 12, borderWidth: 1, borderColor: "#e41b1bff", borderRadius: 10, backgroundColor: "#fff" },
  colorPreview: { width: 40, height: 40, borderRadius: 8, marginRight: 12, borderWidth: 1, borderColor: "#999" },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  modalBox: { width: "85%", padding: 20, borderRadius: 15, backgroundColor: "#fff", alignItems: "center" },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10 },
  colorInput: { borderWidth: 1, borderColor: "#aaa", borderRadius: 10, padding: 10, width: "100%", marginBottom: 10, textAlign: "center", fontSize: 14 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginBottom: 15 },
  gridColor: { width: 40, height: 40, borderRadius: 8, margin: 5, borderWidth: 1, borderColor: "#222" },
  bigPreview: { width: "100%", height: 120, borderRadius: 12, borderWidth: 1, borderColor: "#666", marginBottom: 20 },
  previewBox: { borderWidth: 1, borderColor: "#ccc", borderRadius: 10, overflow: "hidden", backgroundColor: "#f0f0f0", marginBottom: 20 },
  previewCard: { backgroundColor: "#fff", borderRadius: 12, overflow: "hidden", elevation: 3, borderWidth: 1, borderColor: "#e5e7eb" },
  sizeButtonRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10, gap: 8 },
  modalButton: { backgroundColor: "#16a34a", padding: 12, borderRadius: 10, width: "100%", alignItems: "center", marginBottom: 10 },
  modalButtonText: { color: "#fff", fontWeight: "600" },
  cancelText: { marginTop: 10, color: "#ff6b6b", fontWeight: "600" },
});
