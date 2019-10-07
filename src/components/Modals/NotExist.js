import React from 'react';
import { StyleSheet, View } from 'react-native';

import ModalTemplate from './ModalTemplate';
import CustomText from '../UI/Text/Text';

import NoLeafBackground from '../../assets/Modals/noLeaf.png';

const notExists = props => (
    <ModalTemplate isVisible={props.isVisible} 
        onRequestClose={props.onClise} 
        background={NoLeafBackground} 
        size={{width: '80%', height: '40%'}}>
        <View style={[styles.max, styles.center]}>
            <CustomText small>NU EXISTA:<CustomText large>{props.word}</CustomText></CustomText>
        </View>
    </ModalTemplate>
);

const styles = StyleSheet.create({
    max: {
        width: '100%',
        height: '100%'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default notExists;