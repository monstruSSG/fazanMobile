import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import ModalTemplate from './ModalTemplate';

import Bg from '../../assets/Modals/noInternet.png';

export default props => (
    <ModalTemplate background={Bg} isVisible={props.isVisible}>
        <View style={[styles.content]}>
            <View style={styles.exitButton}>
                <TouchableOpacity style={styles.exitButtonPressArea} onPress={props.onClose} />
            </View>
        </View>
    </ModalTemplate>
);

const styles = StyleSheet.create({
    exitButtonPressArea: {
        width: '20%',
        height: '100%'
    },
    exitButton: {
        width: '100%',
        height: '22%',
        alignItems: 'flex-end'
    },
    content: {
        width: '90%',
        height: '70%',
        alignItems: 'center'
    }
});