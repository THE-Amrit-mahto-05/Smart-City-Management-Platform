import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function TrafficDashboard() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accuracy, setAccuracy] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission denied", "Please enable location permissions.");
          setLoading(false);
          return;
        }
        const isServiceEnabled = await Location.hasServicesEnabledAsync();
        if (!isServiceEnabled) {
          Alert.alert(
            "GPS Disabled",
            "Please enable GPS/location services for better accuracy."
          );
          setLoading(false);
          return;
        }
        const current = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation,
          maximumAge: 0,
          timeout: 10000,
        });

        setLocation(current.coords);
        setAccuracy(current.coords.accuracy);
        setLoading(false);
        await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.BestForNavigation,
            timeInterval: 2000,
            distanceInterval: 1, 
            mayShowUserSettingsDialog: true, 
          },
          (loc) => {
            setLocation(loc.coords);
            setAccuracy(loc.coords.accuracy);
            console.log("📍 Accurate Location:", loc.coords);
          }
        );
      } catch (err) {
        console.error("Location error:", err);
        Alert.alert("Error fetching location", err.message);
        setLoading(false);
      }
    })();
  }, []);
  if (loading || !location) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196f3" />
        <Text style={styles.loadingText}>Fetching precise GPS location...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        followsUserLocation={true}
        showsTraffic={true} 
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="Your Exact Location"
          description="Live GPS position (accurate)"
        />
      </MapView>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
            Latitude: {location.latitude.toFixed(6)}{"\n"}
            Longitude: {location.longitude.toFixed(6)}{"\n"}
            Accuracy: {accuracy ? accuracy.toFixed(2) : "N/A"} m{"\n"}
            Speed: {location.speed ? location.speed.toFixed(2) : 0} m/s
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  infoBox: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 15,
    borderRadius: 10,
  },
  infoText: {
    color: "#fff",
    textAlign: "center",
  },
});
