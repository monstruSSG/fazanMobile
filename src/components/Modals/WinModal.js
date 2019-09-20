import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';

import ModalTemplate from '../../components/Modals/ModalTemplate';
import CustomText from '../UI/Text/Text';

import WinBackground from '../../assets/Modals/win.png';
import RetryButton from '../../assets/Buttons/retry.png';
import MenuButton from '../../assets/Buttons/yellowHolder.png';

const winModal = props => (
    <ModalTemplate background={WinBackground} isVisible={props.isVisible}>
        <View style={[styles.max, styles.center]}>
            <View style={[styles.exitButton]}>
                <TouchableOpacity style={styles.max} onPress={props.onClose} />
            </View>
            <View style={[styles.contentContainer, styles.center]}>
                <View style={[{ width: '100%', height: '70%' }, styles.center]}>
                    <View styles={[{ height: '40%', width: '100%' }, styles.center]}>
                        <CustomText large>FELICITARI!</CustomText>
                    </View>
                    <View styles={[{ height: '20%', width: '100%' }, styles.center]}>
                        <CustomText small>Victorie cu: {props.oponent}</CustomText>
                    </View>
                    <View styles={[{ height: '20%', width: '100%' }, styles.center]}>
                        <CustomText small>L-ai inchis cu: {props.cu}</CustomText>
                    </View>
                    <View styles={[{ height: '20%', width: '100%' }, styles.center]}>
                        <CustomText small>In {props.rounds} runde</CustomText>
                    </View>
                </View>
                <View style={[{ width: '100%', height: '30%' }, styles.center, { flexDirection: 'row' }]}>
                    <View style={[{ width: '50%', height: '100%' }, styles.center]}>
                        <View style={[{ width: '100%', height: '90%' }, styles.center]}>
                            <TouchableOpacity style={[styles.max]} onPress={props.home}>
                                <ImageBackground source={MenuButton} style={[styles.max]} resizeMode='stretch'>
                                    <View style={[styles.max, styles.center]}>
                                        <CustomText normal style={styles.menuPosition}>MENU</CustomText>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[{ width: '50%', height: '100%' }, styles.center]}>
                        <View style={[{ width: '60%', height: '90%' }, styles.center]}>
                            <TouchableOpacity style={[styles.max]} onPress={props.restart}>
                                <Image source={RetryButton} style={[styles.max]} resizeMode='stretch' />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    </ModalTemplate>
);

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    max: {
        width: '100%',
        height: '100%'
    },
    exitButton: {
        width: '18%',
        height: '14%',
        position: 'relative',
        left: '40%',
        bottom: '20%'
    },
    contentContainer: {
        width: '55%',
        height: '36%',
        position: 'relative',
        left: '1%',
        top: '4%'
    },
    menuPosition: {
        position: 'relative',
        bottom: '8%'
    }
});

export default winModal; 