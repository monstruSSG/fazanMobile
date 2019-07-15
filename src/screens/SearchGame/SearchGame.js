import React, { Component } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

class SearchGameScreen extends Component {
    navigateMultiplayerScreen = () => this.props.navigation.navigate('Multiplayer');

    render() {
        return (
            <View>
                <Text>SEARCH GAME AND PROFILE DATA AND OTHERS RANKING ETC</Text>
                <Button title="Go to multiplayer game" onPress={this.navigateMultiplayerScreen}></Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({});

export default SearchGameScreen;