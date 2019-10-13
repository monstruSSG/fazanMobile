import React, { Component } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';

import WarningBackground from '../../assets/Modals/warningBack.png';
import ExitButton from '../../assets/Buttons/exitButton.png';
import RedButton from '../../assets/Buttons/redbutton.png';
import GreenButton from '../../assets/Buttons/greenbutton.png';
import Title from '../../assets/Modals/titleShadow.png';

import Text from '../../components/UI/Text/Text';

class WaitingModal extends Component {

    render() {
        return (
            <Modal visible={this.props.isVisible} onRequestClose={this.props.onClose} animationType="slide" transparent={true}>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.9)'
                }}>
                    <View style={{
                        width: "100%",
                        height: "70%",
                        position: 'relative',
                        elevation: 20,
                    }}>
                        <View style={styles.container}>

                            <ImageBackground source={WarningBackground} resizeMode="stretch" style={styles.backgroundImageContainer}>
                                <View style={styles.titleContainer}>
                                    <TouchableOpacity onPress={this.props.onClose}>
                                        <ImageBackground style={styles.buttonTopImage} resizeMode="contain" source={ExitButton}>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                    <ImageBackground resizeMode="stretch" style={styles.titleImage} source={Title}>
                                        <View style={[styles.centerItems, styles.max, styles.titleTextContainer]}>
                                            <Text color="white" style={styles.titleText}>CAUTARE</Text>
                                        </View>
                                    </ImageBackground>
                                </View>
                                <View style={styles.usersContainerWrapper}>
                                    <View style={{ flex: 3 }}>
                                        <Text style={{ fontFamily: 'Troika', textAlign: 'center', paddingTop: '10%' }} normal color='white'>Asteptam dupa jucatori disponibil!</Text>
                                        
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                        <TouchableOpacity style={{ flex: 1, paddingLeft: '5%' }} onPress={this.props.onClose}>
                                            <ImageBackground style={styles.buttonImage} resizeMode="contain" source={RedButton}>
                                                <Text normal style={{ fontFamily: 'Troika', position: 'relative', left: '34%', top: '25%' }}>RENUNTA</Text>
                                            </ImageBackground>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ImageBackground>

                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentWrapper: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    centerItems: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    max: {
        flex: 1
    },
    container: {
        justifyContent: "flex-end",
        position: 'relative',
        right: '3%'
    },
    backgroundImageContainer: {
        height: "90%",
        width: "100%",
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    titleContainer: {
        width: "100%",
        height: "15%",
    },
    titleImage: {
        height: "120%",
        width: "95%",
        position: 'relative',
        bottom: "170%",
        left: '5%'
    },
    buttonTopImage: {
        width: "100%",
        height: "100%",
        left: '45%',
        bottom: "20%"
    },
    buttonImage: {
        width: '100%',
        height: '100%'
    },
    usersContainerWrapper: {
        height: "75%",
        width: "80%",
        position: 'absolute',
        left: "13%",
        top: "8%",
        alignItems: 'center',
    },
    userWrapper: {
        width: "100%"
    },
    titleTextContainer: {
        display: 'flex'
    },
    titleText: {
        position: 'relative',
        marginTop: '8%',
        fontFamily: 'Troika',
        color: 'white',
        fontSize: 26,
        letterSpacing: 2,
    },
    infoText: {
        paddingTop: 12,
        fontFamily: 'Troika',
        fontSize: 22,
        color: 'white',
        textAlign: 'center',
    }

})

export default WaitingModal; 