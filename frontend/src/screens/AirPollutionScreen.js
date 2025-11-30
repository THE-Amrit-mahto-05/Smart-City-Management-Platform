import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert, Dimensions } from "react-native";
import { TextInput, Button, Text, ActivityIndicator, Surface, useTheme, ProgressBar, Chip } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { OPENWEATHER_API_KEY, OPENWEATHER_BASE_URL } from "@env";
import CustomHeader from "../components/CustomHeader";
import ChartCard from "../components/ChartCard";

const { width } = Dimensions.get("window");

export default function AirPollutionScreen() {
  const theme = useTheme();
  const [city, setCity] = useState("New Delhi");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAirData = async () => {
    if (!city.trim()) { 
      Alert.alert("Input Error", "Please enter a city name");
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      if (!OPENWEATHER_API_KEY) {
        throw new Error("API Key missing. Please configure .env file.");
      }
      if (!OPENWEATHER_BASE_URL) { // Add check for base URL
        throw new Error("OpenWeather Base URL missing. Please configure .env file.");
      }
      const geoUrl = `${OPENWEATHER_BASE_URL}/geo/1.0/direct?q=${city}&limit=1&appid=${OPENWEATHER_API_KEY}`;
      const geoRes = await fetch(geoUrl);

      if (!geoRes.ok) {
        if (geoRes.status === 401) throw new Error("Invalid API Key");
        throw new Error("Failed to fetch coordinates");
      }

      const geoData = await geoRes.json();
      if (!geoData.length) throw new Error("City not found");

      const { lat, lon, name, country } = geoData[0];

      const airUrl = `${OPENWEATHER_BASE_URL}/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`;
      const airRes = await fetch(airUrl);

      if (!airRes.ok) throw new Error("Failed to fetch air quality data");

      const airData = await airRes.json();
      if (!airData.list || !airData.list.length) throw new Error("No air data available");

      const info = airData.list[0];
      setData({
        ...info,
        city: name,
        country,
        date: new Date(info.dt * 1000),
      });
    } catch (err) {
      console.error(err);
      if (err.message.includes("API Key") || err.message.includes("401")) {
        Alert.alert("API Error", "Using demo data (Check API Key/Env)");
        setData({
          city: city,
          country: "XX",
          date: new Date(),
          main: { aqi: 3 },
          components: { co: 250, no: 0, no2: 15, o3: 60, so2: 10, pm2_5: 45, pm10: 80, nh3: 2 }
        });
      } else {
        setError(err.message || "Failed to fetch data");
      }
    } finally {
      setLoading(false);
    }
  };

  const getAQIInfo = (aqi) => {
    switch (aqi) {
      case 1: return { label: "Good", color: "#4ADE80", desc: "Air quality is satisfactory." };
      case 2: return { label: "Fair", color: "#FACC15", desc: "Air quality is acceptable." };
      case 3: return { label: "Moderate", color: "#FB923C", desc: "Members of sensitive groups may experience health effects." };
      case 4: return { label: "Poor", color: "#F87171", desc: "Everyone may begin to experience health effects." };
      case 5: return { label: "Very Poor", color: "#EF4444", desc: "Health warnings of emergency conditions." };
      default: return { label: "Unknown", color: "#9CA3AF", desc: "No data" };
    }
  };

  const PollutantItem = ({ name, value, max }) => (
    <View style={styles.pollutantRow}>
      <View style={styles.pollutantLabel}>
        <Text style={styles.pollutantName}>{name.toUpperCase()}</Text>
        <Text style={styles.pollutantValue}>{value.toFixed(1)} <Text style={styles.unit}>μg/m³</Text></Text>
      </View>
      <ProgressBar progress={Math.min(value / max, 1)}
        color={theme.colors.primary} style={styles.progress} />
    </View>
  );

  return (
    <View style={[styles.container,
    { backgroundColor: theme.colors.background }]}>
      <CustomHeader title="Air Quality" showBack />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

        <Surface style={[styles.searchCard, { backgroundColor: theme.colors.surface }]} elevation={1}>
          <TextInput
            mode="outlined"
            label="Search City"
            value={city}
            onChangeText={setCity}
            right={<TextInput.Icon icon="magnify" onPress={fetchAirData} />}
            style={styles.input}
            onSubmitEditing={fetchAirData}
          />
        </Surface>

        {loading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={{ marginTop: 10, color: theme.colors.secondary }}>Analyzing Atmosphere...</Text>
          </View>
        )}

        {error && (
          <Surface style={[styles.errorBox, { backgroundColor: theme.colors.errorContainer }]}>
            <Text style={{ color: theme.colors.error }}>{error}</Text>
          </Surface>
        )}

        {data && !loading && (
          <>
            <Surface style={[styles.aqiCard, { backgroundColor: getAQIInfo(data.main.aqi).color }]} elevation={4}>
              <View style={styles.aqiHeader}>
                <Text style={styles.cityText}>{data.city}, {data.country}</Text>
                <Chip icon="clock-outline" style={styles.timeChip}>{data.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Chip>
              </View>

              <View style={styles.aqiBody}>
                <Text style={styles.aqiValue}>{data.main.aqi}</Text>
                <View>
                  <Text style={styles.aqiLabel}>AQI Index</Text>
                  <Text style={styles.aqiStatus}>{getAQIInfo(data.main.aqi).label}</Text>
                </View>
              </View>
              <Text style={styles.aqiDesc}>{getAQIInfo(data.main.aqi).desc}</Text>
            </Surface>
            <ChartCard title="Pollutant Breakdown">
              <View style={styles.pollutantsContainer}>
                <PollutantItem name="PM2.5" value={data.components.pm2_5} max={100} />
                <PollutantItem name="PM10" value={data.components.pm10} max={200} />
                <PollutantItem name="NO2" value={data.components.no2} max={200} />
                <PollutantItem name="O3" value={data.components.o3} max={180} />
                <PollutantItem name="SO2" value={data.components.so2} max={350} />
                <PollutantItem name="CO" value={data.components.co} max={10000} />
              </View>
            </ChartCard>

            <Surface style={[styles.adviceCard, { backgroundColor: theme.colors.surface }]} elevation={1}>
              <View style={styles.adviceHeader}>
                <MaterialCommunityIcons name="heart-pulse" size={24} color={theme.colors.error} />
                <Text style={[styles.adviceTitle, { color: theme.colors.text }]}>Health Advice</Text>
              </View>
              <Text style={[styles.adviceText, { color: theme.colors.text }]}>
                {data.main.aqi > 3
                  ? "Avoid outdoor activities. Wear a mask if necessary."
                  : "Air quality is good. Enjoy your outdoor activities!"}
              </Text>
            </Surface>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    padding: 16,
    paddingBottom: 40
  },

  searchCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16
  },
  input: {
    backgroundColor: "transparent"
  },

  loader: {
    padding: 40,
    alignItems: "center"
  },
  errorBox: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16
  },

  aqiCard: {
    padding: 20, borderRadius: 20,
    marginBottom: 16
  },
  aqiHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  cityText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff"
  },
  timeChip: { backgroundColor: "rgba(255,255,255,0.2)" },

  aqiBody: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  aqiValue: { fontSize: 64, fontWeight: "bold", color: "#fff", marginRight: 20 },
  aqiLabel: { fontSize: 14, color: "rgba(255,255,255,0.8)" },
  aqiStatus: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  aqiDesc: { color: "rgba(255,255,255,0.9)", fontSize: 14 },

  pollutantsContainer: { width: "100%", paddingHorizontal: 10 },
  pollutantRow: { marginBottom: 16 },
  pollutantLabel: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  pollutantName: { fontWeight: "bold", fontSize: 14, color: "#555" },
  pollutantValue: { fontWeight: "bold", fontSize: 14 },
  unit: { fontSize: 10, color: "#888", fontWeight: "normal" },
  progress: { height: 8, borderRadius: 4 },

  adviceCard: { padding: 16, borderRadius: 16 },
  adviceHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  adviceTitle: { fontSize: 18, fontWeight: "bold", marginLeft: 8 },
  adviceText: { fontSize: 14, lineHeight: 20 },
});
