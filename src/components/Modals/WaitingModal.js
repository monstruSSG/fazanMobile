import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground, Animated } from 'react-native';

import ModalTemplate from './ModalTemplate';
import CustomText from '../../components/UI/Text/Text';

import Bg from '../../assets/Modals/waitModal.png';
import RedButton from '../../assets/Buttons/redbutton.png';

class WaitingModal extends Component {
    state = {
        first: new Animated.Value(0),
        secound: new Animated.Value(0),
        third: new Animated.Value(0)
    }

    loadingAnimation = () => Animated.loop(
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
    ).start();

    componentDidMount() {
        this.loadingAnimation()
    }

    componentDidUpdate(prevProps) {
        if(prevProps.isVisible != this.props.isVisible && this.props.isVisible === true) {
            this.loadingAnimation();
        }
    }

    render() {
        return (
            <ModalTemplate background={Bg} isVisible={this.props.isVisible}>
                <View style={[styles.content]}>
                    <View style={styles.exitButton}>
                        <TouchableOpacity style={styles.exitButtonPressArea} onPress={this.props.onClose} />
                    </View>
                    <View style={[styles.animationContent]}>
                        <CustomText normal>Asteapta</CustomText>
                        <View style={[styles.center, { width: '80%', height: '20%', flexDirection: 'row' }]}>
                            <Animated.View style={{opacity: this.state.first}}><CustomText large>.</CustomText></Animated.View>
                            <Animated.View style={{opacity: this.state.secound}}><CustomText large>.</CustomText></Animated.View>
                            <Animated.View style={{opacity: this.state.third}}><CustomText large>.</CustomText></Animated.View>
                        </View>
                    </View>
                    <View style={styles.giveUpButton}>
                        <TouchableOpacity style={[styles.max, styles.center]} onPress={this.props.onClose}>
                            <ImageBackground source={RedButton} style={[styles.max, styles.center]} resizeMode='contain'>
                                <CustomText style={styles.redButtonText}>RENUNTA</CustomText>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                </View>
            </ModalTemplate>
        );
    }
}

const styles = StyleSheet.create({
    redButtonText: {
        position: 'relative',
        bottom: '5%'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    max: {
        width: '100%',
        height: '100%'
    },
    giveUpButton: {
        position: 'relative',
        top: '32%',
        width: '50%',
        height: '15%'
    },
    animationContent: {
        position: 'relative',
        top: '20%',
        height: '28%',
        width: '33%',
        alignItems: 'center',
        justifyContent: 'center'
    },
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
})

export default WaitingModal; 