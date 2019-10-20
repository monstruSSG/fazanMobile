import React, { Component } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

import CustomText from '../../components/UI/Text/Text';

export default class OponentMovingDots extends Component {
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
        if (prevProps.isVisible != this.props.isVisible && this.props.isVisible === true) {
            this.loadingAnimation();
        }
    }

    render() {
        return (
            <View style={[styles.content]}>
                <View><CustomText>{this.props.message}</CustomText></View>
                <Animated.View style={{opacity: this.state.first}}><CustomText>.</CustomText></Animated.View>
                <Animated.View style={{opacity: this.state.secound}}><CustomText>.</CustomText></Animated.View>
                <Animated.View style={{opacity: this.state.third}}><CustomText>.</CustomText></Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    }
});