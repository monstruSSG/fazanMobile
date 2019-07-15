import React from 'react';
import { Text, StyleSheet } from 'react-native';

const customTitle = props => (
    <Text style={styles.text}>{props.children}</Text>
);

const styles = StyleSheet.create({
    text: {
        textAlign: "center",
        color: "#7b5e20",
        fontSize: 38,
        letterSpacing: 8,
        fontWeight: "bold",
        backgroundColor: "transparent"
    }
});

export default customTitle; 