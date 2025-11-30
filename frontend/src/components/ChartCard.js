import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ChartCard({ title, children }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 16, padding: 16, marginBottom: 16, marginHorizontal: 4, backgroundColor: "#fff", shadowColor: "#000", shadowOpacity: 0.08, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4 },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 12, letterSpacing: 0.5 },
  content: {
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
