import React, { Component } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import { connect } from 'react-redux';

import { saveToken, login } from '../../store/actions/user';
import Text from '../UI/Text/Text';

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

    render() {
        return (
            <Modal visible={this.props.isVisible} onRequestClose={this.props.onClose} animationType="slide" transparent={true}>
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
                        borderColor: 'white',
                        borderWidth: 5,
                        borderRadius: 30,
                        backgroundColor: 'white',
                        elevation: 20,
                    }}>
                        <View style={styles.container}>
                            <View style={styles.headerText}>
                                <Text>Pentru multiplayer trebuie sa te autentifici</Text>
                            </View>
                            <View style={styles.container}>
                                <Button title="FACEBOOK LOGIN" onPress={this.loginHandler} />
                            </View>
                            <View>
                                <Button title='RENUNTA' onPress={this.props.exitGame} />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    options: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "flex-end",
        justifyContent: "center"
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        width: '80%',
        height: '20%',
        backgroundColor: 'red'
    },
    fb: {
        flex: 1,
        backgroundColor: 'pink'
    },
    google: {
        flex: 1,
        backgroundColor: 'green'
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