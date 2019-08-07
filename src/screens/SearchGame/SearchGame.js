import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux'

import CONSTANTS from '../../utils/constants';
import * as SOCKET from '../../store/actions/socket'

import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/DefaultInput/DefaultInput'

class SearchGameScreen extends Component {

    static navigationOptions = {
        title: 'Search Game',
        headerStyle: {
            backgroundColor: '#7b5e20'
        },
    }

    navigateMultiplayerScreen = () => this.props.navigation.navigate('Multiplayer');

    onPlayGameHandler = () => {
        this.props.createSocketConnection().then(socket => {
            socket.on('reqConnectedUsers', { name: "Silviu123" })
            socket.on('recConnectedUsers', data => {
                if (data.users.length) this.socket.emit('invitationSent', { socketId: data.users[0] })
            })
            socket.on('invitationReceived', data => {
                socket.emit('invitationAccepted', { socketId: data.socketId })
                this.navigateMultiplayerScreen()
            })
        })
    }

    onExitGameHandler = () => {
        this.socket.disconnect();
    }

    render() {
        return (
            <View style={styles.searchGame}>
                <View style={styles.inputForm}>
                    <Text style={styles.searchTitle}>PLAY WITH</Text>
                    <Input />
                </View>
                <View style={styles.oponentList}>
                    <Text>FIRST OPONENT</Text>
                    <Text>FIRST OPONENT</Text>
                    <Text>FIRST OPONENT</Text>
                </View>
                <View style={styles.playGameButton}>
                    <Button color={CONSTANTS.buttonColor} onPress={this.onPlayGameHandler}>PLAY GAME</Button>
                    <Button color={CONSTANTS.buttonColor} onPress={this.onExitGameHandler}>EXIT GAME</Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    searchGame: {
        flex: 1,
        justifyContent: "center"
    },
    searchTitle: {
        fontWeight: "bold",
        fontSize: 32
    },
    inputForm: {
        flex: 1,
        alignItems: "center"
    },
    oponentList: {
        flex: 2,
        alignItems: "center",
        justifyContent: "center"
    },
    playGameButton: {
        flex: 1,
        justifyContent: "center"
    }
});


const mapStateToProps = state => ({
    socket: state.socket
});

const mapDispatchToProps = dispatch => ({
    createSocketConnection: () => dispatch(SOCKET.createSocketConnection())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchGameScreen);