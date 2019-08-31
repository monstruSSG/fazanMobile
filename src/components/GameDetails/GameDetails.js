import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import Lose from '../../assets/lose.png';
import CONSTANTS from '../../utils/constants';
import Button from '../../components/UI/Button/Button';

export default props => (
    <View style={[styles.content, props.style]}>
        <View style={styles.oponentDetailsWrapper}>
            <View style={styles.oponentImageWrapper}>
                <View style={{backgroundColor: props.status === 'W' ? CONSTANTS.secondaryColor : CONSTANTS.buttonColor , width: '80%', height: '70%', borderRadius: 30}} />
            </View>
            <View style={styles.oponentNameWrapper}>
                <View>
                    <Text style={styles.oponentNameText}>{props.oponentName}</Text>
                </View>
            </View>
        </View>
        <View style={styles.resultWrapper}>
            <View style={styles.oponentInviteWrapper}>
                <Text style={[{paddingRight: 12, letterSpacing: 2, fontWeight: "bold", fontSize: 22}, props.status === 'L' ? { color: CONSTANTS.buttonColor } : { color: CONSTANTS.secondaryColor}]}>{props.status === 'L' ? 'LOSE' : 'WIN'}</Text>
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'row',
        borderTopLeftRadius: 40,
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
        borderTopRightRadius: 40,
        borderWidth: 2,
        borderBottomWidth: 2,
        borderTopWidth: 0,
        marginTop: 12,
        marginLeft: 12,
        marginRight: 12,
        height: 100

    },
    oponentNameWrapper: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    oponentImageWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    oponentDetailsWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    oponentInviteWrapper: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "center"
    },
    oponentNameText: {
        fontSize: 16,
        textAlign: 'center',
        letterSpacing: 1,
        fontWeight: 'bold',
        color: CONSTANTS.textColor
    },
    oponentPointsText: {
        fontSize: 16,
        textAlign: 'center',
        letterSpacing: 1,
        fontWeight: 'bold',
        color: CONSTANTS.textColor
    },
    resultWrapper: {
        paddingTop: 4,
        paddingRight: 4
    },
    image: {
        width: 75,
        height: 75,
        resizeMode: 'cover'
    }
});