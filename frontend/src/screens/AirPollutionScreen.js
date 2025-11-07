import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { OPENWEATHER_API_KEY } from "@env"; 

export default function AirPollutionScreen() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAirData = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${OPENWEATHER_API_KEY}`
      );
      const geoData = await geoRes.json();
      if (!geoData.length) throw new Error("City not found");

      const { lat, lon, name, country } = geoData[0];
      const airRes = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`
      );
      const airData = await airRes.json();

      if (!airData.list || !airData.list.length)
        throw new Error("No air data available");

      const info = airData.list[0];
      setData({
        ...info,
        city: name,
        country,
        date: new Date(info.dt * 1000),
      });
    } catch (err) {
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const aqiDescriptions = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Air Pollution Dashboard</Text>
      <Text style={styles.subtext}>
        Enter a city name to view real-time air quality.
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter city or Coordinate"
          value={city}
          onChangeText={setCity}
        />
        <TouchableOpacity style={styles.button} onPress={fetchAirData}>
          <Text style={styles.buttonText}>Check</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#4A90E2" />
        </View>
      )}

      {error && <Text style={styles.error}>{error}</Text>}

      {data && (
        <View style={styles.result}>
          <Text style={styles.city}>
            {data.city}, {data.country}
          </Text>
          <Text style={styles.date}>
            {data.date.toLocaleString("en-IN", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>

          <Text style={styles.aqi}>
            AQI: {data.main.aqi} ({aqiDescriptions[data.main.aqi - 1]})
          </Text>

          <View style={styles.card}>
            <Text style={styles.title}>Pollutant Levels (μg/m³)</Text>
            {Object.entries(data.components).map(([key, value]) => (
              <Text key={key} style={styles.item}>
                {key.toUpperCase()}: {value.toFixed(2)}
              </Text>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: "center" },
  header: { fontSize: 26, fontWeight: "bold", marginBottom: 10 },
  subtext: { color: "#666", textAlign: "center", marginBottom: 15 },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 15,
    width: "90%",
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#4A90E2",
    paddingHorizontal: 15,
    justifyContent: "center",
    marginLeft: 8,
    borderRadius: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  center: { marginTop: 20 },
  error: { color: "red", marginTop: 10 },
  result: { alignItems: "center", width: "90%" },
  city: { fontSize: 22, fontWeight: "bold", marginTop: 10 },
  date: { color: "#444", marginBottom: 10 },
  aqi: { fontSize: 18, fontWeight: "bold", color: "#2E8B57", marginVertical: 10 },
  card: {
    backgroundColor: "#f0f4ff",
    borderRadius: 12,
    padding: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  title: { fontWeight: "bold", fontSize: 16, marginBottom: 10 },
  item: { fontSize: 15, marginBottom: 5 },
});
