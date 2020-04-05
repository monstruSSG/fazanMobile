import React from 'react';
import { View, TouchableOpacity, ImageBackground, StyleSheet, Image } from 'react-native';

import Timer from '../../../components/Timer/Timer';
import CustomText from '../../../components/UI/Text/Text';

import HeaderBg from '../../../assets/Stuff/singleplayerHeader.png';
import ExitButton from '../../../assets/Buttons/exitButton.png';

export default props => (
    <ImageBackground source={HeaderBg} style={styles.max} resizeMode='stretch'>
        <View style={[styles.max, { flexDirection: 'row' }]}>
            <View style={[styles.centerContent, { flex: 1 }]}>
                <TouchableOpacity style={[styles.centerContent, styles.exitButton]}
                    onPress={props.onExitPressed}>
                    <Image source={ExitButton} style={[styles.max]} resizeMode='stretch' />
                </TouchableOpacity>
            </View>
            <View style={[styles.centerContent, { flex: 1 }]}>
                <CustomText large style={[styles.headerText]}>{props.headerTitle}</CustomText>
            </View>
            <View style={[styles.centerContent, { flex: 1 }]}>
                <View style={[styles.centerContent, { flex: 1 }]}>
                    {props.showTimer ? <Timer style={styles.counter}
                        onTimeExpired={props.onTimeExpired}
                        count={props.count} /> : null}
                </View>
            </View>
        </View>
    </ImageBackground>
);

const styles = StyleSheet.create({
    max: {
        width: '100%',
        height: '100%'
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    counter: {
        position: 'relative',
        bottom: '14%',
        right: '12%'
    },
    headerText: {
        position: 'relative',
        bottom: '14%'
    },
    exitButton: {
        position: 'relative',
        right: '25%',
        bottom: '5%',
        width: '40%',
        height: '60%'
    }
});


