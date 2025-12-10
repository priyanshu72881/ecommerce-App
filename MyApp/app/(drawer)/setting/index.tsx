import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function SettingsPage() {
  const [storeName, setStoreName] = useState("My Fashion Store");
  const [email, setEmail] = useState("admin@example.com");
  const [phone, setPhone] = useState("+91 9876543210");
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {/* -------- PROFILE SETTINGS -------- */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Profile Settings</Text>

        <View style={styles.inputBox}>
          <Text style={styles.label}>Admin Name</Text>
          <TextInput
            value={storeName}
            onChangeText={setStoreName}
            style={styles.input}
          />
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
            keyboardType="phone-pad"
          />
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>

      {/* -------- APPEARANCE SETTINGS -------- */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Appearance</Text>

        <View style={styles.toggleRow}>
          <Text style={styles.label}>Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={() => setDarkMode(!darkMode)}
          />
        </View>
      </View>

      {/* -------- NOTIFICATIONS SETTINGS -------- */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Notifications</Text>

        <View style={styles.toggleRow}>
          <Text style={styles.label}>Enable Notifications</Text>
          <Switch
            value={notifications}
            onValueChange={() => setNotifications(!notifications)}
          />
        </View>
      </View>

      {/* -------- SECURITY SETTINGS -------- */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Security</Text>

        <View style={styles.inputBox}>
          <Text style={styles.label}>Old Password</Text>
          <TextInput style={styles.input} secureTextEntry />
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.label}>New Password</Text>
          <TextInput style={styles.input} secureTextEntry />
        </View>

        <TouchableOpacity style={styles.redButton}>
          <Text style={styles.redButtonText}>Update Password</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    flex: 1,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#000",
  },
  inputBox: {
    marginBottom: 15,
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    color: "#000",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    color: "#000",
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  saveButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  redButton: {
    backgroundColor: "#dc2626",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  redButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
