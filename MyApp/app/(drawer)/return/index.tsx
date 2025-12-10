import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

export default function ReturnOrdersPage() {
  const [returns, setReturns] = useState([
    { id: 1, product: "Blue Shirt", reason: "Size issue – product was larger than expected", date: "2025-01-15", amount: 999, status: "Pending", user: "Rohit Sharma" },
    { id: 2, product: "Smart Watch", reason: "Battery draining quickly, not lasting full day", date: "2025-01-18", amount: 2499, status: "Pending", user: "Aman Kumar" },
    { id: 3, product: "Denim Jeans", reason: "Colour is slightly different from images shown", date: "2025-01-19", amount: 1399, status: "Pending", user: "Priyanshu" },
    { id: 4, product: "Sports Shoes", reason: "Sole is slightly hard and uncomfortable", date: "2025-01-20", amount: 2999, status: "Pending", user: "Kunal Verma" },
    { id: 5, product: "Wireless Earbuds", reason: "Right side earbud not connecting properly", date: "2025-01-21", amount: 1599, status: "Pending", user: "Harshit Gupta" },
    { id: 6, product: "Winter Jacket", reason: "Material feels thin, not very warm", date: "2025-01-22", amount: 3499, status: "Pending", user: "Ravi Singh" },
  ]);

  const updateStatus = (id: number, newStatus: string) => {
    setReturns((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Approved":
        return styles.approved;
      case "Rejected":
        return styles.rejected;
      default:
        return styles.pending;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Return Requests</Text>

      {returns.map((item) => (
        <View key={item.id} style={styles.card}>
          <View style={styles.row}>
            {/* Left side details */}
            <View style={{ flex: 1 }}>
              <Text style={styles.product}>{item.product}</Text>

              <Text style={styles.label}>
                Customer: <Text style={styles.value}>{item.user}</Text>
              </Text>

              <Text style={styles.label}>
                Reason: <Text style={styles.value}>{item.reason}</Text>
              </Text>

              <Text style={styles.label}>
                Request Date: <Text style={styles.value}>{item.date}</Text>
              </Text>

              <Text style={styles.amount}>Refund: ₹{item.amount}</Text>

              {/* Status Badge */}
              <View style={[styles.badge, getStatusStyle(item.status)]}>
                <Text style={styles.badgeText}>{item.status}</Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => updateStatus(item.id, "Approved")}
                style={[styles.button, styles.approveBtn]}
              >
                <Text style={styles.buttonText}>Approve</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => updateStatus(item.id, "Rejected")}
                style={[styles.button, styles.rejectBtn]}
              >
                <Text style={styles.buttonText}>Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F3F4F6",
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    color: "#2563EB",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  product: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
  },
  label: {
    color: "#4B5563",
    marginTop: 4,
  },
  value: {
    color: "#2563EB",
    fontWeight: "600",
  },
  amount: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  badge: {
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
  },

  pending: {
    backgroundColor: "#FEF3C7",
  },
  approved: {
    backgroundColor: "#D1FAE5",
  },
  rejected: {
    backgroundColor: "#FECACA",
  },

  buttonContainer: {
    justifyContent: "space-between",
    marginLeft: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  approveBtn: {
    backgroundColor: "#10B981",
  },
  rejectBtn: {
    backgroundColor: "#EF4444",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "700",
  },
});
