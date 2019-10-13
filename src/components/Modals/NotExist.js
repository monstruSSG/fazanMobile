import React from 'react';
import { StyleSheet, View } from 'react-native';

import ModalTemplate from './ModalTemplate';
import CustomText from '../UI/Text/Text';

import NoLeafBackground from '../../assets/Modals/noLeaf.png';

const notExists = props => (
    <ModalTemplate isVisible={props.isVisible}
        onRequestClose={props.onClise}
        background={NoLeafBackground}
        size={{ width: '80%', height: '40%' }}>
        <View style={{alignItems: 'center', position: 'relative', top: '20%'}}>
        <CustomText normal>Cuvant inexistent!</CustomText>
        </View>
        <View style={[styles.max, styles.center]}>
            <CustomText normal>Cuvantul</CustomText>
            <CustomText large>{props.word}</CustomText>
            <CustomText normal>nu exista!</CustomText>
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