import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { GoogleSignin, statusCodes, } from '@react-native-community/google-signin';

import FacebookButton from '../../assets/Buttons/fbButton.png';
import ContentBackground from '../../assets/Modals/mission.png';
import GmailButton from '../../assets/Buttons/gmailButton.png';

import * as SOCKET from '../../store/actions/socket';
import { saveToken } from '../../store/actions/user';
import { fbLogin, gmailLogin } from '../../utils/requests';
import CustomText from '../../components/UI/Text/Text';
import ModalTemplate from '../Modals/ModalTemplate';

class Login extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        loading: false
    }

    componentDidMount() {
        // Fine to configure here since it will mount everytime 
        GoogleSignin.configure({
            webClientId: '1023963061725-2bctqbkcsevkarje4o3m408m4q1j8jb1.apps.googleusercontent.com'
        });
    }

    googleLoginHandler = async () => {
        try {
            const data = await GoogleSignin.signIn();
            let deviceId = await AsyncStorage.getItem('deviceId');

            let { token } = await gmailLogin({ gmailToken: data.idToken, id: data.user.id, deviceId })

            AsyncStorage.setItem('token', token);
            return this.props.onLoginSucceed();

        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // Userul a dat cancel la logare
            } else if (error.code === statusCodes.IN_PROGRESS) {
                alert('A aparut o eroare la logare')
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                alert('Te rog instaleaza-ti google store pentru a accesa aceasta sectiune');
            } else {
                alert('A aparut o eroare la logare');
            }
            
            return this.props.onLoginFailed();
        }
    }

    fbLoginHandler = () => LoginManager.logInWithPermissions(['public_profile'])
        .then(result => {
            if (result.isCancelled) return this.navigateHomeHandler()
            this.setState({ loading: true });
            return Promise.all([AccessToken.getCurrentAccessToken(), AsyncStorage.getItem('deviceId')]);
        })
        .then(([{accessToken}, deviceId]) => fbLogin({ fbToken: accessToken, deviceId }))
        .then(data => Promise.all([
            this.props.saveToken(data.token),
            AsyncStorage.setItem('token', data.token),
            this.createSocketConnection(data.token)
        ]))
        .then(() => {
            this.setState({ loading: false });
            return this.props.onLoginSucceed();
        })
        .catch(() => {
            AsyncStorage.removeItem('token');
            return this.props.onLoginFailed();
        })

    createSocketConnection = token => this.props.createSocketConnection(token);

    render() {
        return (
            <ModalTemplate isVisible={this.props.isVisible} background={ContentBackground} onClose={this.props.onClose}>
                <View style={[styles.center, styles.max]}>
                    <View style={[styles.contentSize, styles.center]}>
                        <View style={[styles.center, { flex: 1, flexDirection: 'row' }]}>
                            <View style={[styles.center, { width: '80%', height: '50%' }]}>
                                <CustomText large style={[styles.headerTextPosition]}>Login</CustomText>
                            </View>
                            <View style={[styles.center, { width: '20%', height: '50%' }]}>
                                <TouchableOpacity style={styles.max} onPress={this.props.onClose} />
                            </View>
                        </View>
                        <View style={[styles.center, { flex: 1 }]}>
                            <View style={[styles.center, { width: '100%', height: '100%' }]}>
                                <View style={[styles.center, { width: '100%', height: '20%' }]}>
                                    <CustomText large>Logare!</CustomText>
                                </View>
                                <View style={[styles.center, { width: '60%', height: '80%' }]}>
                                    <CustomText>Pentru a accesa partea online a jocului treuie sa fii autentificat</CustomText>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.center, { width: '100%', height: '40%', flexDirection: 'row' }]}>
                            <View style={[styles.center, { width: '40%', height: '40%', left: '8%' }, styles.buttonPosition]}>
                                <TouchableOpacity style={[styles.max, styles.center]} onPress={this.fbLoginHandler}>
                                    <Image source={FacebookButton} style={styles.max} resizeMode='contain' />
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.center, { width: '40%', height: '40%', right: '8%' }, styles.buttonPosition]}>
                                <TouchableOpacity style={[styles.max, styles.center]} onPress={this.googleLoginHandler}>
                                    <Image source={GmailButton} style={styles.max} resizeMode='contain' />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ModalTemplate>
        );
    }
}

const styles = StyleSheet.create({
    buttonPosition: {
        position: 'relative',
        bottom: '15%'
    },
    headerTextPosition: {
        position: 'relative',
        left: '14%'
    },
    contentSize: {
        width: '90%',
        height: '80%'
    },
    max: {
        width: '100%',
        height: '100%'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    saveToken: token => dispatch(saveToken(token)),
    createSocketConnection: token => dispatch(SOCKET.createSocketConnection(token))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login); 