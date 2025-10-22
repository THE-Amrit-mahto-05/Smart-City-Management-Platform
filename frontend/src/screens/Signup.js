import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const Signup = ({ goBack }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setMessageType('error');
      setMessage('Please fill all fields');
      return;
    }
    if (password !== confirmPassword) {
      setMessageType('error');
      setMessage('Passwords do not match');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/auth/signup', {
        name,
        email,
        password,
      });
      setMessageType('success');
      setMessage('Account created successfully!');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => goBack(), 1500);
    } catch (error) {
      console.error(error);
      setMessageType('error');
      setMessage(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={styles.centerContainer}>
        <Card style={styles.card}>
        <Text style={styles.title}>Create Your Account</Text>
        {message && (
        <Text
        style={[
        styles.message,
        messageType === 'error' ? styles.errorText : styles.successText,
        ]}>
        {message}
        </Text>
        )}
        <View style={styles.formGroup}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
        placeholderTextColor="#aaa"
        />
        </View>

        <View style={styles.formGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder="Enter your email"
        placeholderTextColor="#aaa"
        />
        </View>

        <View style={styles.formGroup}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
        <TextInput
        style={styles.passwordInput}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        placeholder="Enter your password"
        placeholderTextColor="#aaa"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
        <Ionicons
        name={showPassword ? 'eye' : 'eye-off'}
        size={22}
        color="#888"
        style={styles.eyeIcon}
        />
        </TouchableOpacity>
        </View>
        </View>

        <View style={styles.formGroup}>
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.passwordContainer}>
        <TextInput
        style={styles.passwordInput}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={!showConfirmPassword}
        placeholder="Re-enter your password"
        placeholderTextColor="#aaa"
        />
        <TouchableOpacity
        onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            
        <Ionicons
        name={showConfirmPassword ? 'eye' : 'eye-off'}
        size={22}
        color="#888"
        style={styles.eyeIcon}/>
        </TouchableOpacity>
        </View>
        </View>
        <Button mode="contained" style={styles.signupButton} onPress={handleSignup}>Sign Up</Button>
        <Button mode="text" onPress={goBack} style={styles.backButton}>Back</Button>
        </Card>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F8FB',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 30,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    borderRadius: 25,
    paddingVertical: 35,
    paddingHorizontal: 25,
    backgroundColor: '#FFF',
    elevation: 8,
  },
  title: {
    fontSize: 26,
    color: '#FF8C00',
    fontFamily: 'Pacifico',
    textAlign: 'center',
    marginBottom: 20,
  },
  message: {
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 10,
    fontWeight: '500',
  },
  errorText: {
    color: 'red',
  },
  successText: {
    color: 'green',
  },
  formGroup: {
    width: '100%',
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    color: '#555',
    marginLeft: 10,
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1.4,
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1.4,
    borderRadius: 25,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 15,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  signupButton: {
    backgroundColor: '#34C759',
    borderRadius: 30,
    width: '100%',
    marginTop: 15,
    paddingVertical: 5,
  },
  backButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
});
