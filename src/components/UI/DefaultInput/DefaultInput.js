import React from "react";
import { TextInput, StyleSheet } from "react-native";

import * as CONSTANTS from '../../../utils/constants'

const defaultInput = props => (
  <TextInput
    underlineColorAndroid="transparent"
    {...props}
    style={[styles.input, props.style]}
  />
);

const styles = StyleSheet.create({
  input: {
    width: "75%",
    borderBottomColor: CONSTANTS.textColor,
    borderBottomWidth: 3,
    padding: 5,
    marginTop: 8,
    marginBottom: 8,
    textAlign: "center"
  }
});

export default defaultInput; 