import React from "react";
import { TextInput, StyleSheet, Text } from "react-native";

import CONSTANTS from '../../../utils/constants'

const defaultInput = props => (
  <TextInput
    style={[styles.input, props.style]}
    placeholderTextColor='white'
    {...props}
  />
);

const styles = StyleSheet.create({
  input: {
    fontFamily: 'Troika',
    color: 'white',
    fontSize: 24,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default defaultInput; 