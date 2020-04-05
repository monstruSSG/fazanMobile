import React from 'react';
import { View, StyleSheet, ImageBackground, Image } from 'react-native';

import CustomText from '../../components/UI/Text/Text';
import NameHolder from '../../assets/Stuff/titleBox.png';
import Avatar from '../../assets/av.png';

const winLose = props => props.none ? 'N' : props.win ? 'W' : 'L';

export default props => (
    <View style={[styles.centerContent]}>
        <ImageBackground style={[styles.maxHeightWidht, props.style]} source={NameHolder} resizeMode='stretch'>
            <View style={[styles.centerContent, { flexDirection: 'row' }]}>
                <View style={[styles.centerContent, styles.photoPosition, { flex: 1 }]}>
                    <Image source={Avatar} style={styles.avatarStyle} />
                </View>
                <View style={[styles.centerContent, styles.namePosition, { flex: 3, }]}>
                    <CustomText small>{props.name}</CustomText>
                </View>
                <View style={[styles.centerContent, styles.resultPosition, { flex: 1 }]}>
                    <CustomText large style={{ color: props.none ? 'white' : props.win ? 'green' : 'red' }}>{winLose(props)}</CustomText>
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