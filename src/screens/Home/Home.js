import React, { Component } from 'react';
import { View, Button, StyleSheet, Image } from 'react-native';

import CONSTANTS from '../../utils/constants';
import FbButton from '../../components/AuthButtons/FbButton/FbButton';

import Logo from '../../assets/fazanLogo.png';
import Title from '../../assets/fazanTitle.png';

class HomeScreen extends Component {
    //Example on how to style React-navigation-topbar
    static navigationOptions = {
        title: 'Home',
        headerStyle: {
            backgroundColor: '#7b5e20'
        }
    }

    navigateSingleplayerScreen = () => this.props.navigation.navigate('Singleplayer');
    navigateSearchGameScreen = () => this.props.navigation.navigate('SearchGame');

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
            </View>
        );
    }
}

const styles = StyleSheet.create({
    homePage: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
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