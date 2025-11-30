import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Alert, TouchableOpacity, Animated } from "react-native";
import { Text, Button, Surface, useTheme, Avatar, Chip, IconButton, FAB } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomHeader from "../components/CustomHeader";

const MOCK_ALERTS = [
  { id: 1, type: "Fire", title: "Building Fire", location: "Sector 4, Main Market", priority: "High", time: "2m ago" },
  { id: 2, type: "Medical", title: "Cardiac Arrest", location: "Green Park, Block B", priority: "Critical", time: "5m ago" },
  { id: 3, type: "Police", title: "Public Disturbance", location: "City Center Mall", priority: "Medium", time: "12m ago" },
];

export default function EmergencyDashboard() {
  const theme = useTheme();
  const [alerts, setAlerts] = useState(MOCK_ALERTS);
  const [sosActive, setSosActive] = useState(false);
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    if (sosActive) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.2, duration: 500, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [sosActive]);

  const handleSOS = () => {
    if (sosActive) {
      setSosActive(false);
      Alert.alert("SOS Cancelled", "Emergency services have been notified of the cancellation.");
    } else {
      Alert.alert(
        "Confirm SOS",
        "Are you sure you want to send an emergency distress signal?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "SEND SOS",
            style: "destructive",
            onPress: () => {
              setSosActive(true);
              Alert.alert("SOS SENT", "Emergency units are being dispatched to your location.");
            }
          }
        ]
      );
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "Fire": return "fire-truck";
      case "Medical": return "ambulance";
      case "Police": return "police-badge";
      default: return "alert";
    }
  };

  const getColor = (priority) => {
    switch (priority) {
      case "Critical": return "#D0021B";
      case "High": return "#F5A623";
      default: return "#4A90E2";
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <CustomHeader title="Emergency Response" showBack />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* SOS Section */}
        <View style={styles.sosContainer}>
          <TouchableOpacity onPress={handleSOS} activeOpacity={0.8}>
            <Animated.View style={[
              styles.sosButton,
              {
                backgroundColor: sosActive ? theme.colors.error : theme.colors.errorContainer,
                transform: [{ scale: pulseAnim }],
                shadowColor: theme.colors.error,
              }
            ]}>
              <MaterialCommunityIcons name="alert-octagon" size={64} color="#fff" />
              <Text style={styles.sosText}>{sosActive ? "SOS ACTIVE" : "PRESS FOR SOS"}</Text>
            </Animated.View>
          </TouchableOpacity>
          <Text style={styles.sosSubtext}>
            {sosActive ? "Tracking Location... Units En Route" : "Only use in case of extreme emergency"}
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Button mode="contained-tonal" icon="phone" style={styles.actionBtn} onPress={() => Alert.alert("Calling Police...")}>Police</Button>
          <Button mode="contained-tonal" icon="ambulance" style={styles.actionBtn} onPress={() => Alert.alert("Calling Ambulance...")}>Ambulance</Button>
          <Button mode="contained-tonal" icon="fire" style={styles.actionBtn} onPress={() => Alert.alert("Calling Fire Dept...")}>Fire</Button>
        </View>

        {/* Live Incidents Feed */}
        <View style={styles.feedHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Live Incidents</Text>
          <Chip icon="radio-tower" mode="outlined">Live Feed</Chip>
        </View>

        {alerts.map((alert) => (
          <Surface key={alert.id} style={[styles.alertCard, { backgroundColor: theme.colors.surface }]} elevation={2}>
            <View style={styles.alertHeader}>
              <View style={styles.alertIconBox}>
                <Avatar.Icon size={40} icon={getIcon(alert.type)} style={{ backgroundColor: getColor(alert.priority) }} />
              </View>
              <View style={styles.alertInfo}>
                <Text style={styles.alertTitle}>{alert.title}</Text>
                <Text style={styles.alertLoc}>{alert.location}</Text>
              </View>
              <View style={styles.alertMeta}>
                <Text style={[styles.priorityText, { color: getColor(alert.priority) }]}>{alert.priority}</Text>
                <Text style={styles.timeText}>{alert.time}</Text>
              </View>
            </View>
            <View style={styles.alertActions}>
              <Button mode="contained" compact style={{ flex: 1, marginRight: 8, backgroundColor: theme.colors.primary }}>Dispatch</Button>
              <Button mode="outlined" compact style={{ flex: 1 }}>Details</Button>
            </View>
          </Surface>
        ))}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 40 },

  sosContainer: { alignItems: "center", marginVertical: 20 },
  sosButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    borderWidth: 4,
    borderColor: "#fff",
  },
  sosText: { color: "#fff", fontSize: 20, fontWeight: "bold", marginTop: 10 },
  sosSubtext: { marginTop: 16, color: "#666", fontSize: 14 },

  quickActions: { flexDirection: "row", justifyContent: "space-between", marginBottom: 24 },
  actionBtn: { flex: 1, marginHorizontal: 4 },

  feedHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  sectionTitle: { fontSize: 20, fontWeight: "bold" },

  alertCard: { padding: 16, borderRadius: 16, marginBottom: 12 },
  alertHeader: { flexDirection: "row", marginBottom: 12 },
  alertIconBox: { marginRight: 12 },
  alertInfo: { flex: 1 },
  alertTitle: { fontSize: 16, fontWeight: "bold" },
  alertLoc: { fontSize: 14, color: "#666", marginTop: 2 },
  alertMeta: { alignItems: "flex-end" },
  priorityText: { fontWeight: "bold", fontSize: 12, marginBottom: 4 },
  timeText: { fontSize: 12, color: "#999" },

  alertActions: { flexDirection: "row" },
});
