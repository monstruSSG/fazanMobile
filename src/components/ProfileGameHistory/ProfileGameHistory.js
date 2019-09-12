import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';

import * as CONSTANTS from '../../utils/constants';

import NameHolder from '../../assets/Stuff/titleBox.png';
import Avatar from '../../assets/av.png';

const winLose = props => props.win ? 'W' : 'L';

export default props => (
    <View style={[styles.centerContent]}>
        <ImageBackground style={[styles.maxHeightWidht, props.style]} source={NameHolder} resizeMode='stretch'>
            <View style={[styles.centerContent, { flexDirection: 'row' }]}>
                <View style={[styles.centerContent, styles.photoPosition, { flex: 1 }]}>
                    <Image source={Avatar} style={styles.avatarStyle} />
                </View>
                <View style={[styles.centerContent, styles.namePosition, { flex: 3, }]}>
                    <Text style={[styles.text, { fontSize: 22 }]}>{props.name}</Text>
                </View>
                <View style={[styles.centerContent, styles.resultPosition, { flex: 1 }]}>
                    <Text style={[styles.text, { color: props.win ? 'green' : 'red' }]}>{winLose(props)}</Text>
                </View>
            </View>
        </ImageBackground>
    </View>
);

const styles = StyleSheet.create({
    avatarStyle: {
        width: '75%',
        height: '75%'
    },
    resultPosition: {
        position: 'relative',
        top: '1%'
    },
    photoPosition: {
        position: 'relative',
        left: '50%',
        top: '1%'
    },
    namePosition: {
        position: 'relative',
        left: '20%',
        top: '1%'
    },
    text: {
        fontFamily: 'Troika',
        fontSize: 55,
        color: 'white'
    },
    goldStar: {
        height: '10%',
        width: '95%'
    },
    maxHeightWidht: {
        flex: 1,
        width: '100%'
    },
    centerContent: {
        width: '90%',
        height: '90%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});