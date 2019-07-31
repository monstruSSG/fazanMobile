import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Button from '../../components/UI/Button/Button';
import Text from '../../components/UI/Text/Text';
import Title from '../../assets/fazanTitle.png';
import RegisterModal from '../../components/Modals/RegisterModal';
import LoginModal from '../../components/Modals/LoginModal';
import CONSTANTS from '../../utils/constants';

class SearchGameScreen extends Component {
    state = {
        loginOption: false,
        registerOption: false
    };

    navigateMultiplayerScreen = () => this.props.navigation.navigate('Multiplayer');

    render() {
        return (
            <View style={styles.content}>
                <View style={styles.navbar}>
                    <Icon name="arrow-left" 
                        style={{ padding: 8 }} 
                        size={30} 
                        color="white" 
                        onPress={() => alert("Go to HomePage")} />
                </View>
                <View style={styles.multiplayer}>
                    <View style={styles.titleContainer}>
                        <Image source={Title} />
                    </View>
                    <Button color={CONSTANTS.buttonColor} 
                        width={"75%"} 
                        height={45} 
                        title="LOGIN"
                        onPress={() => this.setState({ loginOption: true })}>Login</Button>
                    <Text color={CONSTANTS.textColor}>OR</Text>
                    <Button color={CONSTANTS.buttonColor} 
                        width={"75%"} 
                        height={45}
                        title="REGISTER" 
                        onPress={() => this.setState({ registerOption: true })}>Register</Button>
                </View>
                <LoginModal isVisible={this.state.loginOption} 
                    onClose={() => this.setState({ loginOption: false })} />
                <RegisterModal isVisible={this.state.registerOption} 
                    onClose={() => this.setState({ registerOption: false })} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1
    },
    navbar: {
        width: "100%",
        height: 50,
        backgroundColor: "#701b05"
    },
    titleContainer: {
        position: "relative",
        bottom: '15%'
    },
    multiplayer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default SearchGameScreen;