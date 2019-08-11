import React from "react";
import { TextInput, StyleSheet } from "react-native";

import CONSTANTS from '../../../utils/constants'

const defaultInput = props => (
  <TextInput
    underlineColorAndroid="transparent"
    {...props}
    style={[styles.input, props.style]}
  />
);

const styles = StyleSheet.create({
  input: {
    width: "90%",
    height: '50%',
    borderColor: 'white',
    borderWidth: 2,
    textAlign: "center"
  }
});

export default defaultInput; 