import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Alert, TouchableOpacity, Animated, Linking } from "react-native";
import { Text, Button, Surface, useTheme, Avatar, Chip, ActivityIndicator, IconButton } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { TOMTOM_API_KEY, OPENWEATHER_API_KEY, TOMTOM_BASE_URL, OPENWEATHER_BASE_URL } from "@env";
import CustomHeader from "../components/CustomHeader";

export default function EmergencyDashboard({ navigation }) {
  const theme = useTheme();
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState("Locating...");
  const [loading, setLoading] = useState(true);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [weatherAlerts, setWeatherAlerts] = useState([]);
  const [sosActive, setSosActive] = useState(false);
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission denied", "Location is required for emergency services.");
          setLoading(false);
          return;
        }

        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc.coords);

        let reverseGeocode = await Location.reverseGeocodeAsync({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });

        if (reverseGeocode.length > 0) {
          setCity(`${reverseGeocode[0].city}, ${reverseGeocode[0].region}`);
        }

        await fetchNearbyServices(loc.coords.latitude, loc.coords.longitude);
        await fetchWeatherAlerts(loc.coords.latitude, loc.coords.longitude);
      } catch (error) {
        console.error("Error fetching emergency data:", error);
        Alert.alert("Error", "Failed to fetch location-based data.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const fetchNearbyServices = async (lat, lon) => {
    try {
      const query = "hospital police";
      const url = `${TOMTOM_BASE_URL}/${query}.json?lat=${lat}&lon=${lon}&radius=5000&key=${TOMTOM_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.results) {
        const places = data.results.map((place, index) => ({
          id: index.toString(),
          type: place.poi.categories.includes("hospital") ? "Medical" : "Police",
          title: place.poi.name,
          location: place.address.freeformAddress,
          distance: `${(place.dist / 1000).toFixed(1)} km`,
          phone: place.poi.phone || "N/A",
        }));
        setNearbyPlaces(places.slice(0, 5)); 
      }
    } catch (error) {
      console.error("TomTom API Error:", error);
    }
  };

  const fetchWeatherAlerts = async (lat, lon) => {
    try {
      const url = `${OPENWEATHER_BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      const alerts = [];
      if (data.weather && data.weather[0].main === "Thunderstorm") {
        alerts.push({ id: 'w1', type: 'Weather', title: 'Thunderstorm Warning', location: data.name, priority: 'High', time: 'Now' });
      } else if (data.weather && data.weather[0].main === "Rain") {
        alerts.push({ id: 'w2', type: 'Weather', title: 'Heavy Rain Alert', location: data.name, priority: 'Medium', time: 'Now' });
      }

      setWeatherAlerts(alerts);

    } catch (error) {
      console.error("Weather API Error:", error);
    }
  };

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
        `Send distress signal from ${city}?`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "SEND SOS",
            style: "destructive",
            onPress: () => {
              setSosActive(true);
              Alert.alert("SOS SENT", `Units dispatched to ${city}.`);
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
      case "Weather": return "weather-lightning-rainy";
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
            {sosActive ? `Tracking: ${city}` : "Only use in case of extreme emergency"}
          </Text>
        </View>
        <View style={styles.quickActions}>
          <Button mode="contained-tonal" icon="phone" style={styles.actionBtn} onPress={() => Linking.openURL('tel:100')}>Police</Button>
          <Button mode="contained-tonal" icon="ambulance" style={styles.actionBtn} onPress={() => Linking.openURL('tel:102')}>Ambulance</Button>
          <Button mode="contained-tonal" icon="fire" style={styles.actionBtn} onPress={() => Linking.openURL('tel:101')}>Fire</Button>
        </View>
        <View style={styles.feedHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Nearby Help ({city})</Text>
          {loading && <ActivityIndicator size="small" />}
        </View>

        {nearbyPlaces.length === 0 && !loading && (
          <Text style={{ color: theme.colors.placeholder, marginBottom: 10 }}>No nearby services found.</Text>
        )}

        {nearbyPlaces.map((place) => (
          <Surface key={place.id} style={[styles.alertCard, { backgroundColor: theme.colors.surface }]} elevation={1}>
            <View style={styles.alertHeader}>
              <View style={styles.alertIconBox}>
                <Avatar.Icon size={40} icon={getIcon(place.type)} style={{ backgroundColor: theme.colors.primaryContainer }} color={theme.colors.primary} />
              </View>
              <View style={styles.alertInfo}>
                <Text style={styles.alertTitle}>{place.title}</Text>
                <Text style={styles.alertLoc}>{place.location}</Text>
                <Text style={styles.timeText}>{place.distance} away</Text>
              </View>
              <IconButton icon="phone" onPress={() => place.phone !== "N/A" && Linking.openURL(`tel:${place.phone}`)} />
            </View>
          </Surface>
        ))}
        <View style={styles.feedHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Alerts</Text>
          <Chip icon="radio-tower" mode="outlined">Live</Chip>
        </View>

        {weatherAlerts.length === 0 && (
          <Surface style={[styles.alertCard, { backgroundColor: theme.colors.surface }]} elevation={1}>
            <View style={{ padding: 10, alignItems: 'center' }}>
              <Text style={{ color: theme.colors.placeholder }}>No active weather alerts in {city}.</Text>
            </View>
          </Surface>
        )}

        {weatherAlerts.map((alert) => (
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
  sosText: { 
    color: "#fff", 
    fontSize: 20, 
    fontWeight: "bold", 
    marginTop: 10 },
  sosSubtext: { 
    marginTop: 16, 
    color: "#666", 
    fontSize: 14 },

  quickActions: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginBottom: 24 },
  actionBtn: { 
    flex: 1, 
    marginHorizontal: 4 },

  feedHeader: { 
    flexDirection: "row", 
    justifyContent: "space-between",
    alignItems: "center", 
    marginBottom: 16 },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: "bold" },

  alertCard: { 
    padding: 16, 
    borderRadius: 16, 
    marginBottom: 12 },
  alertHeader: { 
    flexDirection: "row", 
    marginBottom: 12 },
  alertIconBox: { marginRight: 12 },
  alertInfo: { flex: 1 },
  alertTitle: { fontSize: 16, fontWeight: "bold" },
  alertLoc: { fontSize: 14, color: "#666", marginTop: 2 },
  alertMeta: { alignItems: "flex-end" },
  priorityText: { fontWeight: "bold", fontSize: 12, marginBottom: 4 },
  timeText: { fontSize: 12, color: "#999" },

  alertActions: { flexDirection: "row" },
});
