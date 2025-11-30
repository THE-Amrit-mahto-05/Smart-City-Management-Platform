import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Surface, useTheme, ProgressBar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomHeader from "../components/CustomHeader";

export default function WasteDashboard() {
    const theme = useTheme();

    const bins = [
        { id: 1, location: "Main Market", level: 0.8, status: "Critical" },
        { id: 2, location: "Sector 4 Park", level: 0.4, status: "Normal" },
        { id: 3, location: "Bus Stand", level: 0.9, status: "Full" },
        { id: 4, location: "City Center", level: 0.2, status: "Normal" },
    ];

    const getStatusColor = (level) => {
        if (level >= 0.9) return theme.colors.error;
        if (level >= 0.7) return theme.colors.tertiary;
        return theme.colors.primary;
    };

    return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
    <CustomHeader title="Smart Waste Management" showBack />

    <ScrollView contentContainerStyle={styles.scrollContent}>
    <View style={styles.summaryContainer}>
    <Surface style={[styles.summaryCard, { backgroundColor: theme.colors.surface }]} elevation={2}>
    <Text style={styles.summaryValue}>85%</Text>
    <Text style={styles.summaryLabel}>Collection Efficiency</Text>
    </Surface>
    <Surface style={[styles.summaryCard, { backgroundColor: theme.colors.surface }]} elevation={2}>
    <Text style={styles.summaryValue}>12</Text>
    <Text style={styles.summaryLabel}>Trucks Active</Text>
    </Surface>
    </View>
    <Text style={[
        styles.sectionTitle, 
        { color: theme.colors.text }]}>Route Optimization</Text>
    <Surface style={[styles.binCard, 
    { backgroundColor: theme.colors.surface }]} 
    elevation={2}>
    <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', marginBottom: 10 }}>
    <MaterialCommunityIcons name="map-marker-path" 
    size={24} color={theme.colors.primary} />
    <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 10 }}>Optimized Collection Route</Text>
</View>
<Text style={{ color: theme.colors.placeholder, marginBottom: 10 }}>
Based on current bin fill levels, the AI suggests skipping Sector 4 Park today.
</Text>
<View style={{ backgroundColor: theme.colors.background, padding: 10, borderRadius: 8 }}>
<Text style={{ fontWeight: 'bold' }}>Suggested Path:</Text>
<Text style={{ fontSize: 12, marginTop: 4 }}>Depot -> Main Market (80%) -> Bus Stand (90%) -> City Center (20%) -> Depot</Text>
 </View>
<View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'flex-end' }}>
<Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>Est. Savings: 2.4 km / 1.5 L Fuel</Text>
</View>
                </Surface>

                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Bin Status</Text>

                {bins.map((bin) => (
                    <Surface key={bin.id} style={[styles.binCard, { backgroundColor: theme.colors.surface }]} elevation={1}>
                        <View style={styles.binHeader}>
                         <View style={styles.binInfo}>
                    <MaterialCommunityIcons name="trash-can" size={24} color={getStatusColor(bin.level)} />
                                <Text style={styles.binLocation}>{bin.location}</Text>
                    </View>
                            <Text style={[styles.binStatus, { color: getStatusColor(bin.level) }]}>{bin.status}</Text>
                        </View>
                        <View style={styles.progressContainer}>
                            <Text style={styles.progressLabel}>Fill Level: {(bin.level * 100).toFixed(0)}%</Text>
                    <ProgressBar progress={bin.level} color={getStatusColor(bin.level)} style={styles.progressBar} />
                        </View>
                    </Surface>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContent: { padding: 16 },
    summaryContainer: { 
        flexDirection: "row", 
        justifyContent: "space-between", 
        marginBottom: 24 },
    summaryCard: { 
        flex: 1, 
        padding: 16, 
        borderRadius: 16, 
        alignItems: "center", 
        marginHorizontal: 4 },
    summaryValue: { 
        fontSize: 24, 
        fontWeight: "bold", color: "#2563EB" },
    summaryLabel: { 
        fontSize: 12, 
        color: "#666", 
        marginTop: 4 },
    sectionTitle: { 
        fontSize: 18, 
        fontWeight: "bold", 
        marginBottom: 16 },
    binCard: { 
        padding: 16, 
        borderRadius: 12, 
        marginBottom: 12 },
    binHeader: { 
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: 12 },
    binInfo: { flexDirection: "row", alignItems: "center" },
    binLocation: { marginLeft: 12, fontSize: 16, fontWeight: "500" },
    binStatus: { fontWeight: "bold", fontSize: 14 },
    progressContainer: { marginTop: 8 },
    progressLabel: { fontSize: 12, color: "#666", marginBottom: 4 },
    progressBar: { height: 8, borderRadius: 4 },
});
