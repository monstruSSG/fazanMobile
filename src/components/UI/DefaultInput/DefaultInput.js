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
<<<<<<< HEAD
    flex: 1,
    borderColor: CONSTANTS.textColor,
    borderWidth: 3,
    padding: 5,
    marginTop: 8,
    marginBottom: 8,
=======
    width: "90%",
    height: '50%',
    borderColor: 'white',
    borderWidth: 2,
>>>>>>> c0ab813b01fc52efce437ab5b073c15a11eb2994
    textAlign: "center"
  }
});

export default defaultInput; 