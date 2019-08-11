import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import CONSTANTS from '../../utils/constants';

export default props =>{
    console.log(props, 'PROPS')
    return (
    <View style={[styles.content, props.contentStyles]}>
        <View style={styles.navigate}>
            <TouchableOpacity
                onPress={props.navigate}
                style={styles.fullAndCenter}>
                <View>
                    <Icon name='arrow' size={30} />
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
)};

const styles = StyleSheet.create({
    content: {
        height: '10%',
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
    }
});