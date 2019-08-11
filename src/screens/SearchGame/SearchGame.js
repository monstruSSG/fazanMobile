import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView, FlatList } from 'react-native';
import { connect } from 'react-redux'

import CONSTANTS from '../../utils/constants';
import * as SOCKET from '../../store/actions/socket'

import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/DefaultInput/DefaultInput'
import OponentDetails from '../../components/OponentDetails/OponentDetails';
import Header from '../../components/Header/HeaderWithInput'

class SearchGameScreen extends Component {

    static navigationOptions = {
        header: null
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
                    <Header />
                </View>
                <View style={styles.oponentList}>
                    <FlatList
                        data={[
                            { key: 'a', name: 'Silviu MSR', points: 12312 },
                            { key: 'b', name: 'Comiati RUPTU', points: 200 },
                            { key: 'c', name: 'Comiati RUPTU', points: 200 },
                            { key: 'd', name: 'Cozloschi', points: 210 },
                            { key: 'e', name: 'Rapperu xxx', points: 21200 },
                            { key: 'f', name: 'Unknown', points: 9200 },
                            { key: 'f', name: 'Unknown', points: 9200 },
                            { key: 'f', name: 'Unknown', points: 9200 }
                        ]}
                        renderItem={({ item }) => <OponentDetails
                            name={item.name}
                            points={item.points}
                        />}
                    />
                </View>
                <View style={styles.playGameButton}>
                    <Button color={CONSTANTS.buttonColor} onPress={this.onPlayGameHandler}>PLAY RANDOM</Button>
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
        flex: 6,
        paddingTop: 16,
        justifyContent: "center",
    },
    oponentDetails: {
        flexDirection: 'row',
        width: '100%'
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