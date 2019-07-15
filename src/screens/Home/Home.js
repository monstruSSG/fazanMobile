import React, { Component } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';

class HomeScreen extends Component {
    navigateSingleplayerScreen = () => this.props.navigation.navigate('Singleplayer');
    navigateSearchGameScreen = () => this.props.navigation.navigate('SearchGame');

    render() {
        return (
            <View>
                <Text>HOME PAGE</Text>
                <Button title="Go toSingleplayer" onPress={this.navigateSingleplayerScreen}></Button>
                <Button title="Go to Search game " onPress={this.navigateSearchGameScreen}></Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({});

export default HomeScreen;