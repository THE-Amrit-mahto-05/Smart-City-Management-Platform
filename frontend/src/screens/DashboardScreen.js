import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

export default function DashboardScreen({ navigation }) {
  const sections = [
    { title: "Air Pollution", route: "AirPollutionDashboard" },
    { title: " Traffic Management", route: "TrafficDashboard" },
    { title: " Energy Monitoring", route: "EnergyDashboard" },
    { title: " Waste Management", route: "WasteDashboard" },
    { title: " Emergency Services", route: "EmergencyDashboard" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Smart City Dashboard</Text>
      <Text style={styles.subtext}>
        Integrates real-time and historical data across multiple systems to enable efficient urban governance.
      </Text>

      {sections.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => navigation.navigate(item.route)}
        >
          <Text style={styles.cardText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: "center" },
  header: { fontSize: 26, fontWeight: "bold", marginBottom: 10 },
  subtext: { textAlign: "center", color: "#666", marginBottom: 20 },
  card: {
    backgroundColor: "#4A90E2",
    padding: 20,
    borderRadius: 12,
    width: "90%",
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  cardText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
