import React from 'react';
import { ImageBackground, StyleSheet, Modal, View, ScrollView, TouchableOpacity } from 'react-native';

import ModalTemplate from './ModalTemplate';
import CustomText from '../UI/Text/Text';

import AboutBackground from '../../assets/Modals/about.png';

const about = props => (
    <ModalTemplate background={AboutBackground} isVisible={props.isVisible} onClose={props.onClose}>
        <View style={[{ width: '55%', height: '55%' }, styles.center]}>
            <View style={[styles.button]}>
                <TouchableOpacity style={[styles.max]} onPress={props.onClose} />
            </View>
            <ScrollView style={[{ height: '10%', width: '100%' }]}>
                <CustomText normal style={{textAlign: 'center'}}>
                    HERE WILL BE SUDOKU DESCRIPTION
                </CustomText>
            </ScrollView>
        </View>
    </ModalTemplate>
);

const styles = StyleSheet.create({
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
        height: '20%',
        width: '30%',
        position: 'relative',
        left: '67%',
        bottom: '8%'
    }
});

export default about;