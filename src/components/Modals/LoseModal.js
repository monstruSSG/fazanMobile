import React from 'react';
import { View, Modal, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import DefaultInput from '../UI/DefaultInput/DefaultInput';
import Text from '../UI/Text/Text';
import Button from '../UI/Button/Button';
import CONSTANTS from '../../utils/constants';
import Logo from '../../assets/fazanLogo.png';

const loseModal = props => (
    <Modal visible={props.isVisible} onRequestClose={props.onClose} animationType="slide" transparent={true}>
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)'
        }}>
            <View style={{
                width: 300,
                height: 400,
                borderColor: CONSTANTS.buttonColor,
                borderWidth: 5,
                borderRadius: 30,
                backgroundColor: 'white',
                elevation: 20,
            }}>
                <View style={styles.titleContainer}>
                    <Image style={styles.title} source={props.title} />
                </View>
                <View style={styles.infoAboutYou}>
                    <View style={styles.oponentWord}>
                        <Text style={styles.infoTitle}>
                            Cuvantul adversarului
                    </Text>
                        <Text>
                            restaurant
                    </Text>
                    </View>
                    <View style={styles.currentPosition}>
                        <Text style={styles.infoTitle}>
                            Pozitia curenta
                    </Text>
                        <Text>
                            12
                    </Text>
                    </View>
                </View>
                <View style={styles.options}>
                    <Button onPress={props.playAgain} color={CONSTANTS.buttonColor}>Joaca Dinou</Button>
                    <Button onPress={props.exitGame} color={CONSTANTS.buttonColor}>Iesi</Button>
                </View>
            </View>
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    loseModal: {
        width: 50,
        height: 50,
        backgroundColor: CONSTANTS.backgroundColor
    },
    loseModalView: {
        width: 100,
        height: 100,
        backgroundColor: 'yellow'
    },
    titleContainer: {
        width: "100%",
        alignItems: "center",
        backgroundColor: CONSTANTS.buttonColor,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
    title: {
        width: "100%",
        resizeMode: 'stretch'
    },
    infoAboutYou: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center"
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 4
    },
    oponentWord: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: '75%',
        marginBottom: 24,
        marginTop: 10,
        paddingBottom: 12
    },
    currentPosition: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: '75%',
        paddingBottom: 12
    },
    options: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "flex-end",
        justifyContent: "center"
    }
})

export default loseModal; 