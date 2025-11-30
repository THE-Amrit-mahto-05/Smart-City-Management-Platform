import React from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Text, Surface, useTheme, Button } from "react-native-paper";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";
import CustomHeader from "../components/CustomHeader";

const { width } = Dimensions.get("window");

export default function AnalyticsScreen() {
    const theme = useTheme();

    const chartConfig = {
        backgroundGradientFrom: theme.colors.surface,
        backgroundGradientTo: theme.colors.surface,
        color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`, 
        strokeWidth: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false,
        labelColor: (opacity = 1) => theme.colors.text,
    };

    const energyData = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
            {
                data: [450, 520, 480, 600, 550, 400, 380],
                color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
                strokeWidth: 2
            }
        ],
        legend: ["Energy (kWh)"]
    };

    const trafficData = {
        labels: ["8am", "12pm", "5pm", "9pm"],
        datasets: [
            {
                data: [85, 60, 95, 40]
            }
        ]
    };

    const wasteData = [
        {
            name: "Recycled",
            population: 45,
            color: "#4ADE80",
            legendFontColor: theme.colors.text,
            legendFontSize: 12
        },
        {
            name: "Landfill",
            population: 30,
            color: "#EF4444",
            legendFontColor: theme.colors.text,
            legendFontSize: 12
        },
        {
            name: "Compost",
            population: 25,
            color: "#FBBF24",
            legendFontColor: theme.colors.text,
            legendFontSize: 12
        }
    ];

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <CustomHeader title="City Analytics" />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Energy Trend */}
                <Surface style={[styles.card, { backgroundColor: theme.colors.surface }]} elevation={2}>
                    <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Energy Consumption</Text>
                    <LineChart
                        data={energyData}
                        width={width - 40}
                        height={220}
                        chartConfig={chartConfig}
                        bezier
                        style={{ borderRadius: 16 }}
                    />
                </Surface>

                {/* Traffic Congestion */}
                <Surface style={[styles.card, { backgroundColor: theme.colors.surface }]} elevation={2}>
                    <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Traffic Congestion</Text>
                    <BarChart
                        data={trafficData}
                        width={width - 40}
                        height={220}
                        yAxisLabel=""
                        yAxisSuffix="%"
                        chartConfig={{
                            ...chartConfig,
                            color: (opacity = 1) => `rgba(245, 166, 35, ${opacity})`, // Orange
                        }}
                        style={{ borderRadius: 16 }}
                    />
                </Surface>

                {/* Waste Management */}
                <Surface style={[styles.card, { backgroundColor: theme.colors.surface }]} elevation={2}>
                    <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Waste Distribution</Text>
                    <PieChart
                        data={wasteData}
                        width={width - 40}
                        height={220}
                        chartConfig={chartConfig}
                        accessor={"population"}
                        backgroundColor={"transparent"}
                        paddingLeft={"15"}
                        center={[10, 0]}
                        absolute
                    />
                </Surface>

                <Button mode="contained" style={{ marginTop: 20 }} onPress={() => console.log("Export Report")}>
                    Export Weekly Report
                </Button>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContent: { padding: 16, paddingBottom: 40 },
    card: {
        padding: 16,
        borderRadius: 16,
        marginBottom: 20,
        alignItems: "center",
        overflow: 'hidden' // Ensure chart doesn't overflow
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        alignSelf: "flex-start",
    },
});
