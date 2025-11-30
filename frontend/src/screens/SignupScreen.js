import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Text, TextInput, Button, Surface, useTheme, HelperText, Chip } from "react-native-paper";
import { signup } from "../api/authApi";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function SignupScreen({ navigation }) {
  const theme = useTheme();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "Viewer" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    const nameOk = form.name.trim().length >= 2;
    const emailOk = /.+@.+\..+/.test(form.email.trim());
    const passOk = form.password.length >= 6;
    if (!nameOk || !emailOk || !passOk) {
      setError(!nameOk ? "Name is too short" : !emailOk ? "Enter a valid email" : "Password must be 6+ chars");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await signup(form);
      navigation.navigate("Login");
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const roles = ["Admin", "Officer", "Viewer"];

  return (
    <View style={[styles.container, 
    { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} 
      showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
          <MaterialCommunityIcons name="account-plus-outline" size={60} 
          color={theme.colors.primary} />
          <Text style={[styles.title, { color: theme.colors.primary }]}>Create Account</Text>
          <Text style={[styles.subtitle, { color: theme.colors.placeholder }]}>Join the Smart City Network</Text>
        </View>

        <Surface style={[styles.card, { 
          backgroundColor: theme.colors.surface }]} elevation={4}>
          <TextInput
            label="Full Name"
            mode="outlined"
            value={form.name}
            onChangeText={(t) => setForm({ ...form, name: t })}
            style={styles.input}
            left={<TextInput.Icon icon="account" />}
          />

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

          <Text style={[styles.label, { color: theme.colors.text }]}>Select Role</Text>
          <View style={styles.roleRow}>
            {roles.map((r) => (
              <Chip
                key={r}
                selected={form.role === r}
                onPress={() => setForm({ ...form, role: r })}
                style={styles.roleChip}
                showSelectedOverlay
              >
                {r}
              </Chip>
            ))}
          </View>

          {error ? <HelperText type="error" visible={!!error}>{error}</HelperText> : null}

          <Button
            mode="contained"
            onPress={handleSignup}
            loading={loading}
            style={styles.button}
            contentStyle={{ height: 50 }}
          >
            Create Account
          </Button>

          <View style={styles.footer}>
            <Text style={{ color: theme.colors.placeholder }}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={{ color: theme.colors.primary, fontWeight: "bold" }}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </Surface>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { 
    flexGrow: 1, 
    justifyContent: "center", 
    padding: 20 },
  header: { 
    alignItems: "center", 
    marginBottom: 30 },
  title: { 
    fontSize: 28, 
    fontWeight: "bold", 
    marginTop: 10 },
  subtitle: { 
    fontSize: 16 },

  card: { 
    padding: 24, 
    borderRadius: 24 },

  input: { 
    marginBottom: 16, 
    backgroundColor: "transparent" },
  label: { 
    fontWeight: "bold", 
    marginBottom: 12, 
    marginTop: 8 },
  roleRow: { 
    flexDirection: "row", 
    marginBottom: 20,
     flexWrap: "wrap", gap: 8 },
  roleChip: { marginRight: 4 },

  button: { marginTop: 8, borderRadius: 12 },

  footer: { flexDirection: "row", justifyContent: "center", marginTop: 24 },
});
