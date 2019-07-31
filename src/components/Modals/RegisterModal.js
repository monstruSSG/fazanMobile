import React from 'react';
import { View, Modal, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import DefaultInput from '../UI/DefaultInput/DefaultInput';
import Text from '../UI/Text/Text';
import CustomTitle from '../UI/Text/CustomTitle';
import Button from '../UI/Button/Button';
import * as CONSTANTS from '../../utils/constants';
import Logo from '../../assets/fazanLogo.png';

const registerModal = props => (
    <Modal visible={props.isVisible} onRequestClose={props.onClose} animationType="slide" transparent={false}>
        <View style={styles.navbar}>
            <Icon name="arrow-left" style={{ padding: 8 }} size={30} color="white" onPress={props.onClose} />
        </View>
        <View style={styles.registerModal}>
            <View style={styles.logo}>
                <Image source={Logo} />
                <CustomTitle color={CONSTANTS.textColor}>Register and start the battle</CustomTitle>
            </View>
            <View style={styles.userInfo}>
                <Text color={CONSTANTS.textColor}>Username</Text>
                <DefaultInput placeholder="Username" />
                <Text color={CONSTANTS.textColor}>Password</Text>
                <DefaultInput placeholder="Password" />
                <Button color={CONSTANTS.buttonColor} width={"75%"} height={45}>REGISTER</Button>
            </View>
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    registerModal: {
        flex: 1,
        width: "100%",
        backgroundColor: CONSTANTS.backgroundColor
    },
    navbar: {
        width: "100%",
        height: 50,
        backgroundColor: "#701b05"
    },
    logo: {
        alignItems: "center",
        marginTop: 24,
    },
    userInfo: {
        flex: 1,
        alignItems: "center",
        position: "relative",
        top: "10%"
    }
})

export default registerModal; 