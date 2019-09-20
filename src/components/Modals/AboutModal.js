import React from 'react';
import { ImageBackground, StyleSheet, Modal, View, ScrollView, TouchableOpacity } from 'react-native';

import CustomText from '../UI/Text/Text';

import AboutBackground from '../../assets/Modals/about.png';

const about = props => (
    <Modal visible={props.isVisible} onRequestClose={props.onClose} animationType='slide' transparent>
        <View style={[styles.max, styles.center, styles.container]}>
            <ImageBackground source={AboutBackground} style={[styles.imageSize, styles.center]} resizeMode='stretch'>
                <View style={[{ width: '55%', height: '55%' }, styles.center]}>
                    <View style={[styles.button]}>
                        <TouchableOpacity style={[styles.max]} onPress={props.close} />
                    </View>
                    <ScrollView style={[{ height: '10%', width: '100%' }]}>
                        <CustomText normal>
                            Fazanul este un joc de cuvinte al copilariei, descirere ...
                        </CustomText>
                    </ScrollView>
                </View>
            </ImageBackground>
        </View>
    </Modal>
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