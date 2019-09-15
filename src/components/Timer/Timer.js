import React, { Component } from 'react';
import { StyleSheet, Animated } from 'react-native';

import CustomText from '../../components/UI/Text/Text';

let SCALE_VALUE = 1.25;

export default class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            count: this.props.count,
            animation: new Animated.Value(1)
        }
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            this.animation()
            this.setState(
                prevState => ({
                    count: prevState.count - 1
                }), () => this.props.onTimeExpired(this.state.count)
            )
        }, 1000);
    }

    componentWillUnmount() {
        clearImmediate(this.myInterval);
        SCALE_VALUE = 1.25;
    }

    animation = () => {
        Animated.timing(this.state.animation, {
            toValue: SCALE_VALUE,
            duration: 500,
            useNativeDriver: true
        }).start(() => Animated.timing(this.state.animation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start())
    }

    render() {
        const { count } = this.state;

        const timerAnimationStyle = {
            transform: [
                {
                    scale: this.state.animation
                }
            ]
        }

        if (count <= 6) SCALE_VALUE = 2;

        return (
            <Animated.View style={[this.props.style, timerAnimationStyle]}>
                <CustomText normal color={count <= 5 ? 'red' : undefined}>{count}</CustomText>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
});