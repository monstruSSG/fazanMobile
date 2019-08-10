import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import CONSTANTS from '../../utils/constants';

export default props => (
    <View style={[styles.content, props.contentStyles]}>
        <Text> {props.title} </Text>
    </View>
);

const styles = StyleSheet.create({
    content: {
        backgroundColor: CONSTANTS.buttonColor
    }
});