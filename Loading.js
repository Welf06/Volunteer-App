import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Alert } from 'react-native';

import { StatusBar } from 'expo-status-bar';



export const Loading =() => {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <ActivityIndicator size={100} color="#1A535C" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7FFF7",
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
});