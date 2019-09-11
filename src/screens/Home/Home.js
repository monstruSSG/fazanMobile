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
        rankingModal: false
    }

    componentDidMount() {
        getUsers().then(users => this.setState({ users }))
    }

    navigateSingleplayerScreen = () => this.props.navigation.navigate('Singleplayer');
    navigateAccountScreen = () => this.props.navigation.navigate('Account');
    navigateSearchGameScreen = () => this.props.navigation.navigate('SearchGame');
    navigateProfileScreen = () => this.props.navigation.navigate('Profile');

    render() {
        return (
            <ImageBackground source={BackgroundImg} style={{ width: '100%', height: '100%' }}>
                <View style={styles.homePage}>
                    <View style={styles.logoContainer}>
                        <View style={{alignItems: 'center'}}>
                            <View style={[styles.logoWrapper, { }]}>
                                <Image style={styles.log} resizeMode="contain" source={Crown} />
                            </View>
                            <View style={[styles.titleTextWrapper, { }]}>
                                <Text style={styles.titeText}>FAZAN</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.content, {justifyContent: 'center'}]}>
                        <View style={[{ height: '90%', width: '100%' }, {}]}>
                            <View style={styles.singlePlayerContainer}>
                                <TouchableOpacity style={{ paddingTop: 12,width: "100%", alignItems: "center", justifyContent: "center" }}>
                                    <ImageBackground style={styles.singlePlayerButton} source={SinglePlayerTitle} resizeMode="stretch">
                                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                                            <Text style={styles.buttonText}>SINGLEPLAYER</Text>
                                        </View>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.mulitplayerContainer}>
                                <TouchableOpacity style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
                                    <ImageBackground style={styles.mulitplayerButton} source={SinglePlayerTitle} resizeMode="stretch">
                                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                                            <Text style={styles.buttonText}>MULTIPLAYER</Text>
                                        </View>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.details}>
                        <View style={styles.aboutButtonContainer}>
                            <TouchableOpacity style={{ width: "40%" }}>
                                <Image style={styles.aboutButton} source={AboutButton} resizeMode="stretch" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.profileButtonContainer}>
                            <TouchableOpacity style={{ width: "40%" }}>
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
    homePage: {
        flex: 1,
        justifyContent: "center"
    },
    logoContainer: {
        flex: 4,
        alignItems: "center",
        justifyContent: 'center'
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
    log: {
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
        height: "90%"
    },
    mulitplayerButton: {
        width: "100%",
        height: "90%"
    },
    details: {
        flexDirection: 'row',
        flex: 1,
        height: '1%'
    },
    profileButtonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'flex-end'
    },
    aboutButtonContainer: {
        flex: 1
    },
    profileButton: {
        width: "60%",
        height: "80%",
    },
    aboutButton: {
        width: "60%",
        height: "80%",
        marginLeft: 30
    },
    buttonText: {
        fontFamily: 'Troika',
        fontSize: 24,
        paddingLeft: 18,
        paddingTop: 44,
        letterSpacing: 2,
        color: 'white',
        justifyContent: "center",
        alignItems: "center"
    }
});

export default HomeScreen;