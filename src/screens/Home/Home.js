import React, { Component } from 'react';
import { View, Button, StyleSheet, Image, Text, ImageBackground, TouchableHighlight, TouchableOpacity } from 'react-native';

import CONSTANTS from '../../utils/constants';
import MyButton from '../../components/UI/Button/Button'
import FbButton from '../../components/AuthButtons/FbButton/FbButton';
import RankingModal from '../../components/Modals/RankingModal';
import { getUsers } from '../../utils/requests';

import BackgroundImg from '../../assets/Stuff/bg.jpg';
import Leaf from '../../assets/Stuff/bigLeaf.png';
import AboutButton from '../../assets/Buttons/about.png';
import ProfileButton from '../../assets/Buttons/locked.png';
import Crown from '../../assets/Stuff/1st.png';
import SinglePlayerTitle from '../../assets/Modals/titleShadow.png';
import MultiplayerTitle from '../../assets/Stuff/titleBox.png';

class HomeScreen extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        users: [],
        rankingModal: true
    }

    componentDidMount() {
        getUsers().then(users => this.setState({ users }))
    }

    navigateMultiplayerScreen = () => this.props.navigation.navigate('Multiplayer');
    navigateSingleplayerScreen = () => this.props.navigation.navigate('Singleplayer');
    navigateProfileScreen = () => this.props.navigation.navigate('Profile');

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
                                <Text style={styles.titeText}>FAZAN</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.content, { justifyContent: 'center' }]}>
                        <View style={[{ height: '90%', width: '100%' }]}>
                            <View style={styles.singlePlayerContainer}>
                                <TouchableOpacity onPress={this.navigateSingleplayerScreen} style={[styles.singlePlayerButtonPress]}>
                                    <ImageBackground style={styles.singlePlayerButton} source={SinglePlayerTitle} resizeMode="stretch">
                                        <View style={[styles.center]}>
                                            <Text style={styles.buttonText}>SINGLEPLAYER</Text>
                                        </View>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.mulitplayerContainer}>
                                <TouchableOpacity onPress={this.navigateMultiplayerScreen} style={[styles.multiPlayerButtonPress, styles.center]}>
                                    <ImageBackground style={styles.mulitplayerButton} source={MultiplayerTitle} resizeMode="stretch">
                                        <View style={[styles.center]}>
                                            <Text style={[styles.buttonText, styles.multiPLayerButtonText]}>MULTIPLAYER</Text>
                                        </View>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.details}>
                        <View style={styles.aboutButtonContainer}>
                            <TouchableOpacity onPress={() => alert('ABOUT')} style={styles.detailsButtonWidth}>
                                <Image style={styles.aboutButton} source={AboutButton} resizeMode="stretch" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.profileButtonContainer}>
                            <TouchableOpacity onPress={this.navigateProfileScreen} style={styles.detailsButtonWidth}>
                                <Image style={styles.profileButton} source={ProfileButton} resizeMode="stretch" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <RankingModal
                        isVisible={this.state.rankingModal}
                        onClose={() => this.setState({ rankingModal: false })}
                        closeModal={() => this.setState({ rankingModal: false })}
                        users={this.state.users} />
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    detailsButtonWidth: {
        width: '40%'
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
        color: 'white',
        fontSize: 96,
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
        left: '20%',
        top: '5%'
    },
    aboutButton: {
        position: 'relative',
        top: '15%',
        left: '15%',
        width: "60%",
        height: "85%"
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
    multiPLayerButtonText: {
        top: '55%',
        //To ovveride left 
        left: undefined,
        right: '8%'
    }
});

export default HomeScreen;