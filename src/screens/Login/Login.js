import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import FacebookButton from '../../assets/Buttons/fbButton.png';
import Background from '../../assets/Stuff/bg.jpg';
import ContentBackground from '../../assets/Modals/mission.png';

import * as SOCKET from '../../store/actions/socket';
import { saveToken } from '../../store/actions/user';
import { login } from '../../utils/requests';
import CustomText from '../../components/UI/Text/Text';
import LoadingModal from '../../components/Modals/LoadingModal';

class Login extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        loading: false
    }

    navigateHomeHandler = () => this.props.navigation.navigate('Home');

    loginHandler = () => LoginManager.logInWithPermissions(['public_profile'])
        .then(() => {
            this.setState({ loading: true });
            return AccessToken.getCurrentAccessToken();
        })
        .then(res => login({ fbToken: res.accessToken }))
        .then(data => Promise.all([
            this.props.saveToken(data.token),
            AsyncStorage.setItem('token', data.token),
            this.createSocketConnection(data.token)
        ]))
        .then(() => {
            this.props.navigation.navigate('SearchGame')
            this.setState({ loading: false });
        })

    createSocketConnection = token => this.props.createSocketConnection(token);

    render() {
        return (
            <ImageBackground source={Background} style={styles.max}>
                <View style={[styles.center, styles.max]}>
                    <ImageBackground source={ContentBackground} style={[styles.center, styles.max]} resizeMode='stretch'>
                        <View style={[styles.contentSize, styles.center]}>
                            <View style={[styles.center, { flex: 1, flexDirection: 'row' }]}>
                                <View style={[styles.center, { width: '80%', height: '50%' }]}>
                                    <CustomText large style={[styles.headerTextPosition]}>Login</CustomText>
                                </View>
                                <View style={[styles.center, { width: '20%', height: '50%' }]}>
                                    <TouchableOpacity style={styles.max} onPress={this.navigateHomeHandler} />
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
                            <View style={[styles.center, { width: '100%', height: '40%' }]}>
                                <View style={[styles.center, { width: '40%', height: '40%' }, styles.buttonPosition]}>
                                    <TouchableOpacity style={[styles.max, styles.center]} onPress={this.loginHandler}>
                                        <Image source={FacebookButton} style={styles.max} resizeMode='contain' />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                {this.state.loading ? <LoadingModal /> : null}
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    buttonPosition: {
        position: 'relative',
        bottom: '30%'
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