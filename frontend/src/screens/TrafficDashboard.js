import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import { TOMTOM_API_KEY } from "@env";

export default function TrafficDashboard() {
  const [trafficData, setTrafficData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const fetchTrafficData = async (latitude, longitude) => {
    try {
      setLoading(true);
      const url = `https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json?point=${latitude},${longitude}&unit=KMPH&key=${TOMTOM_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.flowSegmentData) {
        setTrafficData(data.flowSegmentData);
      } else {
        setErrorMsg("Traffic data unavailable for this location.");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Error fetching traffic data");
    } finally {
      setLoading(false);
    }
  };

  const getLocationAndFetch = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      fetchTrafficData(latitude, longitude);
    } catch (err) {
      setErrorMsg("Unable to fetch location");
      console.error(err);
    }
  };

  useEffect(() => {
    getLocationAndFetch();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={styles.infoText}>Fetching live traffic data...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{errorMsg}</Text>
        <TouchableOpacity style={styles.button} onPress={getLocationAndFetch}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!trafficData) {
    return (
      <View style={styles.center}>
        <Text style={styles.infoText}>No traffic data available</Text>
      </View>
    );
  }

  const { currentSpeed, freeFlowSpeed, confidence } = trafficData;
  const congestionLevel =
    currentSpeed < freeFlowSpeed * 0.4
      ? "Heavy Traffic"
      : currentSpeed < freeFlowSpeed * 0.7
      ? "Moderate Traffic"
      : "Light Traffic";

  const color =
    congestionLevel === "Heavy Traffic"
      ? "#E74C3C"
      : congestionLevel === "Moderate Traffic"
      ? "#F39C12"
      : "#27AE60";

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🚦 Traffic Dashboard</Text>
      <View style={[styles.card, { borderColor: color }]}>
        <Text style={[styles.status, { color }]}>{congestionLevel}</Text>
        <Text style={styles.data}>Current Speed: {currentSpeed} km/h</Text>
        <Text style={styles.data}>Free Flow Speed: {freeFlowSpeed} km/h</Text>
        <Text style={styles.data}>
          Confidence: {(confidence * 100).toFixed(0)}%
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={getLocationAndFetch}>
        <Text style={styles.buttonText}>🔄 Refresh</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F7",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    width: "90%",
    padding: 25,
    borderRadius: 15,
    borderWidth: 3,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  status: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  data: {
    fontSize: 18,
    color: "#333",
    marginVertical: 3,
  },
  button: {
    backgroundColor: "#4A90E2",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
  errorText: {
    color: "#E74C3C",
    fontSize: 18,
    marginBottom: 10,
  },
});
