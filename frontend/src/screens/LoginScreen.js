import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Text, TextInput, Button, Surface, useTheme, HelperText } from "react-native-paper";
import { login } from "../api/authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function LoginScreen({ navigation }) {
  const theme = useTheme();
  const [form, setForm] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const emailOk = /.+@.+\..+/.test(form.email.trim());
    const passOk = form.password.length >= 6;
    if (!emailOk || !passOk) {
      setError(!emailOk ? "Enter a valid email" : "Password must be 6+ chars");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const { data } = await login(form);
      await AsyncStorage.setItem("token", data.token);
      navigation.replace("Dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="city-variant-outline" size={80} color={theme.colors.primary} />
        <Text style={[styles.title, { color: theme.colors.primary }]}>Smart City</Text>
        <Text style={[styles.subtitle, { color: theme.colors.secondary }]}>Management Platform</Text>
      </View>

      <Surface style={[styles.card, { backgroundColor: theme.colors.surface }]} elevation={4}>
        <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Welcome Back</Text>
        <Text style={[styles.cardSub, { color: theme.colors.placeholder }]}>Sign in to continue</Text>

        <TextInput
          label="Email"
          mode="outlined"
          value={form.email}
          onChangeText={(t) => setForm({ ...form, email: t })}
          keyboardType="email-address"
          style={styles.input}
          left={<TextInput.Icon icon="email" />}
        />

        <TextInput
          label="Password"
          mode="outlined"
          value={form.password}
          onChangeText={(t) => setForm({ ...form, password: t })}
          secureTextEntry={!show}
          right={<TextInput.Icon icon={show ? "eye-off" : "eye"} onPress={() => setShow((s) => !s)} />}
          style={styles.input}
          left={<TextInput.Icon icon="lock" />}
        />

        {error ? <HelperText type="error" visible={!!error}>{error}</HelperText> : null}

        <Button
          mode="contained"
          onPress={handleLogin}
          loading={loading}
          style={styles.button}
          contentStyle={{ height: 50 }}
        >
          Sign In
        </Button>

        <View style={styles.footer}>
          <Text style={{ color: theme.colors.placeholder }}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={{ color: theme.colors.primary, fontWeight: "bold" }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    padding: 20 },
  header: { 
    alignItems: "center", 
    marginBottom: 40 },
  title: { 
    fontSize: 32, 
    fontWeight: "bold", 
    letterSpacing: 1 },
  subtitle: { 
    fontSize: 16, 
    letterSpacing: 2, 
    textTransform: "uppercase" },

  card: { 
    padding: 24, 
    borderRadius: 24 },
  cardTitle: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 4 },
  cardSub: { 
    fontSize: 14, 
    marginBottom: 24 },

  input: { 
    marginBottom: 16, 
    backgroundColor: "transparent" },
  button: { marginTop: 8, 
    borderRadius: 12 },

  footer: { flexDirection: "row", 
    justifyContent: "center", marginTop: 24 },
});
