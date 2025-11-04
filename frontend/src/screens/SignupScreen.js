import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { signup } from "../api/authApi";

export default function SignupScreen({ navigation }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "Viewer" });

  const handleSignup = async () => {
    try {
      await signup(form);
      console.log("Signup successful!");
      navigation.navigate("Login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        placeholder="Name"
        style={styles.input}
        onChangeText={(t) => setForm({ ...form, name: t })}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        onChangeText={(t) => setForm({ ...form, email: t })}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        onChangeText={(t) => setForm({ ...form, password: t })}
      />

      <Button title="Sign Up" onPress={handleSignup} />
      <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
        Already have an account? Login
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 60 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
  },
  link: {
     color: "blue", 
     marginTop: 15, 
     textAlign: "center" },
});
