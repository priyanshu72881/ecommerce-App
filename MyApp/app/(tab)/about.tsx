// app/about.tsx

import React from "react";
import { View, Text, ScrollView, Image, StyleSheet, FlatList } from "react-native";

export default function About() {
  const whatWeProvide = [
    { title: "Best Prices & Offers", desc: "Get affordable groceries everyday." },
    { title: "Wide Assortment", desc: "Choose from thousands of products." },
    { title: "Free Delivery", desc: "Fast delivery to your doorstep." },
    { title: "Easy Returns", desc: "Hassle-free returns & refunds." },
    { title: "100% Satisfaction", desc: "Quality checked guaranteed items." },
    { title: "Great Daily Deals", desc: "Special offer everyday for you." },
  ];

  const teamMembers = [
    { name: "Jasmin K.", role: "Marketing Manager", img: "https://via.placeholder.com/300" },
    { name: "Kristin W.", role: "Nutrition Expert", img: "https://via.placeholder.com/300" },
    { name: "Angela S.", role: "Product Specialist", img: "https://via.placeholder.com/300" },
  ];

  const stats = ["Orders every day", "Happy clients", "Team members", "Products sold"];

  return (
    <ScrollView style={styles.container}>
      
      {/* HERO SECTION */}
      <View style={styles.heroContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/600x550" }}
          style={styles.heroImage}
        />
        <View style={styles.heroTextContainer}>
          <Text style={styles.heroTitle}>Welcome to Nest</Text>
          <Text style={styles.heroDescription}>
            We provide high-quality groceries with best prices, fast delivery and 
            trusted products to ensure customer satisfaction. Our goal is to make 
            fresh grocery shopping easier and more affordable for everyone.
          </Text>

          {/* Small Images */}
          <View style={styles.smallImagesContainer}>
            <Image source={{ uri: "https://via.placeholder.com/200x100" }} style={styles.smallImage} />
            <Image source={{ uri: "https://via.placeholder.com/200x100" }} style={styles.smallImage} />
            <Image source={{ uri: "https://via.placeholder.com/200x100" }} style={styles.smallImage} />
          </View>
        </View>
      </View>

      {/* WHAT WE PROVIDE */}
      <View style={{ marginTop: 24 }}>
        <Text style={styles.sectionTitle}>What We Provide?</Text>
        <View style={styles.provideContainer}>
          {whatWeProvide.map((item, i) => (
            <View key={i} style={styles.provideCard}>
              <Text style={styles.provideTitle}>{item.title}</Text>
              <Text style={styles.provideDesc}>{item.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* PARTNER SECTION */}
      <View style={styles.partnerSection}>
        <Image source={{ uri: "https://via.placeholder.com/600x450" }} style={styles.partnerImage} />
        <View style={styles.partnerTextContainer}>
          <Text style={styles.partnerTitle}>Your Partner for e-commerce grocery solution</Text>
          <Text style={styles.partnerDesc}>
            We work with trusted suppliers to deliver the highest quality
            products and best shopping experience. From fresh farm veggies
            to packed foods, we ensure timely delivery with premium service.
          </Text>
        </View>
      </View>

      {/* STATS */}
      <View style={styles.statsContainer}>
        {stats.map((s, i) => (
          <View key={i} style={styles.statCard}>
            <Text style={styles.statNumber}>0+</Text>
            <Text style={styles.statLabel}>{s}</Text>
          </View>
        ))}
      </View>

      {/* TEAM SECTION */}
      <View style={{ marginTop: 24 }}>
        <Text style={styles.sectionTitle}>Meet Our Expert Team</Text>
        <View style={styles.teamContainer}>
          {teamMembers.map((m, i) => (
            <View key={i} style={styles.teamCard}>
              <Image source={{ uri: m.img }} style={styles.teamImage} />
              <Text style={styles.teamName}>{m.name}</Text>
              <Text style={styles.teamRole}>{m.role}</Text>
            </View>
          ))}
        </View>
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6fbfb",
    padding: 16,
  },
  heroContainer: {
    flexDirection: "column",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  heroImage: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    marginBottom: 12,
  },
  heroTextContainer: {},
  heroTitle: { fontSize: 24, fontWeight: "bold", color: "#16464e", marginBottom: 8 },
  heroDescription: { fontSize: 14, color: "#4b5563", lineHeight: 20 },
  smallImagesContainer: { flexDirection: "row", marginTop: 12, justifyContent: "space-between" },
  smallImage: { width: 100, height: 60, borderRadius: 8 },

  sectionTitle: { fontSize: 20, fontWeight: "bold", color: "#16464e", textAlign: "center", marginBottom: 12 },
  provideContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  provideCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    width: "48%",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  provideTitle: { fontWeight: "bold", fontSize: 14, color: "#27b89f" },
  provideDesc: { fontSize: 12, color: "#4b5563", marginTop: 4 },

  partnerSection: { flexDirection: "column", marginTop: 24, alignItems: "center" },
  partnerImage: { width: "100%", height: 200, borderRadius: 16, marginBottom: 12 },
  partnerTextContainer: { alignItems: "center" },
  partnerTitle: { fontSize: 20, fontWeight: "bold", color: "#16464e", marginBottom: 4, textAlign: "center" },
  partnerDesc: { fontSize: 14, color: "#4b5563", textAlign: "center" },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#16464e",
    paddingVertical: 24,
    borderRadius: 16,
    marginTop: 24,
  },
  statCard: { alignItems: "center", flex: 1 },
  statNumber: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  statLabel: { fontSize: 12, color: "rgba(255,255,255,0.8)", textAlign: "center" },

  teamContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginTop: 16 },
  teamCard: { backgroundColor: "#fff", borderRadius: 16, padding: 12, width: "32%", marginBottom: 12, alignItems: "center", shadowColor: "#000", shadowOffset: { width:0, height:2 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 },
  teamImage: { width: "100%", height: 120, borderRadius: 12 },
  teamName: { fontWeight: "bold", fontSize: 14, marginTop: 8 },
  teamRole: { fontSize: 12, color: "#4b5563", marginTop: 2 },
});
