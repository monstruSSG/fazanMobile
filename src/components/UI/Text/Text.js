import React from 'react';
import { Text, StyleSheet } from 'react-native';

const text = props => (
    <Text style={[styles.text, props.style, {color: props.color}]}>{props.children}</Text>
);

const styles = StyleSheet.create({
    text: {
        textAlign: "center",
        fontWeight: "bold",
        backgroundColor: "transparent"
    }
});

export default text; 