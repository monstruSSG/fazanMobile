import React from 'react';
import { View, StyleSheet, TouchableNativeFeedback, TouchableOpacity } from 'react-native';

import CONSTANTS from '../../../utils/constants';
import Text from '../Text/Text';

const button = props => {
    const content = (
        <View style={[styles.button, { backgroundColor: props.color, width: props.width, height: props.height }, props.style]}>
          <Text style={styles.buttonText} color="azure">{props.children}</Text>
        </View>
      );
      if (Platform.OS === "android") {
        return (
          <TouchableNativeFeedback style={[styles.button, { backgroundColor: props.color, width: props.width, height: props.height }, props.style]} onPress={props.onPress}>
            {content}
          </TouchableNativeFeedback>
        );
      }
      return <TouchableOpacity onPress={props.onPress}>{content}</TouchableOpacity>;
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin: 5,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 10,
        borderWidth: 1
      },
})

export default button; 