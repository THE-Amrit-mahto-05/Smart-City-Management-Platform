import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DashboardScreen({ navigation }) {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("token");
      setUserEmail(token ? "Welcome back! Token saved " : "No token found ");
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Smart City Dashboard</Text>
      <Text style={styles.text}>{userEmail}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: 
  { flex: 1, 
    justifyContent: "center", 
    alignItems: "center" },
  title: { fontSize: 24,
     fontWeight: "bold", 
     marginBottom: 10 },
  text: { marginBottom: 20 },
});
