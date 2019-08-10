import React, { Component } from 'react';
import { View, Button, StyleSheet, Image } from 'react-native';

import CONSTANTS from '../../utils/constants';
import FbButton from '../../components/AuthButtons/FbButton/FbButton';

import Logo from '../../assets/fazanLogo.png';
import Title from '../../assets/fazanTitle.png';

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
            <View style={styles.homePage}>
                <View style={styles.logoContainer}>
                    <Image source={Logo} />
                </View>
                <View style={styles.titleContainer}>
                    <Image source={Title} />
                </View>

                <View style={styles.content}>
                    <Button color={CONSTANTS.buttonColor}
                        title="Singleplayer"
                        width={250}
                        height={45}
                        onPress={this.navigateSingleplayerScreen}>SINGLE PLAYER</Button>
                    <Button color={CONSTANTS.buttonColor}
                        title="Multiplayer"
                        width={250}
                        height={45}
                        onPress={this.navigateSearchGameScreen}>SEARCH GAME</Button>
                </View>
                <FbButton />
                <Button onPress={this.navigateProfileScreen} title="This will be an icon with an user profile" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    homePage: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: CONSTANTS.backgroundColor
    },
    logoContainer: {
        position: "relative",
        bottom: "15%"
    },
    titleContainer: {
        position: "relative",
        bottom: "15%"
    }
});

export default HomeScreen;