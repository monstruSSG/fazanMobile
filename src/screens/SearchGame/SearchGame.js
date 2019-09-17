import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'

import CONSTANTS from '../../utils/constants';
import * as SOCKET from '../../store/actions/socket'
import { getUsers } from '../../utils/requests';
import Button from '../../components/UI/Button/Button'
import Text from '../../components/UI/Text/Text'
import Input from '../../components/UI/DefaultInput/DefaultInput'
import OponentDetails from '../../components/OponentDetails/OponentDetails';
import Header from '../../components/Header/HeaderWithInput';
import SideDrawer from '../../components/Modals/SideDrawer';
import LoginModal from '../../components/Modals/LoginModal';
import WaitingModal from '../../components/Modals/WaitingModal';
import InvitationModal from '../../components/Modals/InvitationModal';

import BackgroundImg from '../../assets/Stuff/bg.jpg';
import PlayButton from '../../assets/Buttons/greenLabel.png';

class SearchGameScreen extends Component {

    static navigationOptions = {
        header: null
    }

    state = {
        users: [],
        sideState: false,
        showLogin: true,
        waitingModal: false,
        invitationModal: false
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
                {this.state.showLogin && false && <LoginModal exitGame={() => this.setState({ showLogin: false })} />}
                <View style={styles.searchGame}>

                    <View style={styles.inputForm}>
                        <Header
                            setSideDrawer={() => this.setSideDrawerStateHandler(true)}
                        />
                    </View>
                    <View style={styles.oponentList}>
                        <FlatList
                            data={this.state.users.map(user => {
                                return ({ ...user, key: user._id || 'asdasd' })
                            })}
                            renderItem={({ item }) => <OponentDetails
                                name={item.username || 'xulescu'}
                                points={item.score || 123}
                            />}
                        />
                    </View>
                    <View style={styles.playGameButton}>
                        <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', width: '80%'}}>
                            <ImageBackground source={PlayButton} style={{width: '100%', height: '90%' ,position: 'relative', top: '8%'}} resizeMode="stretch">
                                <Text color="white" normal style={{ fontFamily: 'Troika', textAlign: 'center', paddingTop: '3%' }}>
                                    PLAY RANDOM
                                </Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                    <SideDrawer isVisible={this.state.sideState} closeSideDrawer={this.closeSideDrawerHandler} />
                    <WaitingModal onClose={() => this.setState({ waitingModal: false })} isVisible={this.state.waitingModal} />
                    <InvitationModal onClose={() => this.setState({ invitationModal: false })} isVisible={this.state.invitationModal} />
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
        justifyContent: "center",
        alignItems: 'center'
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