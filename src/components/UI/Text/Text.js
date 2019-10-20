import React from 'react';
import { Text, StyleSheet } from 'react-native';

import CONSTANTS from '../../../utils/constants';

const width = CONSTANTS.screenWidth;

const text = props => {
    let NORMAL_FONT_SIZE = Math.floor(width / 14);
    let SMALL_FONT_SIZE = Math.floor(width / 20);
    let LARGE_FONT_SIZE = Math.floor(width / 12);
    let EXTRA_LARGE_FONT_SIZE = Math.floor(width / 10);

    let fontSize = props.extra ? EXTRA_LARGE_FONT_SIZE : props.large ? LARGE_FONT_SIZE : props.normal ? NORMAL_FONT_SIZE : SMALL_FONT_SIZE;

    if (props.giant) {
        fontSize = Math.floor(width / 8);
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