import React, { Component } from 'react';
import { View, StyleSheet, FlatList, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'

import * as SOCKET from '../../store/actions/socket'
import { getUsers } from '../../utils/requests';
import OponentDetails from '../../components/OponentDetails/OponentDetails';
import Header from '../../components/Header/HeaderWithInput';
import SideDrawer from '../../components/Modals/SideDrawer';
import LoginModal from '../../components/Modals/LoginModal';
import RankingModal from '../../components/Modals/RankingModal';

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
        showClasament: false,
        showRanking: false
    }

    socket = null

    componentDidMount() {
        getUsers().then(users => this.setState({ users }))
    }

    createSocketConnection(token) {
        this.props.createSocketConnection(token).then(socket => {
            this.socket = socket
        })
    }

    navigateMultiplayerScreen = () => this.props.navigation.navigate('Multiplayer');
    navigateHomeScreen = () => this.props.navigation.navigate('Home');
    navigateProfileScreen = () => this.props.navigation.navigate('Profile');

    onPlayGameHandler = () => {
        this.socket.emit('reqConnectedUsers', {})

        this.socket.on('recConnectedUsers', data => {
            if (data.users.length) socket.emit('invitationSent', { socketId: data.users[0] })
        })

        this.socket.on('invitationReceived', data => {
            this.props.setOponentSocketId(data.socketId);
            socket.emit('invitationAccepted', { socketId: data.socketId });
            this.navigateMultiplayerScreen();
        });

        this.socket.on('startGame', data => {
            this.props.setOponentSocketId(data.socketId)
            this.navigateMultiplayerScreen();
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
                {this.state.showLogin && true && <LoginModal onLogin={token => this.createSocketConnection(token)} exitGame={() => this.setState({ showLogin: false })} />}
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
                        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', width: '80%' }} onPress={this.onPlayGameHandler}>
                            <ImageBackground source={PlayButton} style={{ width: '100%', height: '90%', position: 'relative', top: '8%' }} resizeMode="stretch">
                                <Text style={{ color: "white", fontFamily: 'Troika', fontSize: 22, textAlign: 'center', paddingTop: '2%' }}>
                                    PLAY RANDOM
                                </Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                    <SideDrawer
                        goToClasament={() => this.setState({ sideState: false, showRanking: true })}
                        goToHome={() => this.setState({ sideState: false }, this.navigateHomeScreen)}
                        goToProfile={() => this.setState({ sideState: false }, this.navigateProfileScreen)}
                        isVisible={this.state.sideState}
                        onClose={this.closeSideDrawerHandler} />
                </View>
                <RankingModal
                    isVisible={this.state.showRanking}
                    users={this.state.users}
                    close={() => this.setState({ showRanking: false })} />
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
    socket: state.socket,
    token: state.user.token
});

const mapDispatchToProps = dispatch => ({
    createSocketConnection: token => dispatch(SOCKET.createSocketConnection(token)),
    setOponentSocketId: socketId => dispatch(SOCKET.setOponentSocketId(socketId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchGameScreen);