import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import CONSTANTS from '../../utils/constants';

export default props => {
    return (
        <View style={[styles.content, props.contentStyles]}>
            <View style={styles.navigate}>
                <TouchableOpacity
                    onPress={props.navigate}
                    style={[styles.fullAndCenter, styles.backArrow]}>
                    <View>
                        <Icon name='arrow-left' size={20} color="white" />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.title}>
                <View style={styles.fullAndCenter}>
                    <Text style={styles.headerText}>{props.title}</Text>
                </View>
            </View>
            <View style={styles.extra}>
                <View style={styles.fullAndCenter}>
                    <Text>XX</Text>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    content: {
        height: '100%',
        flexDirection: 'row',
        backgroundColor: CONSTANTS.buttonColor
    },
    navigate: {
        flex: 1
    },
    title: {
        flex: 2
    },
    fullAndCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        fontFamily: 'bold',
        fontSize: 15
    },
    extra: {
        flex: 1
    },
    backArrow: {
        alignItems: undefined,
        paddingLeft: 12
    }
});