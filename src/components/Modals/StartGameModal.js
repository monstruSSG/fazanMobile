import React, { Component } from 'react';
import { StyleSheet, View, Animated } from 'react-native';

import CustomText from '../UI/Text/Text';

let SCALE_VALUE = 1.25;

class StartGameModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            count: this.props.count
        };

        this.animation = new Animated.Value(1);
    }

    componentDidMount() {
        this.makeAnimation();
        this.interval = setInterval(() => {
            this.makeAnimation();
            this.setState(
                prevState => ({
                    count: prevState.count - 1
                }), () => this.props.onTimeExpired(this.state.count)
            )
        }, 300);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        SCALE_VALUE = 1.25;
    }

    makeAnimation = () => {
        Animated.timing(this.animation, {
            toValue: SCALE_VALUE,
            duration: 150,
            useNativeDriver: true
        }).start(() => Animated.timing(this.animation, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true
        }).start())
    }

    render() {
        const { count } = this.state;

        const timerAnimationStyle = {
            transform: [
                {
                    scale: this.animation
                }
            ]
        }

        return (
            <View style={[styles.max, styles.center]}>
                <Animated.View style={[styles.max, styles.center, styles.container, timerAnimationStyle]}>
                    <CustomText giant>{count}</CustomText>
                </Animated.View>
            </View>
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

export default StartGameModal;