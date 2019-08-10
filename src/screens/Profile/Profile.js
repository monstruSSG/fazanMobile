import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Button from '../../components/UI/Button/Button';
import Text from '../../components/UI/Text/Text';
import Title from '../../assets/fazanTitle.png';
import CONSTANTS from '../../utils/constants';
import Header from '../../components/Header/Header';

class ProfileScreen extends Component {
    static navigationOptions = {
        header: <Header title='My custom header'/>,
    }

    render() {
        return (
            <View style={styles.content}>
                <Text>My PROFILE</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: CONSTANTS.backgroundColor
    }
});

export default ProfileScreen;