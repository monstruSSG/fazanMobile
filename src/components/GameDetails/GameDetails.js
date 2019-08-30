import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import Logo from '../../assets/s.jpg';
import CONSTANTS from '../../utils/constants';

export default props => (
    <View style={[styles.content, props.style, props.win ? { backgroundColor: CONSTANTS.buttonColor } : { backgroundColor: CONSTANTS.secondaryColor }]}>
        <View style={styles.imageWrapper}>
            <Image
                style={styles.image}
                source={Logo} />
        </View>
        <View style={styles.gameDetails}>
            <View style={styles.name}>
                <Text style={{fontWeight: 'bold', fontSize: 25}}>{props.name}</Text>
            </View>
            <View style={styles.oponentPointsWrapper}>
                <View style={styles.resultWrapper}>
                    <Text style={{fontWeight: 'bold', fontSize: 15}}>W/L: {props.wins}/{props.loses}</Text>
                </View>
                <View style={styles.points}>
                    <Text style={{fontWeight: 'bold', fontSize: 15}}>POINTS: {props.points}</Text>
                </View>
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,
        borderRadius: 10,
        borderWidth: 4,
        borderColor: CONSTANTS.borderColor
    },
    imageWrapper: {
        width: '25%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    oponentPointsWrapper: {
        width: '100%',
        height: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    resultWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 60,
        height: 60,
        resizeMode: 'cover',
        borderRadius: 30
    },
    gameDetails: {
        flex: 1,
        flexDirection: 'column'
    }, 
    name: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    points: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
});