import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import Button from '../UI/Button/Button';
import Text from '../UI/Text/Text';
import CustomTitle from '../UI/Text/CustomTitle'
import * as CONSTANTS from '../../utils/constants'

const homePage = props => (
    <View style={styles.homePage}>
        <View style={styles.logoContainer}>
            <Image source={require('../../../assets/fazanLogo.png')} />
        </View>
        <View style={styles.titleContainer}>
            <Image source={require('../../../assets/fazanTitle.png')} />
        </View>

        <View style={styles.content}>
            <Button color={CONSTANTS.buttonColor} width={250} height={45} onPress={() => alert("Single")}>SINGLE PLAYER</Button>
            <Text color={CONSTANTS.textColor}>OR</Text>
            <Button color={CONSTANTS.buttonColor} width={250} height={45} onPress={() => alert("Mutiplayer")}>MULTIPLAYER</Button>
        </View>
    </View>

)
const styles = StyleSheet.create({
    homePage: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    logoContainer: {
        position: "relative",
        bottom: "15%"
    },
    titleContainer: {
        position: "relative",
        bottom: "15%"
    }
});

export default homePage;

