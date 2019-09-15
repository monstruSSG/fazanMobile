import React, { Component } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, Image, ImageBackground, Text } from 'react-native';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import { connect } from 'react-redux';

import FacebookButton from '../../assets/Buttons/fbButton.png';
import GmailButton from '../../assets/Buttons/gmailButton.png';
import SimpleButton from '../../assets/Buttons/simpleButton.png';
import WarningBackground from '../../assets/Modals/warningBack.png';
import Title from '../../assets/Modals/titleShadow.png';
import ExitButton from '../../assets/Buttons/exitButton.png';

import { saveToken, login } from '../../store/actions/user';

class LoginModal extends Component {
    loginHandler = () => LoginManager.logInWithPermissions(['public_profile'])
        .then(result => {
            if (result.isCancelled) {
                return alert('Canceled')
            }
            return AccessToken.getCurrentAccessToken()
        })
        .then(res => login({ fbToken: res.accessToken }))
        .then(data => this.props.saveToken(data.token))
        .catch(console.log)

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
                        width: "80%",
                        height: "95%",
                        position: 'relative',
                        top: '5%',
                        elevation: 20,
                    }}>
                        <View style={styles.container}>

                            <ImageBackground source={WarningBackground} resizeMode="stretch" style={styles.backgroundImageContainer}>
                                <View style={styles.titleContainer}>
                                    <TouchableOpacity onPress={this.props.exitGame}>
                                        <ImageBackground style={styles.buttonImage} resizeMode="cover" source={ExitButton}>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                    <ImageBackground resizeMode="stretch" style={styles.titleImage} source={Title}>
                                        <View style={[styles.centerItems, styles.max, styles.titleTextContainer]}>
                                            <Text color="white" style={styles.titleText}>LOGARE</Text>
                                        </View>
                                    </ImageBackground>
                                </View>
                                <View style={styles.usersContainerWrapper}>
                                    <View style={{ flex: 3 }}>
                                        <Text color="white" style={styles.infoText}>Pentru a accesa parte de multiplayer a jocului trebuie
                                    sa va logati.</Text>
                                        <Text color="white" style={styles.infoText}>Urmatoarele optiuni sunt disponibile:</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', width: '100%', alignItems: 'flex-end', justifyContent: 'center' }}>
                                        <TouchableOpacity onPress={this.loginHandler}>
                                            <Image source={FacebookButton} style={{ width: 50, height: 50, marginRight: 18 }} resizeMode="stretch" />
                                        </TouchableOpacity>
                                        <Text style={[styles.infoText, { paddingBottom: 12 }]} color="white">SAU</Text>
                                        <TouchableOpacity onPress={this.loginHandler}>
                                            <Image source={GmailButton} style={{ width: 50, height: 50, marginLeft: 18 }} resizeMode="stretch" />
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
        height: "100%",
        width: "95%",
        position: 'relative',
        bottom: "150%",
        left: '5%'
    },
    buttonImage: {
        width: "45%",
        height: "95%",
        left: '88%',
        bottom: "8%"
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
        marginTop: '5%',
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

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    saveToken: token => dispatch(saveToken(token))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginModal); 