import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { useFonts } from 'expo-font';
import Signup from './Signup';
import Login from './Login';

export default function AuthScreen() {
  const [activeScreen, setActiveScreen] = useState('auth');

  const [fontsLoaded] = useFonts({
   Pacifico: require('../../assets/fonts/Pacifico-Regular.ttf'),

  });

  if (!fontsLoaded) {
    return null; 
  }

  if (activeScreen === 'signup') {
    return <Signup goBack={() => setActiveScreen('auth')} />;
  }
  if (activeScreen === 'login') {
    return <Login goBack={() => setActiveScreen('auth')} />;
  }

  return (
    <View style={styles.container}>
    <View style={styles.outerCard}>
    <Card style={styles.card}>
  <View style={styles.headerContainer}>
    <Text style={styles.title}>Welcome to Your Smart City</Text>
    <Text style={styles.subtitle}>Connect with your city smartly.</Text>
  </View>

  <View style={styles.buttonRow}>
    <Button
      mode="contained"
      style={styles.signupButton}
      labelStyle={styles.buttonText}
      onPress={() => setActiveScreen('signup')}
    >
      Sign Up
    </Button>

    <Button
      mode="contained"
      style={styles.loginButton}
      labelStyle={styles.buttonText}
      onPress={() => setActiveScreen('login')}
    >
      Log In
    </Button>
  </View>
  </Card>

    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F8FB',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  outerCard: {
    borderWidth: 2,
    borderColor: '#4AB6E8',
    borderRadius: 28,
    padding: 2,
    
  },
  card: {
    width: '90%',
    borderRadius: 25,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#FFF',
    elevation: 8,
  },
  title: {
    fontSize: 28,
    color: '#FF8C00',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Pacifico',
  },
  headerContainer: {
  alignItems: 'center', 
  marginBottom: 35,    
},
subtitle: {
  fontSize: 15,
  color: '#777',
  textAlign: 'center', 
  marginTop: 5,       
},
  buttonRow: {
  flexDirection: 'row',
  justifyContent: 'center',  
  gap: 10,                    
  marginBottom: 20,
},
signupButton: {
  backgroundColor: '#FF8C00',
  flex: 0,                   
  borderRadius: 30,
  paddingHorizontal: 10,     
},
loginButton: {
  backgroundColor: '#34C759',
  flex: 0,
  borderRadius: 30,
  paddingHorizontal: 10,
},

  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
