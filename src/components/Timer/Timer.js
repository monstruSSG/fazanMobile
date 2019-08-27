import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

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
    }

    animation = () => {
        Animated.timing(this.state.animation, {
            toValue: 2,
            duration: 500
        }).start(() => Animated.timing(this.state.animation, {
            toValue: 1,
            duration: 500,

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

        const counterStyle = { ...styles.counter }

        if(count <= 5) counterStyle.color = 'red';

        return (
            <Animated.View style={[styles.counterContainer, timerAnimationStyle]}>
                <Text style={counterStyle}>{count}</Text>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    counterContainer: {
        padding: 10
    },
    counter: {
        fontSize: 30,
        fontWeight: 'bold'
    }
});