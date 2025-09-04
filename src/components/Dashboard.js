// import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

const Dashboard = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 48
    },
});

export default Dashboard;
