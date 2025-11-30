import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import DashboardScreen from "../screens/DashboardScreen";
import AirPollutionScreen from "../screens/AirPollutionScreen";
import TrafficDashboard from "../screens/TrafficDashboard";
import EnergyDashboard from "../screens/EnergyDashboard";
import WasteDashboard from "../screens/WasteDashboard";
import EmergencyDashboard from "../screens/EmergencyDashboard";



const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="AirPollutionDashboard" component={AirPollutionScreen} />
        <Stack.Screen name="TrafficDashboard" component={TrafficDashboard} />
        <Stack.Screen name="EnergyDashboard" component={EnergyDashboard} />
        <Stack.Screen name="WasteDashboard" component={WasteDashboard} />
        <Stack.Screen name="EmergencyDashboard" component={EmergencyDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
