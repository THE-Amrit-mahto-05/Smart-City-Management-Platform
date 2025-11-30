import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { useTheme, Surface } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import CustomHeader from "../components/CustomHeader";

const { width } = Dimensions.get("window");

export default function DashboardScreen({ navigation }) {
  const theme = useTheme();

  const sections = [
    {
      title: "Air Quality",
      subtitle: "AQI & Sensors",
      route: "AirPollutionDashboard",
      icon: "weather-windy",
      color: ["#4ADE80", "#22C55E"]
    },
    {
      title: "Traffic",
      subtitle: "Live Congestion",
      route: "TrafficDashboard",
      icon: "traffic-light",
      color: ["#F87171", "#EF4444"]
    },
    {
      title: "Energy",
      subtitle: "Grid & Usage",
      route: "EnergyDashboard",
      icon: "lightning-bolt",
      color: ["#60A5FA", "#3B82F6"]
    },
    {
      title: "Waste",
      subtitle: "Smart Bins",
      route: "WasteDashboard",
      icon: "trash-can",
      color: ["#A78BFA", "#8B5CF6"]
    },
    {
      title: "Emergency",
      subtitle: "Alerts & SOS",
      route: "EmergencyDashboard",
      icon: "alert-circle",
      color: ["#FBBF24", "#F59E0B"]
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <CustomHeader title="City Overview" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeSection}>
          <Text style={[styles.welcomeTitle, { color: theme.colors.text }]}>Hello, Admin</Text>
          <Text style={[styles.welcomeSubtitle, { color: theme.colors.placeholder }]}>
            Here is what's happening in your city today.
          </Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsScroll}>
          <Surface style={[styles.statCard, { backgroundColor: theme.colors.surface }]}>
            <MaterialCommunityIcons name="thermometer" size={24} color={theme.colors.primary} />
            <Text style={styles.statValue}>24°C</Text>
            <Text style={styles.statLabel}>Avg Temp</Text>
          </Surface>
          <Surface style={[styles.statCard, { backgroundColor: theme.colors.surface }]}>
            <MaterialCommunityIcons name="water-percent" size={24} color={theme.colors.primary} />
            <Text style={styles.statValue}>65%</Text>
            <Text style={styles.statLabel}>Humidity</Text>
          </Surface>
          <Surface style={[styles.statCard, { backgroundColor: theme.colors.surface }]}>
            <MaterialCommunityIcons name="account-group" size={24} color={theme.colors.primary} />
            <Text style={styles.statValue}>1.2M</Text>
            <Text style={styles.statLabel}>Population</Text>
          </Surface>
        </ScrollView>
        <View style={styles.gridContainer}>
          {sections.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.9}
              onPress={() => navigation.navigate(item.route)}
              style={styles.gridItemWrapper}
            >
              <LinearGradient
                colors={item.color}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gridItem}
              >
                <MaterialCommunityIcons name={item.icon} size={32} color="#fff" />
                <View style={styles.textContainer}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                </View>
                <MaterialCommunityIcons name="arrow-right-circle" size={24} color="rgba(255,255,255,0.6)" style={styles.arrowIcon} />
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 40 },
  welcomeSection: { padding: 20 },
  welcomeTitle: { fontSize: 28, fontWeight: "bold" },
  welcomeSubtitle: { fontSize: 16, marginTop: 5 },

  statsScroll: { paddingHorizontal: 20, marginBottom: 20 },
  statCard: {
    padding: 15,
    borderRadius: 16,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    elevation: 2,
  },
  statValue: { fontSize: 18, fontWeight: "bold", marginTop: 5 },
  statLabel: { fontSize: 12, color: "#666" },

  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  gridItemWrapper: {
    width: (width - 50) / 2,
    marginBottom: 15,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  gridItem: {
    padding: 20,
    borderRadius: 20,
    height: 160,
    justifyContent: "space-between",
  },
  textContainer: { marginTop: 10 },
  cardTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  cardSubtitle: { color: "rgba(255,255,255,0.8)", fontSize: 12 },
  arrowIcon: { position: "absolute", top: 15, right: 15 },
});
