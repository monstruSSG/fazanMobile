import React from 'react';
import { ImageBackground, StyleSheet, Modal, View } from 'react-native';

const modalTemplate = props => (
    <Modal visible={props.isVisible} onRequestClose={props.onClose} animationType={props.modalAnimation ? props.modalAnimation: 'slide'} transparent>
        <View style={[styles.max, styles.center, styles.container]}>
            <ImageBackground source={props.background} style={[styles.imageSize, styles.center, props.size]} resizeMode='stretch'>
                {props.children}
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
    }
});

export default modalTemplate;