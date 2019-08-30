import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import Logo from '../../assets/fazanLogo.png';
import CONSTANTS from '../../utils/constants';

export default props => (
    <View style={[styles.content, props.style, props.win ? { backgroundColor: CONSTANTS.buttonColor } : { backgroundColor: CONSTANTS.secondaryColor }]}>
        <View style={styles.imageWrapper}>
            <Image
                style={styles.image}
                source={Logo} />
        </View>
        <View style={styles.oponentPointsWrapper}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text >{props.name}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{props.points}</Text>
            </View>
        </View>
        <View style={styles.resultWrapper}>
            <Text>{props.wins}/{props.loses}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,
        borderRadius: 10,
        borderWidth: 4,
        borderColor: CONSTANTS.borderColor
    },
    imageWrapper: {
        alignContent: 'center',
        justifyContent: 'center'
    },
    oponentPointsWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    resultWrapper: {
        alignContent: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 30,
        height: 30,
        resizeMode: 'cover'
    }
});