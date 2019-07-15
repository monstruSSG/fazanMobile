import React, { Component } from 'react';
import { StyleSheet, View, Modal, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

import Button from '../UI/Button/Button';
import Text from '../UI/Text/Text';
import LoginModal from '../Modal/LoginModal';
import RegisterModal from '../Modal/RegisterModal';
import * as CONSTANTS from '../../utils/constants';

class MultiplayerOption extends Component {

    state = {
        logginOption: false,
        registerOption: false
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.content}>
                <View style={styles.navbar}>
                    <Icon name="arrow-left" style={{ padding: 8 }} size={30} color="white" onPress={() => alert("Go to HomePage")}/>
                </View>
                <View style={styles.multiplayer}>
                    <View style={styles.titleContainer}>
                        <Image source={require('../../../assets/fazanTitle.png')} />
                    </View>
                    <Button color={CONSTANTS.buttonColor} width={"75%"} height={45} onPress={() => this.setState({ logginOption: true })}>LOGIN</Button>
                    <Text color={CONSTANTS.textColor}>OR</Text>
                    <Button color={CONSTANTS.buttonColor} width={"75%"} height={45} onPress={() => this.setState({ registerOption: true })}>REGISTER</Button>
                </View>
                <LoginModal isVisible={this.state.logginOption} onClose={() => this.setState({ logginOption: false })} />
                <RegisterModal isVisible={this.state.registerOption} onClose={() => this.setState({ registerOption: false })}/>
            </View>
        )
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
})

export default MultiplayerOption;