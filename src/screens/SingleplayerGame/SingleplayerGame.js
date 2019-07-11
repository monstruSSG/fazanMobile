import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import { SINGLEPLAYER_GAME_SCREEN } from '../navigationPaths';

class SingleplayerGameScreen extends Component {
    static navigationOptions = {
        title: SINGLEPLAYER_GAME_SCREEN
    }

    render() {
        return (
            <View>
                SINGLEPLAYER GAME
            </View>
        );
    }
}

const styles = StyleSheet.create({});

export default SingleplayerGameScreen;