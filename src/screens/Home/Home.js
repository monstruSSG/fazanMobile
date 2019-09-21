import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, ImageBackground, TouchableOpacity } from 'react-native';

import CustomText from '../../components/UI/Text/Text';
import AboutModal from '../../components/Modals/AboutModal';

import BackgroundImg from '../../assets/Stuff/bg.jpg';
import AboutButton from '../../assets/Buttons/about.png';
import ProfileButton from '../../assets/Buttons/locked.png';
import Crown from '../../assets/Stuff/1st.png';
import SinglePlayerTitle from '../../assets/Modals/titleShadow.png';
import MultiplayerTitle from '../../assets/Stuff/titleBox.png'

class HomeScreen extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        showAbout: false
    }

    naivgateSearchGameScreen = () => this.props.navigation.navigate('SearchGame');
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
                                <TouchableOpacity onPress={this.naivgateSearchGameScreen} style={[styles.multiPlayerButtonPress, styles.center]}>
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

export default HomeScreen;