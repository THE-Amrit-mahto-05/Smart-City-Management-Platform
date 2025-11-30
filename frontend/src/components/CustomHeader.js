import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CustomHeader({ title, showBack = false, rightIcon, onRightPress }) {
    const theme = useTheme();
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    return (
        <View style={[
        styles.container,
        {
        backgroundColor: theme.colors.surface,
        paddingTop: insets.top + 10, 
        }]}>
        {showBack ? (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>) : (
        <View style={styles.placeholder} />)}

        <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>

        {rightIcon ? (
        <TouchableOpacity onPress={onRightPress} style={styles.backButton}>
        <MaterialCommunityIcons name={rightIcon} size={24} color={theme.colors.text} />
        </TouchableOpacity>
        ) : (
        <View style={styles.placeholder} />
        )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    },
    backButton: {
    padding: 8,
    marginLeft: -8,
    },
    title: {
    fontSize: 20,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
    },
    placeholder: {
    width: 40,
    },
});
