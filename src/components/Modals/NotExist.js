import React from 'react';
import { StyleSheet, View } from 'react-native';

import ModalTemplate from './ModalTemplate';
import CustomText from '../UI/Text/Text';

import NotExistsBackground from '../../assets/Modals/notExists.png';

export default props => (
    <ModalTemplate isVisible={props.isVisible}
        onRequestClose={props.onClise}
        background={NotExistsBackground}
        size={styles.modal}>
        <View style={styles.max}>
            <View style={[styles.header]}>
                <CustomText color='white' small>NU EXISTA</CustomText>
            </View>
            <View style={[styles.word]}>
                <CustomText color='white' large>{props.word}</CustomText>
            </View>
        </View>
    </ModalTemplate>
);

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    word: {
        width: '100%',
        height: '10%',
        alignItems: 'center'
    },
    modal: {
        width: '100%',
        height: '85%'
    },
    max: {
        width: '54%',
        height: '20%',
        position: 'relative',
        top: '15%'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});