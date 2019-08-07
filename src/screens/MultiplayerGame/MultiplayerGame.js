import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux'

import * as SOCKET from '../../store/actions/socket'
import Button from '../../components/UI/Button/Button'

class MultiplayerGameScreen extends Component {

    componentDidMount() {
        this.props.socket.socket.on('startGame', data => {
            console.log("GAME START", data)
        })
    }

    navigateSearchGame = () => this.props.navigation.navigate('SearchGame');

    exitGame = () => {
        this.props.closeSocketConnection().then(() => {
            console.log(this.props.socket.socket)
            this.navigateSearchGame()
        });
    }

    render() {
        return (
            <View>
                < Text>MULTIPLAYER GAME</Text>
                <Button onPress={this.exitGame}>EXIT GAME</Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => ({
    socket: state.socket
});

const mapDispatchToProps = dispatch => ({
    closeSocketConnection: () => dispatch(SOCKET.closeSocketConnection())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MultiplayerGameScreen);
