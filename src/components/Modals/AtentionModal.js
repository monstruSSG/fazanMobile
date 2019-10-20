import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';

import ModalTemplate from './ModalTemplate';
import CustomText from '../UI/Text/Text';

import AboutBackground from '../../assets/Modals/about.png';
import YellowButton from '../../assets/Buttons/yellowHolder.png';
import GreenButton from '../../assets/Buttons/textButton.png';

const atention = props => (
    <ModalTemplate background={AboutBackground} isVisible={props.isVisible} onClose={props.onClose}>
        <View style={[{ width: '55%', height: '55%' }, styles.center]}>
            <View style={[styles.button]}>
                <TouchableOpacity style={[styles.max]} onPress={props.onContinue} />
            </View>
            <View style={[styles.max, styles.center]}>
                <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
                    <CustomText large>ATENTIE!!</CustomText>
                </View>
                <View style={[{ flex: 1 }, styles.center]}>
                    <CustomText style={{textAlign: 'center'}} normal>DACA PARASESTI MECIUL VEI PIERDE...</CustomText>
                </View>
                <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                    <View style={[styles.half]}>
                        <TouchableOpacity style={[styles.max]}  onPress={props.onClose}>
                            <ImageBackground source={YellowButton} style={[styles.max]} resizeMode='stretch'>
                                <View style={[styles.max, styles.center]}>
                                    <CustomText small style={styles.textPosition}>IESI</CustomText>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>

                    </View>
                    <View style={[styles.half]}>
                        <TouchableOpacity style={[styles.max]} onPress={props.onContinue}>
                            <ImageBackground source={GreenButton} style={[styles.max]} resizeMode='stretch'>
                                <View style={[styles.max, styles.center]}>
                                    <CustomText small style={styles.textPosition}>CONTINUA</CustomText>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </View>
    </ModalTemplate>
);

const styles = StyleSheet.create({
    textPosition: {
        position: 'relative',
        bottom: '8%'
    },
    half: {
        width: '50%',
        height: '50%'
    },
    max: {
        width: '100%',
        height: '100%'
    },
    imageSize: {
        width: '100%',
        height: '100%'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    button: {
        top: '3%',
        height: '20%',
        width: '30%',
        position: 'relative',
        left: '67%'
    }
});

export default atention;