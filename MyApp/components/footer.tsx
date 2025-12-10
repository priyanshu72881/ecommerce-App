import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet } from "react-native";

export default function Footer() {
  const featureIcons = [
    { title: "Best price & offers", text: "Orders $50 or more", icon: require("./icons/i1.png") },
    { title: "Free delivery", text: "24/7 amazing services", icon: require("./icons/i2.png") },
    { title: "Great daily deal", text: "When you sign up", icon: require("./icons/i3.png") },
    { title: "Wide assortment", text: "Mega Discounts", icon: require("./icons/i4.png") },
    { title: "Easy returns", text: "Within 30 days", icon: require("./icons/i5.png") },
  ];

  const footerColumns = [
    { title: "Company", links: ["About Us", "Delivery Info", "Privacy Policy", "Contact Us", "Support"] },
    { title: "Account", links: ["Sign In", "View Cart", "My Wishlist", "Track My Order", "Shipping"] },
    { title: "Corporate", links: ["Become a Vendor", "Affiliate Program", "Farm Business", "Our Suppliers", "Promotions"] },
    { title: "Popular", links: ["Milk & Flavoured", "Butter", "Egg Substitutes", "Sour Cream", "Tea & Kombucha"] },
  ];

  return (
    <ScrollView style={{ backgroundColor: "#f8fafc" }}>
      {/* ----- TOP BANNER ----- */}
      <View style={styles.topBanner}>
        <View style={styles.bannerText}>
          <Text style={styles.bannerTitle}>
            Stay home & get your daily {"\n"}needs from our shop
          </Text>
          <Text style={styles.bannerSubtitle}>
            Start Your Daily Shopping with <Text style={{ fontWeight: "bold" }}>Nest Mart</Text>
          </Text>

          {/* Email Subscribe */}
          <View style={styles.subscribeBox}>
            <TextInput placeholder="Your email address" style={styles.emailInput} />
            <TouchableOpacity style={styles.subscribeBtn}>
              <Text style={styles.subscribeText}>Subscribe</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Banner Image */}
        <Image source={require("./alt.png")} style={styles.bannerImage} resizeMode="contain" />
      </View>

      {/* ------ Feature Icons Row ------ */}
      <View style={styles.featureRow}>
        {featureIcons.map((item, i) => (
          <View key={i} style={styles.featureItem}>
            <Image source={item.icon} style={styles.featureIcon} />
            <Text style={styles.featureTitle}>{item.title}</Text>
            <Text style={styles.featureText}>{item.text}</Text>
          </View>
        ))}
      </View>

      {/* ------ FOOTER MAIN SECTION ------ */}
      <View style={styles.mainFooter}>
        {/* Logo + Info */}
        <View style={styles.footerInfo}>
          <Text style={styles.footerLogo}>Nest</Text>
          <Text style={styles.footerText}>Awesome grocery store template</Text>
          <Text style={styles.footerText}>Address: 5171 W Campbell Ave, Kent, USA</Text>
          <Text style={styles.footerText}>Email: nest@gmail.com</Text>
          <Text style={styles.footerText}>Hours: 10:00 - 18:00</Text>
        </View>

        {/* Footer Columns */}
        {footerColumns.map((col, idx) => (
          <View key={idx} style={styles.footerColumn}>
            <Text style={styles.columnTitle}>{col.title}</Text>
            {col.links.map((link, i) => (
              <Text key={i} style={styles.columnLink}>{link}</Text>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  topBanner: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  bannerText: {
    flex: 1,
    marginRight: 10,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#16a34a",
    marginBottom: 10,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 10,
  },
  subscribeBox: {
    flexDirection: "row",
    marginTop: 10,
  },
  emailInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: "#fff",
  },
  subscribeBtn: {
    backgroundColor: "#16a34a",
    paddingHorizontal: 15,
    justifyContent: "center",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  subscribeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  bannerImage: {
    flex: 1,
    width: 200,
    height: 150,
  },
  featureRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 20,
  },
  featureItem: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  featureIcon: {
    width: 45,
    height: 45,
    marginBottom: 5,
  },
  featureTitle: {
    fontWeight: "bold",
    color: "#16a34a",
  },
  featureText: {
    color: "#6b7280",
    fontSize: 12,
    textAlign: "center",
  },
  mainFooter: {
    borderTopWidth: 1,
    borderColor: "#d1d5db",
    padding: 20,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  footerInfo: {
    width: "48%",
    marginBottom: 15,
  },
  footerLogo: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#16a34a",
    marginBottom: 5,
  },
  footerText: {
    color: "#6b7280",
    fontSize: 12,
  },
  footerColumn: {
    width: "48%",
    marginBottom: 15,
  },
  columnTitle: {
    fontWeight: "bold",
    color: "#16a34a",
    marginBottom: 5,
  },
  columnLink: {
    color: "#6b7280",
    fontSize: 12,
  },
});
