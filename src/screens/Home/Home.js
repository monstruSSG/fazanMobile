import React, { Component } from 'react';
import { View, Button, StyleSheet, Image, Text, ImageBackground, TouchableHighlight, TouchableOpacity } from 'react-native';

import CONSTANTS from '../../utils/constants';
import MyButton from '../../components/UI/Button/Button'
import FbButton from '../../components/AuthButtons/FbButton/FbButton';
import RankingModal from '../../components/Modals/RankingModal';
import { getUsers } from '../../utils/requests';

import BackgroundImg from '../../assets/Stuff/bg.jpg';
import Leaf from '../../assets/Stuff/bigLeaf.png';
import AboutButton from '../../assets/Buttons/about.png';
import ProfileButton from '../../assets/Buttons/locked.png';
import Crown from '../../assets/Stuff/1st.png';

class HomeScreen extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        users: [],
        rankingModal: false
    }

    componentDidMount() {
        getUsers().then(users => this.setState({ users }))
    }

    navigateSingleplayerScreen = () => this.props.navigation.navigate('Singleplayer');
    navigateAccountScreen = () => this.props.navigation.navigate('Account');
    navigateSearchGameScreen = () => this.props.navigation.navigate('SearchGame');
    navigateProfileScreen = () => this.props.navigation.navigate('Profile');

    render() {
        return (
            <ImageBackground source={BackgroundImg} style={{ width: '100%', height: '100%' }}>
                <View style={styles.homePage}>
                    <View style={styles.logoContainer}>
                        <View style={styles.logoWrapper}>
                            <Image style={styles.log} resizeMode="contain" source={Crown} />
                        </View>
                        <View style={styles.titleTextWrapper}>
                            <Text style={styles.titeText}>FAZAN</Text>
                        </View>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.singlePlayerContainer}>
                            <TouchableOpacity>
                                <Image style={styles.singlePlayerButton} source={AboutButton} resizeMode="stretch" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.mulitplayerContainer}>
                            <TouchableOpacity>
                                <Image style={styles.mulitplayerButton} source={ProfileButton} resizeMode="stretch" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.details}>
                        <View style={styles.aboutButtonContainer}>
                            <TouchableOpacity  style={{width: "40%"}}>
                                <Image style={styles.aboutButton} source={AboutButton} resizeMode="stretch" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.profileButtonContainer}>
                            <TouchableOpacity style={{width: "40%"}}>
                                <Image style={styles.profileButton} source={ProfileButton} resizeMode="stretch" />
                            </TouchableOpacity>
                        </View>

                        {/* <Button title="RANKING" onPress={() => this.setState({ rankingModal: true })}></Button> */}
                    </View>
                    <RankingModal
                        isVisible={this.state.rankingModal}
                        onClose={() => this.setState({ rankingModal: false })}
                        closeModal={() => this.setState({ rankingModal: false })}
                        users={this.state.users} />
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
        display: "flex",
        flex: 2,
        paddingTop: 10,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    logoWrapper: {
        flex: 1,
        flexDirection: 'row'
    },
    titleTextWrapper: {
        flex: 1,
    },
    titeText: {
        paddingTop: 8,
        fontFamily: 'Troika',
        color: 'white',
        fontSize: 96,
        letterSpacing: 8,
    },
    log: {
    },
    content: {
        display: "flex",
        flex: 5,
        width: "100%",
    },
    singlePlayerContainer: {
        flex: 1,
        backgroundColor: 'red'
    },
    mulitplayerContainer: {
        flex: 1,
        backgroundColor: 'green'
    },
    singlePlayerButton: {
        width: "50%",
        height: "50%"
    },
    mulitplayerButton: {
        width: "50%",
        height: "50%"
    },
    details: {
        flexDirection: 'row',
        flex: 1,
    },
    profileButtonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'flex-end'
    },
    aboutButtonContainer: {
        flex: 1,
        justifyContent: "center",
    },
    profileButton: {
        width: "60%",
        height: "80%",
    },
    aboutButton: {
        width: "60%",
        height: "80%",
        marginLeft: 30
    }
});

export default HomeScreen;