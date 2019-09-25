import React, { Component } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, Image, ImageBackground, AsyncStorage } from 'react-native';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import { connect } from 'react-redux';

import FacebookButton from '../../assets/Buttons/fbButton.png';
import GmailButton from '../../assets/Buttons/gmailButton.png';
import SimpleButton from '../../assets/Buttons/simpleButton.png';
import WarningBackground from '../../assets/Modals/warningBack.png';
import Title from '../../assets/Modals/titleShadow.png';
import ExitButton from '../../assets/Buttons/exitButton.png';
import Background from '../../assets/Stuff/bg.jpg';

import { saveToken } from '../../store/actions/user';
import { login } from '../../utils/requests';
import CustomText from '../../components/UI/Text/Text';

class Login extends Component {
    static navigationOptions = {
        header: null
    }

    loginHandler = () => LoginManager.logInWithPermissions(['public_profile'])
        .then(result => {
            if (result.isCancelled) {
                return alert('Canceled')
            }
            return AccessToken.getCurrentAccessToken()
        })
        .then(res => login({ fbToken: res.accessToken }))
        .then(data => Promise.all([
            this.props.saveToken(data.token),
            AsyncStorage.setItem('token', data.token)
        ]))
        .then(() => this.props.navigation.navigate('SearchGame'))
        .catch(console.log)

    render() {
        return (
            <ImageBackground source={Background} style={styles.max}>
                <CustomText large>LOGEAHZA-TE</CustomText>
                <TouchableOpacity onPress={this.loginHandler}>
                    <Image source={FacebookButton} size={50} />
                </TouchableOpacity>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    max: {
        width: '100%',
        height: '100%'
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
)(Login); 