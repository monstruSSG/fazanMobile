import React, { Component } from 'react';
import { View, Button, StyleSheet, Image, Text, ImageBackground, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import CONSTANTS from '../../utils/constants';
import MyButton from '../../components/UI/Button/Button'
import FbButton from '../../components/AuthButtons/FbButton/FbButton';

import BackgroundImg from '../../assets/back.png';
import Logo from '../../assets/angryLogo.png';

import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

const initUser = (token) => {
    fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
        .then((response) => response.json())
        .then((json) => {
            // Some user object has been set up somewhere, build that user here
            user.name = json.name
            user.id = json.id
            user.user_friends = json.friends
            user.email = json.email
            user.username = json.name
            user.loading = false
            user.loggedIn = true
            user.avatar = setAvatar(json.id)
            console.log(json, 'USER')
        })
        .catch(() => {
            reject('ERROR GETTING DATA FROM FACEBOOK')
        })
}


class HomeScreen extends Component {
    static navigationOptions = {
        header: null
    }

    navigateSingleplayerScreen = () => this.props.navigation.navigate('Singleplayer');
    navigateAccountScreen = () => this.props.navigation.navigate('Account');
    navigateSearchGameScreen = () => this.props.navigation.navigate('SearchGame');
    navigateProfileScreen = () => this.props.navigation.navigate('Profile');

    componentDidMount() {
        GoogleSignin.configure({
            //It is mandatory to call this method before attempting to call signIn()
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            // Repleace with your webClientId generated from Firebase console
            webClientId: '490019403002-olakiju29g4196h1e31gcs9gtkmmmuu6.apps.googleusercontent.com',
        })
        this._isSignedIn()
    }

    _isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
            alert('User is already signed in');
            //Get the User details as user is already signed in
            this._getCurrentUserInfo();
        } else {
            //alert("Please Login");
            console.log('Please Login');
        }
        this.setState({ gettingLoginStatus: false });
    };

    _getCurrentUserInfo = async () => {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            console.log('User Info --> ', userInfo);
            this.setState({ userInfo: userInfo });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                alert('User has not signed in yet');
                console.log('User has not signed in yet');
            } else {
                alert("Something went wrong. Unable to get user's info");
                console.log("Something went wrong. Unable to get user's info");
            }
        }
    };

    _signIn = async () => {
        //Prompts a modal to let the user sign in into your application.
        try {
            await GoogleSignin.hasPlayServices({
                //Check if device has Google Play Services installed.
                //Always resolves to true on iOS.
                showPlayServicesUpdateDialog: true,
            });
            const userInfo = await GoogleSignin.signIn();
            console.log('User Info --> ', userInfo);
            this.setState({ userInfo: userInfo });
        } catch (error) {
            console.log('Message', error.message);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User Cancelled the Login Flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Signing In');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('Play Services Not Available or Outdated');
            } else {
                console.log('Some Other Error Happened');
            }
        }
    };



    async loginHandler() {
        try {
            let result = await LoginManager.logInWithPermissions(['public_profile'])
            if (result.isCancelled) {
                return alert('Canceled')
            }

            let token = await AccessToken.getCurrentAccessToken()
            console.log(token, 'TOKEN')
            initUser(token.accessToken)

        } catch (e) {
            console.log('ERROR ' + e)
        }
    }
    render() {
        return (
            <ImageBackground source={BackgroundImg} style={{ width: '100%', height: '100%' }}>
                <View style={styles.homePage}>
                    <View style={styles.logoContainer}>
                        <Image style={styles.log} source={Logo} />
                    </View>
                    <View style={styles.content}>
                        <MyButton color={CONSTANTS.buttonColor}

                            width={250}
                            height={45}
                            onPress={this.navigateSingleplayerScreen}>SINGLE PLAYER</MyButton>
                        <MyButton color={CONSTANTS.secondaryColor}

                            width={250}
                            height={45}
                            onPress={this.navigateSearchGameScreen}>SEARCH GAME</MyButton>
                    </View>
                    <View style={styles.details}>
                        <View style={styles.userLogo}>
                            <Icon
                                onPress={this.navigateProfileScreen}
                                color="azure"
                                name="user"
                                size={30}
                                style={styles.userProfile} />
                        </View>
                        <View style={styles.aboutLogo}>
                            <Icon
                                onPress={() => this.props.navigation.navigate('Multiplayer')}
                                color="azure"
                                name="question-circle"
                                size={30}
                                style={styles.userProfile} />
                        </View>
                        <Button title="FACEBOOK LOGIN" onPress={this.loginHandler} />
                        <GoogleSigninButton
                            style={{ width: 312, height: 48 }}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Light}
                            onPress={this._signIn}
                        />
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    homePage: {
        flex: 1,
        justifyContent: "center"
    },
    logoContainer: {
        flex: 3,
        paddingTop: 10,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    log: {
        width: "75%",
        height: "100%"
    },
    content: {
        flex: 5,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    details: {
        flexDirection: 'row',
        paddingRight: 20,
        paddingBottom: 12,
        paddingLeft: 20
    },
    userLogo: {
        flex: 1
    },
    aboutLogo: {
        flex: 1,
        alignItems: 'flex-end'
    }
});

export default HomeScreen;