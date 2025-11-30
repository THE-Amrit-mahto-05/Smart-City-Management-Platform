import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import DashboardScreen from "../screens/DashboardScreen";
import AirPollutionScreen from "../screens/AirPollutionScreen";
import TrafficDashboard from "../screens/TrafficDashboard";
import EnergyDashboard from "../screens/EnergyDashboard";
import WasteDashboard from "../screens/WasteDashboard";
import AnalyticsScreen from "../screens/AnalyticsScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
const theme = useTheme();
const [role, setRole] = useState(null);

useEffect(() => {
const getRole = async () => {
const r = await AsyncStorage.getItem("userRole");
setRole(r);
};
getRole();
}, []);

return (
<Tab.Navigator 
screenOptions={{
headerShown: false,
tabBarStyle: {
backgroundColor: theme.colors.surface,
borderTopColor: "rgba(0,0,0,0.1)",
elevation: 8,
height: 60,
paddingBottom: 8,
},
tabBarActiveTintColor: theme.colors.primary,
tabBarInactiveTintColor: theme.colors.placeholder,
}} >
<Tab.Screen
name="Home"
component={DashboardScreen}
options={{
tabBarLabel: "Home",
tabBarIcon: ({ color, size }) => (
<MaterialCommunityIcons name="home-variant" size={size} color={color} />
    ),}}
            />
{(role === "Admin" || role === "Officer") && (
<Tab.Screen
name="Analytics"
component={AnalyticsScreen}
options={{
tabBarLabel: "Analytics",
tabBarIcon: ({ color, size }) => (
<MaterialCommunityIcons name="chart-box" size={size} color={color} />
),}}
/>)}

<Tab.Screen
name="Air"
component={AirPollutionScreen}
options={{
tabBarLabel: "Air",
tabBarIcon: ({ color, size }) => (
<MaterialCommunityIcons name="weather-windy" size={size} color={color} />
),}}
/>
<Tab.Screen
name="Traffic"
component={TrafficDashboard}
options={{
tabBarLabel: "Traffic",
tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="traffic-light" size={size} color={color} />
),}}/>
<Tab.Screen
name="Energy"
component={EnergyDashboard}
options={{
tabBarLabel: "Energy",
tabBarIcon: ({ color, size }) => (
<MaterialCommunityIcons name="lightning-bolt" size={size} color={color} />
),}}/>

{(role === "Admin" || role === "Officer") && (
<Tab.Screen
name="Waste"
component={WasteDashboard}
options={{
tabBarLabel: "Waste",
tabBarIcon: ({ color, size }) => (
<MaterialCommunityIcons name="trash-can" size={size} color={color} />
),}}
/>
)}
</Tab.Navigator>
);
}
