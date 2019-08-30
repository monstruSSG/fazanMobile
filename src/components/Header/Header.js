import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import CONSTANTS from '../../utils/constants';
import Logo from '../../assets/b.jpg'

export default props => {
    return (
        <View style={[styles.content, props.contentStyles]}>
            <View style={styles.navigate}>
                <TouchableOpacity
                    onPress={props.navigate}
                    style={[styles.fullAndCenter, styles.backArrow]}>
                    <View>
                        <Icon name='arrow-left' size={20} color={CONSTANTS.borderColor} />
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
                    <Image
                        style={styles.image}
                        source={Logo} />
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    content: {
        height: '100%',
        flexDirection: 'row',
        backgroundColor: CONSTANTS.thirdColor,
        borderBottomColor: CONSTANTS.borderColor,
        borderBottomWidth: 3
    },
    navigate: {
        width: '15%'
    },
    title: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fullAndCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        fontFamily: 'bold',
        fontSize: 25,
        fontWeight: '500',
        color: CONSTANTS.borderColor
    },
    extra: {
        flex: 1
    },
    backArrow: {
        alignItems: 'flex-start',
        paddingLeft: 12
    },
    image: {
        width: 60,
        height: 60,
        resizeMode: 'cover',
        borderRadius: 30
    }
});