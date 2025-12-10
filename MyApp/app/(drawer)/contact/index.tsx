import React from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from "react-native";

export default function Contact() {
  return (
    <ScrollView style={styles.container}>
      
      {/* Top Section */}
      <View style={styles.section}>
        <Text style={[styles.greenText, styles.mb2]}>How can help you ?</Text>

        <Text style={styles.heading}>
          Let us know how {"\n"} we can help you
        </Text>

        <Text style={styles.desc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
          luctus nec ullamcorper mattis, pulvinar dapibus leo.
        </Text>

        {/* 2 Column Grid */}
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.title}>01. Visit Feedback</Text>
            <Text style={styles.descSmall}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
              luctus nec ullamcorper mattis.
            </Text>

            <Text style={styles.title}>03. Billing Inquiries</Text>
            <Text style={styles.descSmall}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
              luctus nec ullamcorper mattis.
            </Text>
          </View>

          <View style={styles.col}>
            <Text style={styles.title}>02. Employer Services</Text>
            <Text style={styles.descSmall}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
              luctus nec ullamcorper mattis.
            </Text>

            <Text style={styles.title}>04. General Inquiries</Text>
            <Text style={styles.descSmall}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
              luctus nec ullamcorper mattis.
            </Text>
          </View>
        </View>
      </View>

      {/* Office Blocks */}
      <View style={styles.section}>
        <View style={styles.officeRow}>
          {["Office", "Studio", "Shop"].map((title, i) => (
            <View key={i} style={styles.officeCard}>
              <Text style={styles.officeTitle}>{title}</Text>
              <Text style={styles.officeText}>205 North Michigan Avenue, Suite 810</Text>
              <Text style={styles.officeText}>Chicago, 60601, USA</Text>
              <Text style={[styles.officeText, { marginTop: 6 }]}>Phone: 123-456-7890</Text>

              <TouchableOpacity style={styles.mapBtn}>
                <Text style={{ color: "#fff", fontSize: 12 }}>View map</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {/* Contact Form */}
      <View style={styles.formSection}>
        <Text style={styles.greenText}>Contact form</Text>
        <Text style={styles.formHeading}>Drop Us a Line</Text>
        <Text style={styles.descSmall}>
          Your email address will not be published. Required fields are marked *
        </Text>

        <View style={styles.form}>
          <View style={styles.row}>
            <TextInput placeholder="First Name" style={styles.inputHalf} />
            <TextInput placeholder="Your Email" style={styles.inputHalf} />
          </View>

          <TextInput placeholder="Your Phone" style={styles.input} />
          <TextInput placeholder="Subject" style={styles.input} />
          <TextInput
            placeholder="Message"
            style={[styles.input, { height: 120 }]}
            multiline
          />

          <TouchableOpacity style={styles.submitBtn}>
            <Text style={styles.submitText}>Send message</Text>
          </TouchableOpacity>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },

  section: { padding: 20 },

  heading: { fontSize: 28, fontWeight: "bold", color: "#000", marginTop: 5 },

  formHeading: { fontSize: 26, fontWeight: "bold", color: "#000", marginTop: 2 },

  desc: { color: "#6b7280", marginTop: 10 },

  descSmall: { color: "#6b7280", fontSize: 13, marginTop: 4 },

  greenText: { color: "#16a34a", fontWeight: "600" },

  mb2: { marginBottom: 5 },

  row: { flexDirection: "row", justifyContent: "space-between", gap: 20, marginTop: 20 },

  col: { flex: 1 },

  title: { fontWeight: "bold", color: "#000", marginTop: 15 },

  // Offices
  officeRow: { flexDirection: "row", justifyContent: "space-between", gap: 20 },

  officeCard: { flex: 1, padding: 10 },

  officeTitle: { fontSize: 18, fontWeight: "bold", color: "#000" },

  officeText: { color: "#525252", fontSize: 13, marginTop: 4 },

  mapBtn: {
    marginTop: 10,
    backgroundColor: "#16a34a",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
  },

  // Form
  formSection: { padding: 20 },
  form: { marginTop: 20 },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    color: "#000",
  },

  inputHalf: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
    color: "#000",
  },

  submitBtn: {
    backgroundColor: "#16a34a",
    padding: 15,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
  },

  submitText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
