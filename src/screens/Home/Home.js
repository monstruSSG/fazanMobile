import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';

import { HOME_SCREEN, SINGLEPLAYER_GAME_SCREEN, MULTIPLAYER_GAME_SCRREN } from '../navigationPaths';

class HomeScreen extends Component {
    static navigationOptions = {
        title: HOME_SCREEN
    }

    navigateSingleplayerScreen = () => this.props.navigation.navigate(SINGLEPLAYER_GAME_SCREEN);
    navigateMultyplayerScreen = () => this.props.navigation.navigate(MULTIPLAYER_GAME_SCRREN);

    render() {
        return (
            <View>
                HOME PAGE
                <Button onPress={this.navigateSingleplayerScreen}>
                    GO TO SINGLEPLAYER
                </Button>
                <Button onPress={this.navigateMultyplayerScreen}>
                    GO TO MULTIPLAYER
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({});

export default HomeScreen;