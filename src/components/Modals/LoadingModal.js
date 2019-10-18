import React, { Component } from 'react';
import { Image, StyleSheet, Modal, View, Animated } from 'react-native';

import CustomText from '../UI/Text/Text';

class LoadingModal extends Component {
    state = {
        first: new Animated.Value(0),
        secound: new Animated.Value(0),
        third: new Animated.Value(0)
    }

    componentDidMount() {
        Animated.loop(
            Animated.sequence([
                Animated.timing(this.state.first, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true
                }),
                Animated.timing(this.state.secound, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true
                }),
                Animated.timing(this.state.third, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true
                }),
                Animated.parallel([
                    Animated.timing(this.state.third, {
                        toValue: 0,
                        duration: 100,
                        useNativeDriver: true
                    }),
                    Animated.timing(this.state.secound, {
                        toValue: 0,
                        duration: 100,
                        useNativeDriver: true
                    }),
                    Animated.timing(this.state.first, {
                        toValue: 0,
                        duration: 100,
                        useNativeDriver: true
                    })
                ])
            ])
        ).start(() => console.log('IN ANIMATION'));
    }

    render() {
        return (
            <Modal visible={this.props.isVisible} onRequestClose={this.props.onClose} animationType={this.props.modalAnimation ? this.props.modalAnimation : 'slide'} transparent>
                <View style={[styles.max, styles.center, styles.container]}>
                    <View style={[{ width: '80%', height: '15%', alignItems: 'center' }]}>
                        <View style={[{ height: '50%', width: '100%' }, { alignItems: 'center', justifyContent: 'flex-end' }]}>
                            <CustomText large>IN ASTEPTARE</CustomText>
                        </View>
                        <Animated.View style={[{ height: '20%', width: '100%' }, { alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }]}>
                            <Animated.View style={{ opacity: this.state.first }}><CustomText giant>.</CustomText></Animated.View>
                            <Animated.View style={{ opacity: this.state.secound }}><CustomText giant>.</CustomText></Animated.View>
                            <Animated.View style={{ opacity: this.state.third }}><CustomText giant>.</CustomText></Animated.View>
                        </Animated.View>
                    </View>
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