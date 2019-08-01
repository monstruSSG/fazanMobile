import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView, Button, Text } from 'react-native';

import CONSTANTS from '../../utils/constants';


class SearchGameScreen extends Component {

    static navigationOptions = {
        title: 'Oponent name',
        headerStyle: {
            backgroundColor: '#7b5e20'
        },
        headerRight: (
            <Text>Score:</Text>
        )
    }

    render() {
        return (
            <View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    
});

export default SearchGameScreen;