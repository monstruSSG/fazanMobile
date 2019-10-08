import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';

import Avatar from '../../assets/av.png';
import PlayButton from '../../assets/Buttons/playButton.png';
import CONSTANTS from '../../utils/constants';
import CustomText from '../../components/UI/Text/Text';

import Label from '../../assets/Stuff/titleBox.png';

export default props => (
    <ImageBackground source={Label} style={[styles.content, props.style]} resizeMode="stretch">
        <View style={styles.oponentDetailsWrapper}>
            <View style={styles.oponentImageWrapper}>
                <Image
                    style={styles.image}
                    source={props.picture ? { uri: props.picture } : Avatar} />
            </View>
            <View style={styles.oponentNameWrapper}>
                <View>
                    <CustomText normal style={styles.oponentNameText}>{props.name}</CustomText>
                </View>
            </View>
        </View>
        <View style={styles.resultWrapper}>
            <View style={styles.oponentInviteWrapper}>
                <TouchableOpacity style={[styles.center]}>
                    <Image source={PlayButton}
                        style={styles.playButton}
                        resizeMode="contain">
                    </Image>
                </TouchableOpacity>
            </View>
        </View>
    </ImageBackground>
);

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        position: 'relative',
        right: '90%'
    },
    playButton: {
        position: 'relative',
        bottom: '4%',
        height: 50,
        width: 50,
        left: '50%',
        resizeMode: 'stretch',
    },
    content: {
        height: 100,
        flexDirection: 'row',
        marginTop: 18,
        marginLeft: 12,
        marginRight: 12,
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
        justifyContent: 'center'
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
        position: 'relative',
        left: '35%',
        bottom: '2%',
        height: 55,
        width: 85,
        resizeMode: 'stretch',
    }
});