import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';

import ModalTemplate from './ModalTemplate';
import CustomText from '../UI/Text/Text';

import AboutBackground from '../../assets/Modals/about.png';

const atention = props => (
    <ModalTemplate background={AboutBackground} isVisible={props.isVisible}>
        <View style={[{ width: '55%', height: '55%' }, styles.center]}>
            <View style={[styles.button]}>
                <TouchableOpacity style={[styles.max]} onPress={props.close} />
            </View>
            <ScrollView style={[{ height: '10%', width: '100%' }]}>
                <CustomText normal>
                    ATENTIE !!! {'\n\n'}
                    
                    Daca iesi pierzi meciul...
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

export default atention;