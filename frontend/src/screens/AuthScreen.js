import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Signup from './Signup';
import Login from './Login';

export default function AuthScreen() {
  const [activeScreen, setActiveScreen] = useState('auth'); // 'auth', 'signup', 'login'

  if (activeScreen === 'signup') {
    return <Signup goBack={() => setActiveScreen('auth')} />;
  }

  if (activeScreen === 'login') {
    return <Login goBack={() => setActiveScreen('auth')} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to Your Smart City!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setActiveScreen('signup')}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.loginButton]}
        onPress={() => setActiveScreen('login')}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  welcome: { fontSize: 24, fontWeight: 'bold', marginBottom: 40 },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 25,
    marginVertical: 10,
  },
  loginButton: { backgroundColor: '#34C759' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
