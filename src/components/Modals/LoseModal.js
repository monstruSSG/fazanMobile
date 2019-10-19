import React from 'react';
import { View, Modal, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';

import TemplateModal from './ModalTemplate';
import CustomText from '../UI/Text/Text';

import LoseBackground from '../../assets/Modals/lose.png';
import RetryButton from '../../assets/Buttons/retry.png';
import MenuButton from '../../assets/Buttons/yellowHolder.png';

const loseModal = props => (
    <TemplateModal isVisible={props.isVisible} onClose={props.onClose} background={LoseBackground}>
        <View style={[styles.max, styles.center]}>
            <View style={[styles.exitButton]}>
            <TouchableOpacity style={styles.max} onPress={props.onClose} />
        </View>
        <View style={[styles.contentContainer, styles.center]}>
            <View style={[{ width: '100%', height: '70%' }, styles.center]}>
                <View styles={[{ height: '40%', width: '100%' }, styles.center]}>
                    <CustomText large>INFRANT!</CustomText>
                </View>
                <View styles={[{ height: '20%', width: '100%' }, styles.center]}>
                    <CustomText small>Batut de: {props.oponent}</CustomText>
                </View>
                <View styles={[{ height: '20%', width: '100%' }, styles.center]}>
                    <CustomText small>Inchis cu: {props.cu}</CustomText>
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
                                    <CustomText normal style={styles.menuPosition}>{props.to}</CustomText>
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
    </TemplateModal >
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
        bottom: '10%'
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

export default loseModal; 