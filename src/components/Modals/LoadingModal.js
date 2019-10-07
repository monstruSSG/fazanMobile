import React, { Component } from 'react';
import { Image, StyleSheet, Modal, View, Animated } from 'react-native';

import CustomText from '../UI/Text/Text';

import EmptyStar from '../../assets/Stuff/emptyStar.png';

class LoadingModal extends Component {
    spinValue = new Animated.Value(0);

    componentDidMount() {
        Animated.loop(
            Animated.timing(this.spinValue, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true
            })
        ).start();
    }

    render() {
        const spinStyle = {
            transform: [
                {
                    rotate: this.spinValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg']
                    })
                }
            ]
        };

        return (
            <Modal visible={this.props.isVisible} onRequestClose={this.props.onClose} animationType={this.props.modalAnimation ? this.props.modalAnimation : 'slide'} transparent>
                <View style={[styles.max, styles.center, styles.container]}>
                    <Animated.View style={[{ width: '50%', height: '30%' }, spinStyle]}>
                        <Image source={EmptyStar} resizeMode='contain' style={styles.max} />
                    </Animated.View>
                </View>
            </Modal >
        );
    }
}

const styles = StyleSheet.create({
    max: {
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

export default LoadingModal;