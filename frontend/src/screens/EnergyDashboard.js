import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function EnergyDashboard() {
  const [country, setCountry] = useState("IND");
  const [startYear, setStartYear] = useState("1990");
  const [endYear, setEndYear] = useState("2024");

  const [loading, setLoading] = useState(false);
  const [energyData, setEnergyData] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

  const fetchEnergyData = () => {
  setLoading(true);
  const API = `https://api.ember-energy.org/v1/electricity-generation/yearly?entity_code=${country}&is_aggregate_series=false&start_date=${startYear}&end_date=${endYear}&api_key=f0340e41-9374-1903-7729-07dab1877ded`;
  fetch(API).then((response) => response.json())
  .then((data) => {
  const arr = data.data || [];
  setEnergyData(arr);

  const uniqueYears = [...new Set(arr.map((item) => item.date))].sort();
  setYears(uniqueYears);

  setSelectedYear(null);
  setLoading(false);})
  .catch((error) => {
  console.error("Error fetching energy data:", error);
  setLoading(false)})};

  const filteredData = selectedYear? energyData.filter((item) => item.date === selectedYear): [];

  return (
    <View style={styles.container}>
    <Text style={styles.header}>Global Energy Analyzer</Text>
    <Text style={styles.subtext}>Search by Country & Year Range</Text>

    <TextInput
    style={styles.input}
    placeholder="Enter Country Code (e.g., IND, USA)"
    placeholderTextColor="#666"
    value={country}
    onChangeText={setCountry}/>

    <View style={styles.row}>
    <TextInput
    style={[styles.input, { flex: 1, marginRight: 5 }]}
    placeholder="Start Year"
    keyboardType="numeric"
    value={startYear}
    onChangeText={setStartYear}/>

    <TextInput
    style={[styles.input, { flex: 1, marginLeft: 5 }]}
    placeholder="End Year"
    keyboardType="numeric"
    value={endYear}
    onChangeText={setEndYear}/>
    </View>

      <TouchableOpacity style={styles.fetchBtn} onPress={fetchEnergyData}>
      <Text style={styles.fetchBtnText}>Fetch Energy Data</Text>
      </TouchableOpacity>

      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={{ marginTop: 10 }}>Fetching Data...</Text>
        </View>
      )}

      <FlatList
        data={years}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginVertical: 20 }}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
        <TouchableOpacity
        style={[
        styles.yearButton,
        selectedYear === item && styles.yearButtonActive,]}
        onPress={() => setSelectedYear(item)}>
        <Text
        style={[
        styles.yearText,
        selectedYear === item && styles.yearTextActive,]}>
        {item}
        </Text>
        </TouchableOpacity>
        )}
      />

      {selectedYear && (
      <FlatList
      data={filteredData}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
      <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.series}</Text>
      <Text style={styles.cardValue}>
      {item.generation_twh} TWh ({item.share_of_generation_pct}%)
      </Text>
     </View> )}/>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  subtext: { color: "#555", marginBottom: 15 },

  input: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 10,
    fontSize: 14,
    marginBottom: 10,
  },

  row: { flexDirection: "row", marginBottom: 10 },

  fetchBtn: {
    backgroundColor: "#4A90E2",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  fetchBtnText: { color: "#fff", fontWeight: "bold" },

  loader: {
    marginTop: 20,
    alignItems: "center",
  },

  yearButton: {
    backgroundColor: "#eee",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
  },
  yearButtonActive: { backgroundColor: "#4A90E2" },

  yearText: { fontSize: 14, color: "#333" },
  yearTextActive: { color: "#fff", fontWeight: "bold" },

  card: {
    backgroundColor: "#F4F8FF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: "#4A90E2",
  },
  cardTitle: { fontSize: 16, fontWeight: "bold" },
  cardValue: { marginTop: 5, color: "#444" },
});
