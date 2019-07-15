import React, { Component } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';

class HomeScreen extends Component {
    navigateSingleplayerScreen = () => this.props.navigation.navigate('Singleplayer');
    navigateSearchGameScreen = () => this.props.navigation.navigate('SearchGame');

    render() {
        return (
            <View style={styles.homePage}>
                <View style={styles.logoContainer}>
                    <Image source={require('../../../assets/fazanLogo.png')} />
                </View>
                <View style={styles.titleContainer}>
                    <Image source={require('../../../assets/fazanTitle.png')} />
                </View>

                <View style={styles.content}>
                    <Button color={CONSTANTS.buttonColor} width={250} height={45} onPress={() => alert("Single")}>SINGLE PLAYER</Button>
                    <Text color={CONSTANTS.textColor}>OR</Text>
                    <Button color={CONSTANTS.buttonColor} width={250} height={45} onPress={() => alert("Mutiplayer")}>MULTIPLAYER</Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({});

export default HomeScreen;