import React from 'react';
import { Text, StyleSheet, PixelRatio } from 'react-native';



const text = props => {
    let NORMAL_FONT_SIZE = 0;
    let SMALL_FONT_SIZE = 0;
    let LARGE_FONT_SIZE = 0;
    let EXTRA_LARGE_FONT_SIZE = 0;

    let pixelDensity = PixelRatio.get();

    if (pixelDensity >= 3.5) {
        SMALL_FONT_SIZE = 20;
        NORMAL_FONT_SIZE = 25;
        LARGE_FONT_SIZE = 45;
        EXTRA_LARGE_FONT_SIZE = 45;
    } else if (pixelDensity >= 3) {
        SMALL_FONT_SIZE = 18;
        NORMAL_FONT_SIZE = 23;
        LARGE_FONT_SIZE = 38;
        EXTRA_LARGE_FONT_SIZE = 42;
    } else if (pixelDensity >= 2) {
        SMALL_FONT_SIZE = 15;
        NORMAL_FONT_SIZE = 20;
        LARGE_FONT_SIZE = 35;
        EXTRA_LARGE_FONT_SIZE = 39;
    } else if (pixelDensity >= 1.5) {
        SMALL_FONT_SIZE = 13;
        NORMAL_FONT_SIZE = 18;
        LARGE_FONT_SIZE = 33;
        EXTRA_LARGE_FONT_SIZE = 35;
    } else {
        SMALL_FONT_SIZE = 10;
        NORMAL_FONT_SIZE = 15;
        LARGE_FONT_SIZE = 20;
        EXTRA_LARGE_FONT_SIZE = 35;
    }

    let fontSize = props.extra ? EXTRA_LARGE_FONT_SIZE : props.large ? LARGE_FONT_SIZE : props.normal ? NORMAL_FONT_SIZE : SMALL_FONT_SIZE;

    if(props.giant) { 
        fontSize = EXTRA_LARGE_FONT_SIZE * 2;
    }

    let color = {}

    if (props.color) color.color = props.color

    return (
        <Text style={[styles.text, { fontSize: fontSize, ...color }, props.style]}>{props.children}</Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Troika',
        color: '#FBFFB7'
    }
});

export default text; 