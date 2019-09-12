import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView, FlatList, ImageBackground, Text } from 'react-native';
import { connect } from 'react-redux'

import CONSTANTS from '../../utils/constants';
import * as SOCKET from '../../store/actions/socket'
import { getUsers } from '../../utils/requests';
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/DefaultInput/DefaultInput'
import OponentDetails from '../../components/OponentDetails/OponentDetails';
import Header from '../../components/Header/HeaderWithInput';
import SideDrawer from '../../components/Modals/SideDrawer';
import LoginModal from '../../components/Modals/LoginModal';

import BackgroundImg from '../../assets/back.png';
class SearchGameScreen extends Component {

    static navigationOptions = {
        header: null
    }

    state = {
        users: [],
        sideState: false,
        showLogin: true
    }

    componentDidMount() {
        getUsers().then(users => this.setState({ users }))
    }

    navigateMultiplayerScreen = () => this.props.navigation.navigate('Multiplayer');

    onPlayGameHandler = () => {
        this.props.createSocketConnection().then(socket => {
            socket.emit('reqConnectedUsers', { name: "Bogdan113" })

            socket.on('recConnectedUsers', data => {
                if (data.users.length) socket.emit('invitationSent', { socketId: data.users[0] })
            })

            socket.on('invitationReceived', data => {
                this.props.setOponentSocketId(data.socketId);
                socket.emit('invitationAccepted', { socketId: data.socketId });
                this.navigateMultiplayerScreen();
            });

            socket.on('startGame', data => {
                this.props.setOponentSocketId(data.socketId)
                this.navigateMultiplayerScreen();
            })
        })
    }

    onExitGameHandler = () => {
        this.socket.disconnect();
    }

    setSideDrawerStateHandler = state => this.setState({ sideState: state })
    closeSideDrawerHandler = () => {
        this.setState({ sideState: false }, () => console.log(this.state.sideState))
    }

    render() {
        return (
            <ImageBackground source={BackgroundImg} style={{ width: '100%', height: '100%' }}>
                {this.state.showLogin && <LoginModal exitGame={() => this.setState({ showLogin: false })} />}
                <View style={styles.searchGame}>

                    <View style={styles.inputForm}>
                        <Header
                            setSideDrawer={() => this.setSideDrawerStateHandler(true)}
                        />
                    </View>
                    <View style={styles.oponentList}>
                        <FlatList
                            data={this.state.users.map(user => ({ ...user, key: user._id || 'asdasd' }))}
                            renderItem={({ item }) => <OponentDetails
                                name={item.username || 'xulescu'}
                                points={item.score || 123}
                            />}
                        />
                    </View>
                    <View style={styles.playGameButton}>
                        <Button color={CONSTANTS.secondaryColor} onPress={this.onPlayGameHandler}>
                            <Text style={{ color: "azure", fontWeight: 'bold' }}>
                                PLAY RANDOM
                            </Text>
                        </Button>
                    </View>
                    <SideDrawer isVisible={this.state.sideState} closeSideDrawer={this.closeSideDrawerHandler} />
                </View>
            </ImageBackground>

        );
    }
}

const styles = StyleSheet.create({
    searchGame: {
        flex: 1,
        justifyContent: "center"
    },
    sidedrawerContainer: {
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
    createSocketConnection: () => dispatch(SOCKET.createSocketConnection()),
    setOponentSocketId: socketId => dispatch(SOCKET.setOponentSocketId(socketId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchGameScreen);