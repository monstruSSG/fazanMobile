import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import { MULTIPLAYER_GAME_SCREEN } from '../navigationPaths';

class MultiplayerGameScreen extends Component {
    static navigationOptions = {
        title: MULTIPLAYER_GAME_SCREEN
    }

    render() {
        return (
            <View>
                MULTIPLAYER GAME
            </View>
        );
    }
}

const styles = StyleSheet.create({});

export default MultiplayerGameScreen;