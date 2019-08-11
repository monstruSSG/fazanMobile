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
    flex: 1,
    borderColor: CONSTANTS.textColor,
    borderWidth: 3,
    padding: 5,
    marginTop: 8,
    marginBottom: 8,
    textAlign: "center"
  }
});

export default defaultInput; 