import React, { Component } from 'react';
import { View, Button, StyleSheet, Image, Text, ImageBackground, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import CONSTANTS from '../../utils/constants';
import MyButton from '../../components/UI/Button/Button'
import FbButton from '../../components/AuthButtons/FbButton/FbButton';

import BackgroundImg from '../../assets/back.png';
import Logo from '../../assets/angryLogo.png';

class HomeScreen extends Component {
    static navigationOptions = {
        header: null
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
                        <Image style={styles.log} source={Logo} />
                    </View>
                    <View style={styles.content}>
                        <MyButton color={CONSTANTS.buttonColor}

                            width={250}
                            height={45}
                            onPress={this.navigateSingleplayerScreen}>SINGLE PLAYER</MyButton>
                        <MyButton color={CONSTANTS.secondaryColor}

                            width={250}
                            height={45}
                            onPress={this.navigateSearchGameScreen}>SEARCH GAME</MyButton>
                    </View>
                    <View style={styles.details}>
                        <View style={styles.userLogo}>
                            <Icon
                                onPress={this.navigateProfileScreen}
                                color="azure"
                                name="user"
                                size={30}
                                style={styles.userProfile} />
                        </View>
                        <View style={styles.aboutLogo}>
                            <Icon
                                onPress={() => this.props.navigation.navigate('Multiplayer')}
                                color="azure"
                                name="question-circle"
                                size={30}
                                style={styles.userProfile} />
                        </View>
                    </View>
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
        flex: 3,
        paddingTop: 10,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    log: {
        width: "75%",
        height: "100%"
    },
    content: {
        flex: 5,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    details: {
        flexDirection: 'row',
        paddingRight: 20,
        paddingBottom: 12,
        paddingLeft: 20
    },
    userLogo: {
        flex: 1
    },
    aboutLogo: {
        flex: 1,
        alignItems: 'flex-end'
    }
});

export default HomeScreen;