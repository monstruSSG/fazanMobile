import React from "react";
import { TextInput, StyleSheet, Text } from "react-native";

import CONSTANTS from '../../../utils/constants'

const textSize = Math.floor(CONSTANTS.screenWidth / 16);

const defaultInput = props => (
  <TextInput
    style={[styles.input, { fontSize: textSize }, props.style]}
    placeholderTextColor='white'
    {...props}
  />
);

const styles = StyleSheet.create({
  input: {
    fontFamily: 'Troika',
    color: 'white', 
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default defaultInput; 