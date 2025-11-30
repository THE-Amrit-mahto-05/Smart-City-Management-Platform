import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Alert } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import * as Location from "expo-location";
import { Surface, Text, ActivityIndicator, FAB, useTheme, Chip } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomHeader from "../components/CustomHeader";

const { width } = Dimensions.get("window");

const MOCK_INCIDENTS = [
  { id: 1, type: "accident", latOffset: 0.002, lngOffset: 0.001, title: "Minor Accident", desc: "2 lanes blocked" },
  { id: 2, type: "construction", latOffset: -0.003, lngOffset: -0.002, title: "Road Work", desc: "Delays expected" },
  { id: 3, type: "congestion", latOffset: 0.001, lngOffset: -0.003, title: "Heavy Traffic", desc: "Avg speed 10km/h" },
];

export default function TrafficDashboard() {
  const theme = useTheme();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accuracy, setAccuracy] = useState(null);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission denied", "Defaulting to city center.");
          setLocation({ latitude: 28.6139, longitude: 77.2090, speed: 0 });
          setLoading(false);
          return;
        }
        const locationPromise = Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,});

        const timeoutPromise = new Promise((resolve, reject) =>
          setTimeout(() => reject(new Error("Location request timed out")), 10000)
        );

        const current = await Promise.race([locationPromise, timeoutPromise]);

        setLocation(current.coords);
        setAccuracy(current.coords.accuracy);
        setLoading(false);

        const newIncidents = MOCK_INCIDENTS.map(inc => ({
          ...inc,
          latitude: current.coords.latitude + inc.latOffset,
          longitude: current.coords.longitude + inc.lngOffset,
        }));
        setIncidents(newIncidents);

      } catch (err) {
        console.error("Location error:", err);
        Alert.alert("Location Error", "Using default location due to error.")
        setLocation({ latitude: 28.6139, longitude: 77.2090, speed: 0 });
        setLoading(false);
      }
    })();
  }, []);

  if (loading || !location) {
    return (
    <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
    <ActivityIndicator size="large" color={theme.colors.primary} />
    <Text style={[styles.loadingText, { color: theme.colors.text }]}>Locating Traffic Data...</Text>
    </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader title="Traffic Control" showBack />

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          followsUserLocation={true}
          showsTraffic={true}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
          }}
        >
          {incidents.map((inc) => (
            <Marker
              key={inc.id}
              coordinate={{ latitude: inc.latitude, longitude: inc.longitude }}
              title={inc.title}
              description={inc.desc}
            >
              <View style={[styles.markerContainer, { backgroundColor: inc.type === 'accident' ? theme.colors.error : theme.colors.tertiary }]}>
                <MaterialCommunityIcons
                  name={inc.type === 'accident' ? 'car-brake-alert' : inc.type === 'construction' ? 'cone' : 'traffic-light'}
                  size={20}
                  color="#fff"
                />
              </View>
            </Marker>
          ))}

          <Circle
            center={{ latitude: location.latitude, longitude: location.longitude }}
            radius={500}
            fillColor="rgba(37, 99, 235, 0.1)"
            strokeColor="rgba(37, 99, 235, 0.3)"
          />
        </MapView>
        <Surface style={[styles.infoCard, { backgroundColor: theme.colors.surface }]} elevation={4}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Signal Optimization</Text>
            <Chip icon="check-circle" mode="outlined" style={{ borderColor: theme.colors.primary }}>Active</Chip>
          </View>

          <Surface style={[styles.card, { backgroundColor: theme.colors.surface }]} elevation={2}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Green Wave Efficiency</Text>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.colors.primary }}>94%</Text>
            </View>
            <Text style={{ color: theme.colors.placeholder, marginBottom: 10 }}>
              AI-driven signal timing is currently saving an estimated 15 minutes of travel time per vehicle in the city center.
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <View style={{ alignItems: 'center' }}>
                <MaterialCommunityIcons name="timer-outline" size={30} color="#4ADE80" />
                <Text style={{ fontSize: 12, marginTop: 4 }}>-12% Wait</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <MaterialCommunityIcons name="car-speed-limiter" size={30} color="#60A5FA" />
                <Text style={{ fontSize: 12, marginTop: 4 }}>+8% Flow</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <MaterialCommunityIcons name="leaf" size={30} color="#F472B6" />
                <Text style={{ fontSize: 12, marginTop: 4 }}>-5% CO2</Text>
              </View>
            </View>
          </Surface>

          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Live Incidents</Text>
            <Chip icon="radio-tower" mode="outlined">Live Feed</Chip>
          </View>
          <View style={styles.infoRow}>
            <View>
              <Text style={[styles.infoLabel, { color: theme.colors.placeholder }]}>Current Speed</Text>
              <Text style={[styles.infoValue, { color: theme.colors.primary }]}>
                {location.speed ? (location.speed * 3.6).toFixed(1) : "0"} <Text style={styles.unit}>km/h</Text>
              </Text>
            </View>
            <View style={styles.divider} />
            <View>
              <Text style={[styles.infoLabel, { color: theme.colors.placeholder }]}>Accuracy</Text>
              <Text style={[styles.infoValue, { color: theme.colors.secondary }]}>
                {accuracy ? accuracy.toFixed(0) : "--"} <Text style={styles.unit}>m</Text>
              </Text>
            </View>
          </View>

          <View style={styles.chipRow}>
            <Chip icon="alert" style={styles.chip} textStyle={{ fontSize: 12 }}>3 Incidents Nearby</Chip>
            <Chip icon="clock-outline" style={styles.chip} textStyle={{ fontSize: 12 }}>+5m Delay</Chip>
          </View>
        </Surface>

        <FAB
          icon="navigation"
          label="Navigate"
          style={[styles.fab, { backgroundColor: theme.colors.primary }]}
          color="#fff"
          onPress={() => Alert.alert("Navigation", "Starting optimized route...")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 16, fontSize: 16 },

  mapContainer: { flex: 1, position: "relative" },
  map: { flex: 1 },

  markerContainer: {
    padding: 6,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#fff",
    elevation: 4,
  },

  infoCard: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    borderRadius: 16,
    padding: 16,
  },
  infoRow: { flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginBottom: 12 },
  divider: { width: 1, height: 40, backgroundColor: "#eee" },
  infoLabel: { fontSize: 12, marginBottom: 4 },
  infoValue: { fontSize: 24, fontWeight: "bold" },
  unit: { fontSize: 14, fontWeight: "normal", color: "#888" },

  chipRow: { flexDirection: "row", justifyContent: "center" },
  chip: { marginHorizontal: 4, backgroundColor: "rgba(0,0,0,0.05)" },

  fab: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 0,
  },
});
