import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";

import CustomText from '../../components/UI/Text/Text';
import AboutModal from '../../components/Modals/AboutModal';
import { saveToken } from '../../store/actions/user';
import * as SOCKET from '../../store/actions/socket';
import { isLogged } from '../../utils/requests';

import BackgroundImg from '../../assets/Stuff/bg.jpg';
import AboutButton from '../../assets/Buttons/about.png';
import ProfileButton from '../../assets/Buttons/locked.png';
import Crown from '../../assets/Stuff/1st.png';
import SinglePlayerTitle from '../../assets/Modals/titleShadow.png';
import MultiplayerTitle from '../../assets/Stuff/titleBox.png';
import NoInternet from '../../components/Modals/NoInternetModal'
import CONSTANTS from '../../utils/constants';
import ToturialModal from '../../components/Modals/ToturialModal'

const logoTextSize = Math.floor(CONSTANTS.screenWidth / 4);

class HomeScreen extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        showAbout: false,
        logged: false,
        showNoInternet: false,
        isConnected: false,
        oponent: null,
        showInvitationModal: false,
        showToturialModal: false
    }

    navigateSingleplayerScreen = () => this.props.navigation.navigate('Singleplayer');
    navigateProfileScreen = () => {
        if (!this.state.isConnected) return this.setState({ showNoInternet: true });

        return this.state.logged ? this.props.navigation.navigate('Profile') : this.props.navigation.navigate('Login')
    }
    navigateSearchGameScreen = () => {
        if (!this.state.isConnected) return this.setState({ showNoInternet: true });

        return this.state.logged ? this.props.navigation.navigate('SearchGame') : this.props.navigation.navigate('Login')
    }

    readToken = () => AsyncStorage.getItem('token')
        .then(token => isLogged(token)
            .then(() => {
                this.setState({ logged: true });
                return this.props.saveToken(token);
            })
            .catch(() => this.setState({ logged: false })));

    componentDidMount() {
        // Handle first app opnening
        AsyncStorage.getItem('new')
            .then(res => {
                if (res) return

                this.setState({ showToturialModal: true }, () => {
                    AsyncStorage.setItem('new', 'false')
                })
            })
            .catch(console.error)

        // Get internet connection info 
        this.netInfoListener = NetInfo.addEventListener(state => {
            this.setState({ isConnected: state.isConnected });
        });
        this.didBlurSubscription = this.props.navigation.addListener('didFocus', () => {
            this.netInfoListener = NetInfo.addEventListener(state => {
                this.setState({ isConnected: state.isConnected });
            });
            this.readToken()
        });
    }

    componentWillUnmount() {
        this.netInfoListener();
        this.didBlurSubscription.remove();
    }

    createSocketConnection = token => this.props.createSocketConnection(token)

    render() {

        return (
            <ImageBackground source={BackgroundImg} style={[styles.max]}>
                <View style={[styles.homePage]}>
                    <View style={[styles.center, styles.logoContainer]}>
                        <View style={{ alignItems: 'center' }}>
                            <View style={[styles.logoWrapper]}>
                                <Image resizeMode="contain" source={Crown} />
                            </View>
                            <View style={[styles.titleTextWrapper]}>
                                <Text style={[styles.titeText, { fontSize: logoTextSize }]}>FAZAN</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.content, { justifyContent: 'center' }]}>
                        <View style={[{ height: '90%', width: '100%' }]}>
                            <View style={[styles.singlePlayerContainer]}>
                                <TouchableOpacity onPress={this.navigateSingleplayerScreen} style={[styles.singlePlayerButtonPress, styles.center]}>
                                    <ImageBackground style={[styles.singlePlayerButton, styles.center]} source={SinglePlayerTitle} resizeMode="stretch">
                                        <View style={[styles.center, styles.singleplayerTextPosition]}>
                                            <CustomText large>NORMAL</CustomText>
                                        </View>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.mulitplayerContainer}>
                                <TouchableOpacity onPress={this.navigateSearchGameScreen} style={[styles.multiPlayerButtonPress, styles.center]}>
                                    <ImageBackground style={[styles.mulitplayerButton, styles.center]} source={MultiplayerTitle} resizeMode="stretch">
                                        <View style={[styles.center]}>
                                            <CustomText large style={[styles.multiPLayerButtonText]}>JOACA ONLINE</CustomText>
                                        </View>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.details}>
                        <View style={[styles.aboutButtonContainer]}>
                            <View style={[{ justifyContent: 'flex-start' }]}>
                                <TouchableOpacity onPress={() => this.setState({ showAbout: true })} style={styles.detailsButtonWidth}>
                                    <Image style={styles.aboutButton} source={AboutButton} resizeMode="stretch" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.profileButtonContainer}>
                            <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                                <TouchableOpacity onPress={this.navigateProfileScreen} style={[styles.detailsButtonWidth]}>
                                    <Image style={styles.profileButton} source={ProfileButton} resizeMode="stretch" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <AboutModal
                        isVisible={this.state.showAbout}
                        onClose={() => this.setState({ showAbout: false })} />
                    <NoInternet
                        isVisible={this.state.showNoInternet}
                        onClose={() => this.setState({ showNoInternet: false })} />
                    <ToturialModal
                        isVisible={this.state.showToturialModal}
                        onClose={() => this.setState({ showToturialModal: false }, () => AsyncStorage.setItem('new', 'false'))} />
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    detailsButtonWidth: {
        width: '40%',
        height: '80%'
    },
    max: {
        flex: 1
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    homePage: {
        flex: 1,
        justifyContent: "center"
    },
    logoContainer: {
        flex: 4
    },
    logoWrapper: {
        position: 'relative',
        top: '13%',
        justifyContent: "flex-end"
    },
    titleTextWrapper: {

    },
    titeText: {
        fontFamily: 'Troika',
        color: '#FBFFB7',
        letterSpacing: 8,
    },
    content: {
        flex: 5,
    },
    singlePlayerContainer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    mulitplayerContainer: {
        flex: 1,
        alignItems: "center",
    },
    singlePlayerButton: {
        width: "100%",
        height: "95%"
    },
    singlePlayerButtonPress: {
        width: "100%"
    },
    mulitplayerButton: {
        width: "85%",
        height: "80%",
        position: 'relative',
        left: '8%'
    },
    multiPlayerButtonPress: {
        position: 'relative',
        right: '7%',
        width: "100%"
    },
    details: {
        flexDirection: 'row',
        flex: 1
    },
    profileButtonContainer: {
        flex: 1,
        flexDirection: 'row-reverse'
    },
    aboutButtonContainer: {
        flex: 1
    },
    profileButton: {
        width: "60%",
        height: "80%",
        position: 'relative',
        left: '25%',
        top: '5%'
    },
    aboutButton: {
        position: 'relative',
        top: '15%',
        left: '15%',
        width: "60%",
        height: "100%"
    },
    buttonText: {
        fontFamily: 'Troika',
        fontSize: 30,
        position: 'relative',
        top: '163%',
        left: '2%',
        color: 'white',
        justifyContent: "center",
        alignItems: "center"
    },
    singleplayerTextPosition: {
        position: 'relative',
        top: '10%',
        left: '1%'
    }
});

const mapStateToProps = state => ({
    token: state.user.token,
    socket: state.socket.socket
})

const mapDispatchToProps = dispatch => ({
    saveToken: token => dispatch(saveToken(token)),
    createSocketConnection: token => dispatch(SOCKET.createSocketConnection(token))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen); 