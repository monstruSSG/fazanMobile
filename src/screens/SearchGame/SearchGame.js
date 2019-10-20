import React, { Component } from 'react';
import { Platform, BackHandler, View, StyleSheet, FlatList, ImageBackground, Image, TouchableOpacity, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import { LoginManager } from 'react-native-fbsdk';

import * as SOCKET from '../../store/actions/socket';
import * as USER from '../../store/actions/user';
import { getUsers, getMe } from '../../utils/requests';
import OponentDetails from '../../components/OponentDetails/OponentDetails';
import Header from '../../components/Header/HeaderWithInput';
import SideDrawer from '../../components/Modals/SideDrawer';
import RankingModal from '../../components/Modals/RankingModal';
import LoadingModal from '../../components/Modals/LoadingModal';
import WaitingModal from '../../components/Modals/WaitingModal';
import CustomText from '../../components/UI/Text/Text';

import BackgroundImg from '../../assets/Stuff/bg.jpg';
import PlayButton from '../../assets/Buttons/greenLabel.png';

class SearchGameScreen extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);

        if (Platform.OS === 'android') this.didFocus = props.navigation.addListener("didFocus", () =>
            BackHandler.addEventListener("hardwareBackPress", this.onBack),
        );
    }

    state = {
        users: [],
        sideState: false,
        logged: false,
        showClasament: false,
        showRanking: false,
        loading: true,
        user: null,
        showPlayButton: true,
        showWaitingModal: false
    }

    from = 0;
    limit = 10;
    usersCount = 40;
    socket = null;
    search = ''

    componentDidMount() {
        //For overriding default backButton behaviour
        if (Platform.OS === 'android') this.willBlur = this.props.navigation.addListener("willBlur", () =>
            BackHandler.removeEventListener("hardwareBackPress", this.onBack),
        );

        //For playbutton
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this._keyboardDidShow,
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this._keyboardDidHide,
        );

        this.getUsersHandler();
        getMe(this.props.token)
            .then(user => this.setState({ user: user.user, loading: false }, () => console.log(this.state.user)));
    }

    _keyboardDidShow = () => this.setState({ showPlayButton: false })

    _keyboardDidHide = () => this.setState({ showPlayButton: true })

    componentWillUnmount() {
        this.props.socket.emit('disconnectedFromMultiplayer', {});
        if (Platform.OS === 'android') {
            this.didFocus.remove();
            this.willBlur.remove();
            BackHandler.removeEventListener("hardwareBackPress", this.onBack);
        }

        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    onBack = () => this.navigateHomeScreen();

    getUsersHandler = () => getUsers(this.props.token, this.from, this.limit, this.search)
        .then(result => this.setState({
            users: result.map(user => ({
                username: user.shortName,
                score: user.score,
                picture: user.pictureUrl,
                _id: user._id
            }))
        }, () => console.log(result)))

    navigateMultiplayerScreen = () => this.props.navigation.navigate('Multiplayer');
    navigateHomeScreen = () => this.props.navigation.navigate('Home');
    navigateProfileScreen = () => this.props.navigation.navigate('Profile');

    onPlayGameHandler = () => {
        this.setState({ showWaitingModal: true })

        this.props.socket.emit('playRandom');

        this.props.socket.on('startGame', data => {
            this.props.setOponentName(data.oponentName);
            this.setState({ showWaitingModal: false });
            this.props.setOponentSocketId(data.socketId);
            this.navigateMultiplayerScreen();
        })
    }

    onExitGameHandler = () => {
        this.props.socket.disconnect();
    }

    setSideDrawerStateHandler = state => this.setState({ sideState: state })
    closeSideDrawerHandler = () => {
        this.setState({ sideState: false });
    }

    onChangeText = text => {
        this.search = text;
        this.from = 0;
        this.getUsersHandler();
    }

    render() {
        return (
            <ImageBackground source={BackgroundImg} style={{ width: '100%', height: '100%' }}>
                {!this.state.loading ?
                    (
                        <>
                            <View style={styles.searchGame}>

                                <View style={styles.inputForm}>
                                    <Header
                                        setSideDrawer={() => this.setSideDrawerStateHandler(true)}
                                        onChangeText={this.onChangeText}
                                    />
                                </View>
                                <View style={styles.oponentList}>
                                    {this.state.users.length > 0 ? <FlatList
                                        data={this.state.users.map(user => {
                                            return ({ ...user, key: user._id || 'asdasd' })
                                        })}
                                        renderItem={({ item }) => <OponentDetails
                                            name={item.username || 'xulescu'}
                                            points={item.score || 123}
                                            picture={item.picture || false}
                                        />}
                                        onEndReached={() => {
                                            this.limit += 10;
                                            if (this.limit <= this.usersCount) this.getUsersHandler();
                                        }}
                                    /> : <CustomText large style={{ textAlign: 'center' }}>Nu sunt {'\n'} useri {'\n'} conectati</CustomText>}
                                </View>
                                {this.state.showPlayButton ?
                                    <View style={[styles.playGameButton, styles.center]}>
                                        <TouchableOpacity style={[{ width: '80%' }, styles.center]} onPress={this.onPlayGameHandler}>
                                            <ImageBackground source={PlayButton} style={[{ width: '80%', height: '100%' }, styles.center]} resizeMode="stretch">
                                                <CustomText style={styles.playButtonPosition} large>JOACA</CustomText>
                                            </ImageBackground>
                                        </TouchableOpacity>
                                    </View> : null}
                                <SideDrawer
                                    pictureUrl={this.state.user.pictureUrl}
                                    username={this.state.user.shortName}
                                    goToClasament={() => this.setState({ sideState: false, showRanking: true })}
                                    goToHome={() => this.setState({ sideState: false }, this.navigateHomeScreen)}
                                    goToProfile={() => this.setState({ sideState: false }, this.navigateProfileScreen)}
                                    onLogout={() => AsyncStorage.removeItem('token').then(() => {
                                        this.props.deleteToken();
                                        this.navigateHomeScreen();
                                        LoginManager.logOut();
                                    })}
                                    isVisible={this.state.sideState}
                                    onClose={this.closeSideDrawerHandler} />
                            </View>
                            <RankingModal
                                isVisible={this.state.showRanking}
                                users={this.state.users}
                                close={() => this.setState({ showRanking: false })} />
                            <WaitingModal isVisible={this.state.showWaitingModal}
                                onClose={() => this.setState({ showWaitingModal: false })} />
                        </>
                    ) : null}
                <LoadingModal isVisible={this.state.loading} />
            </ImageBackground>

        );
    }
}

const styles = StyleSheet.create({
    max: {
        width: '100%',
        height: '100%'
    },
    playButtonPosition: {
        position: 'relative',
        bottom: '8%'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
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
        justifyContent: "center"
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
    socket: state.socket.socket,
    token: state.user.token
});

const mapDispatchToProps = dispatch => ({
    setOponentSocketId: socketId => dispatch(SOCKET.setOponentSocketId(socketId)),
    deleteToken: () => dispatch(USER.deleteToken()),
    setOponentName: name => dispatch(USER.setOponentName(name))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withNavigation(SearchGameScreen));