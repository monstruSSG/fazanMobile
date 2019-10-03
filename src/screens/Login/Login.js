import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ImageBackground, AsyncStorage } from 'react-native';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { connect } from 'react-redux';

import FacebookButton from '../../assets/Buttons/fbButton.png';
import Background from '../../assets/Stuff/bg.jpg';
import ContentBackground from '../../assets/Modals/mission.png';
import WarningBackground from '../../assets/Modals/warningBack.png';

import * as SOCKET from '../../store/actions/socket';
import { saveToken } from '../../store/actions/user';
import { login } from '../../utils/requests';
import CustomText from '../../components/UI/Text/Text';

class Login extends Component {
    static navigationOptions = {
        header: null
    }

    navigateHomeHandler = () => this.props.navigation.navigate('Home');

    loginHandler = () => LoginManager.logInWithPermissions(['public_profile'])
        .then(() => AccessToken.getCurrentAccessToken())
        .then(res => login({ fbToken: res.accessToken }))
        .then(data => Promise.all([
            this.props.saveToken(data.token),
            AsyncStorage.setItem('token', data.token),
            this.createSocketConnection(data.token)
        ]))
        .then(() => this.props.navigation.navigate('SearchGame'))

    createSocketConnection = token => this.props.createSocketConnection(token);

    render() {
        return (
            <ImageBackground source={Background} style={styles.max}>
                <View style={[styles.center, styles.max]}>
                    <ImageBackground source={ContentBackground} style={[styles.center, styles.max]} resizeMode='stretch'>
                        <View style={[styles.contentSize, styles.center]}>
                            <View style={[styles.center, { flex: 1 }]}>
                                <View style={[styles.center, styles.headerTextPosition]}>
                                    <CustomText large>LOGIN</CustomText>
                                </View>
                            </View>
                            <View style={[styles.center, { flex: 1 }, styles.textPosition]}>
                                <View style={[styles.center, { width: '90%', height: '100%' }]}>
                                    <CustomText normal>Pentru a accesa partea de
                                online a jocului trebuie sa te autentifici</CustomText>
                                </View>
                            </View>
                            <View style={[styles.center, { width: '40%', height: '20%' }, styles.fbButtonPosition]}>
                                <TouchableOpacity style={[styles.center, styles.max]} onPress={this.loginHandler}>
                                    <Image source={FacebookButton} style={styles.max} resizeMode='contain' />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    textPosition: {
        position: 'relative',
        bottom: '18%'
    },
    fbButtonPosition: {
        position: 'relative',
        bottom: '22%'
    },
    headerTextPosition: {
        position: 'relative',
        bottom: '18%'
    },
    contentSize: {
        height: '75%',
        width: '60%'
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