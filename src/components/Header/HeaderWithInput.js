import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import CONSTANTS from '../../utils/constants';
import CustomInput from '../../components/UI/DefaultInput/DefaultInput'

export default props =>{
    return (
    <View style={[styles.content, props.contentStyles]}>
        <View style={styles.navigate}>
            <TouchableOpacity
                onPress={props.navigate}
                style={[styles.fullAndCenter, styles.menuIcon]}>
                <View>
                    <Icon name='navicon' size={30} color="white" />
                </View>
            </TouchableOpacity>
        </View>
        <View style={styles.input}>
            <View style={[styles.fullAndCenter]}>
                <CustomInput />
            </View>
        </View>
    </View>
)};

const styles = StyleSheet.create({
    content: {
        height: '100%',
        flexDirection: 'row',
        backgroundColor: CONSTANTS.buttonColor
    },
    navigate: {
        flex: 1
    },
    fullAndCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        flex: 4
    },
    menuIcon: {
        alignItems: undefined,
        paddingLeft: 12
    }
});