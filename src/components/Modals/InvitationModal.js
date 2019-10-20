import React, { Component } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';

import WarningBackground from '../../assets/Modals/acceptwaitmodal.png';
import ExitButton from '../../assets/Buttons/exitButton.png';
import RedButton from '../../assets/Buttons/redbutton.png';
import GreenButton from '../../assets/Buttons/greenbutton.png';
import Title from '../../assets/Modals/titleShadow.png';

import Text from '../../components/UI/Text/Text';

class InvitationModal extends Component {

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

                        <ImageBackground source={WarningBackground} resizeMode="center" style={styles.backgroundImageContainer}>
                            <View style={styles.titleContainer}>
                                <Text style={{position: 'relative', top: '30%', left: '27%'}} large>INVITATIE</Text>
                                <TouchableOpacity onPress={this.props.onClose}>
                                    <Image style={styles.buttonTopImage} resizeMode="contain" source={ExitButton} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.usersContainerWrapper}>
                                <View style={{ flex: 3 }}>
                                    <Text style={{ fontFamily: 'Troika', textAlign: 'center', paddingTop: '20%', paddingRight: '7%' }} normal color='white'>Ai primit o invitatie de la Silviu</Text>
                                    <Text style={{ fontFamily: 'Troika', textAlign: 'center', paddingTop: '10%', paddingRight: '7%' }} normal color='white'>Ce ai de gand sa faci?</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', width: '100%', alignItems: 'flex-end', justifyContent: 'center' }}>
                                    <TouchableOpacity style={{ flex: 1 }} onPress={this.props.onClose}>
                                        <ImageBackground style={styles.buttonImage} resizeMode="contain" source={RedButton}>
                                            <Text style={{ fontFamily: 'Troika', position: 'relative', left: '25%', top: '30%' }}>REFUZA</Text>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ flex: 1, paddingLeft: '8%' }} onPress={this.props.onClose}>
                                        <ImageBackground style={styles.buttonImage} resizeMode="contain" source={GreenButton}>
                                            <Text style={{ fontFamily: 'Troika', position: 'relative', left: '25%', top: '30%' }}>ACCEPTA</Text>
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
        left: '40%',
        bottom: '40%'
    },
    buttonImage: {
        width: '95%',
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

export default InvitationModal; 