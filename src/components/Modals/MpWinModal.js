import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';

import ModalTemplate from '../../components/Modals/ModalTemplate';
import CustomText from '../UI/Text/Text';

import WinBackground from '../../assets/Modals/win.png';
import MenuButton from '../../assets/Buttons/yellowHolder.png';

const mpWinModal = props => (
    <ModalTemplate background={WinBackground} isVisible={props.isVisible} onClose={props.onClose}>
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
                        <CustomText style={{ textAlign: 'center' }} small>Victorie cu:{'\n'}
                            <CustomText style={{ textAlign: 'center' }} color='white' small>{props.oponent}</CustomText>
                        </CustomText>
                    </View>
                    <View styles={[{ height: '20%', width: '100%' }, styles.center]}>
                        <CustomText style={{ textAlign: 'center' }} small>L-ai inchis cu:{'\n'}
                            <CustomText style={{ textAlign: 'center' }} color='white' small>{props.cu}</CustomText>
                        </CustomText>
                    </View>
                    <View styles={[{ height: '20%', width: '100%' }, styles.center]}>
                        <CustomText style={{ textAlign: 'center' }} small>In <CustomText style={{ textAlign: 'center' }} color='white' small>{props.rounds}</CustomText> {'\n'} runde</CustomText>
                    </View>
                </View>
                <View style={[{ width: '100%', height: '30%', justifyContent: 'center' }, { flexDirection: 'row' }]}>
                    <TouchableOpacity style={[{width: '60%', height: '100%'}, styles.searchPosition]} onPress={props.home}>
                        <ImageBackground source={MenuButton} style={[styles.max]} resizeMode='stretch'>
                            <View style={[styles.max, styles.center]}>
                                <CustomText normal style={styles.menuPosition}>{props.to}</CustomText>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </ModalTemplate>
);

const styles = StyleSheet.create({
    searchPosition: {
        position: 'relative',
        top: '14%'
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

export default mpWinModal; 