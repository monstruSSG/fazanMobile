import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Avatar from '../../assets/av.png';
import PlayButton from '../../assets/Buttons/playButton.png';
import CONSTANTS from '../../utils/constants';

import Label from '../../assets/Stuff/titleBox.png';

export default props => (
    <ImageBackground source={Label} style={[styles.content, props.style]}>
        <View style={styles.oponentDetailsWrapper}>
            <View style={styles.oponentImageWrapper}>
                <Image
                    style={styles.image}
                    source={Avatar} />
            </View>
            <View style={styles.oponentNameWrapper}>
                <View>
                    <Text style={styles.oponentNameText}>{props.name}</Text>
                    <Text style={styles.oponentPointsText}>{props.points}</Text>
                </View>
            </View>
        </View>
        <View style={styles.resultWrapper}>
            <View style={styles.oponentInviteWrapper}>
                <TouchableOpacity>
                    <ImageBackground source={PlayButton} style={{ width: 50,  height: 50, alignItems: 'center', position: 'relative', right: '75%' }} resizeMode="stretch">
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        </View>
    </ImageBackground>
);

const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 18,
        marginLeft: 12,
        marginRight: 12,
        height: "100%",

    },
    oponentNameWrapper: {
        flex: 2,
        justifyContent: 'center',
        paddingRight: "15%",
        alignItems: 'center'
    },
    oponentImageWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    oponentDetailsWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    oponentInviteWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    oponentNameText: {
        fontFamily: 'Troika',
        fontSize: 20,
        letterSpacing: 1,
        color: CONSTANTS.textColor
    },
    oponentPointsText: {
        fontFamily: 'Troika',
        fontSize: 18,
        textAlign: 'center',
        letterSpacing: 1,
        color: CONSTANTS.textColor
    },
    resultWrapper: {
        paddingTop: 4,
        paddingRight: 4
    },
    image: {
        width: 45,
        height: 45,
        marginLeft: '50%',
        resizeMode: 'cover',
    }
});