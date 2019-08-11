import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            count: this.props.count
        }
    }

    componentDidMount() {
        this.myInterval = setInterval(() =>
            this.setState(
                prevState => ({
                    count: prevState.count - 1
                }), () => this.props.onTimeExpired(this.state.count)
            ), 1000);
    }

    componentWillUnmount() {
        clearImmediate(this.myInterval);
    }

    render() {
        const { count } = this.state;

        return (
            <View>
                <Text>{count}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});