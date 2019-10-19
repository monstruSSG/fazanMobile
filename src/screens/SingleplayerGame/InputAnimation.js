import React, { Component } from 'react';
import { Animated } from 'react-native';

import CustomText from '../../components/UI/Text/Text';

export default class OponentMovingDots extends Component {
    state = {
        animation:  new Animated.Value(1)
    }

    loadingAnimation = () => Animated.loop(
        Animated.sequence([
            Animated.timing(this.state.animation, {
                toValue: 0.4,
                duration: 500,
                useNativeDriver: true
            }),
            Animated.timing(this.state.animation, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            })
        ])
    ).start();

    render() {
        this.loadingAnimation()
        return (
            <Animated.View style={{opacity: this.state.animation}}><CustomText style={{fontSize: 26}}>_</CustomText></Animated.View>
        );
    }
}