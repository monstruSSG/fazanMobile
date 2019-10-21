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
                <View style={[{ width: '100%', height: '70%', justifyContent:'flex-end' }]}>
                    <View styles={[{ height: '50%', width: '100%' }, styles.center]}>
                        <CustomText style={{ textAlign: 'center' }} small>Batut de:{'\n'}
                            <CustomText color='white' large>{props.oponent}</CustomText>
                        </CustomText>
                    </View>
                    <View styles={[{ height: '50%', width: '100%' }, styles.center]}>
                        <CustomText style={{ textAlign: 'center' }} small>alternativa:{'\n'}
                            <CustomText color='white' large>{props.suggestion}</CustomText>
                        </CustomText>
                    </View>
                </View>
                <View style={[{ width: '100%', height: '30%' }, styles.center, { flexDirection: 'row' }]}>
                        <TouchableOpacity style={[{width: '70%', height: '100%'}, styles.searchPosition]} onPress={props.home}>
                            <ImageBackground source={MenuButton} style={[styles.max]} resizeMode='stretch'>
                                <View style={[styles.max, styles.center]}>
                                    <CustomText normal style={styles.menuPosition}>{props.to}</CustomText>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                </View>
            </View>
        </View>
    </TemplateModal >
);

const styles = StyleSheet.create({
    searchPosition: {
        position: 'relative',
        top: '18%'
    },
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