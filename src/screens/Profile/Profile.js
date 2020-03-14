import React, { Component } from 'react';
import { BackHandler, View, StyleSheet, TouchableOpacity, ImageBackground, Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import ProfileGameHistory from '../../components/ProfileGameHistory/ProfileGameHistory';
import { getMe } from '../../utils/requests';

import HeaderBackground from '../../assets/Stuff/profileGameHeaderBg.png';
import BackgroundImg from '../../assets/Stuff/bg.jpg';
import EmptyStar from '../../assets/Stuff/emptyStar.png';
import FullStar from '../../assets/Stuff/fullStar.png';
import BluePanel from '../../assets/Stuff/bluePanel.png';
import PointsBackground from '../../assets/Modals/titleShadow.png';
import ExitButton from '../../assets/Buttons/back.png';
import CustomText from '../../components/UI/Text/Text';
import LoadingModal from '../../components/Modals/LoadingModal';

class ProfileScreen extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        if (Platform.OS === 'android') this.didFocus = props.navigation.addListener("didFocus", () =>
            BackHandler.addEventListener("hardwareBackPress", this.onBack),
        );
    }

    navigateHomeScreen = () => this.props.navigation.navigate('Home');

    state = {
        me: {},
        history: [],
        logged: false,
        render: false
    }

    componentDidMount() {
        //For overriding default backButton behaviour
        if (Platform.OS === 'android') this.willBlur = this.props.navigation.addListener("willBlur", () =>
            BackHandler.removeEventListener("hardwareBackPress", this.onBack),
        );
        getMe(this.props.token)
            .then(user => this.setState({ me: user.user, history: user.history, render: true }));
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            this.didFocus.remove();
            this.willBlur.remove();
            BackHandler.removeEventListener("hardwareBackPress", this.onBack);
        }
    }

    onBack = () => this.navigateHomeScreen();

    render() {
        let { me, history } = this.state;
        let firstGame = history[0];
        let secondGame = history[1];
        let thirdGame = history[2];
        if (!me.loses && !me.wins) {
            winsPercent = 0
        } else {
            let winsPercent = ((me.loses / me.wins) * 100)
            winsPercent = winsPercent > 100 ? 100 : winsPercent.toFixed(0)
        }

        return (
            <ImageBackground source={BackgroundImg} style={{ flex: 1 }}>
                {!this.state.render ? <LoadingModal /> :
                    <View style={styles.content}>
                        <View style={[styles.centerContent, styles.topPanelContainer]}>
                            <ImageBackground source={HeaderBackground} resizeMode='stretch' style={[styles.maxWidthHeight]}>
                                <View style={[styles.centerContent, { flexDirection: 'row' }]}>
                                    <View style={[styles.exitButtonContainer]}>
                                        <TouchableOpacity style={[styles.centerContent, styles.maxWidthHeight]} onPress={this.navigateHomeScreen}>
                                            <Image source={ExitButton} resizeMode='contain' style={[styles.exitButton]} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={[styles.centerContent]}>
                                        <View style={[styles.usernameContainer]}>
                                            <CustomText large>{me.shortName}</CustomText>
                                        </View>
                                    </View>
                                </View>

                            </ImageBackground>
                        </View>
                        <View style={styles.gamesDataWrapper}>
                            <View style={styles.gamesDataStatusWrapper}>
                                <View style={[styles.centerContent, { flexDirection: 'row' }]}>
                                    <View style={[{ flex: 1 }]}>
                                        <View style={[styles.centerContent, styles.max]}>
                                            <ImageBackground source={BluePanel} style={[styles.bluePanel]} resizeMode='stretch'>
                                                <View style={[styles.centerContent]}>
                                                    <View style={[styles.centerContent, styles.winLosePosition, { top: '10%', bottom: undefined }]}>
                                                        <CustomText large>Wins</CustomText>
                                                    </View>
                                                    <View style={[styles.centerContent, styles.winLosePosition, { flexDirection: 'row' }]}>
                                                        <CustomText extra>{winsPercent}</CustomText>
                                                        <CustomText normal>%</CustomText>
                                                    </View>
                                                </View>
                                            </ImageBackground>
                                        </View>
                                    </View>
                                    <View style={[styles.centerContent, { flex: 2 }]}>
                                        <View style={[styles.centerContent, { flex: 1, width: '100%' }]}>
                                            <View style={[styles.centerContent, styles.maxWidthHeight]}>
                                                <ImageBackground style={[styles.maxWidthHeight, styles.pointsBackgroundPosition]} source={PointsBackground} resizeMode='stretch'>
                                                    <View style={[styles.centerContent]}>
                                                        <CustomText large style={styles.pointsPosition}>{this.state.me.score} P</CustomText>
                                                    </View>
                                                </ImageBackground>
                                            </View>
                                        </View>
                                        <View style={[styles.centerContent, { flex: 1 }]}>
                                            <CustomText normal>Nivel:
                                            <CustomText extra> {Math.floor(this.state.me.score / 10)}</CustomText>
                                            </CustomText>
                                        </View>
                                        <View style={[styles.centerContent, { flexDirection: 'row' }, { flex: 1 }]}>
                                            <View style={[styles.centerContent, { flex: 1 }]}>
                                                <View style={[styles.centerContent, styles.maxWidthHeight]}>
                                                    <ImageBackground style={[styles.littleStarsWidthHeight, { position: 'relative', left: '15%' }]} source={!firstGame ? EmptyStar : firstGame.outcome == 'won' ? FullStar : EmptyStar} resizeMode='contain'>
                                                        <View style={styles.centerContent}>
                                                            <CustomText large style={{ color: !firstGame ? 'white' : firstGame.outcome == 'won' ? 'green' : 'red' }}>
                                                                {!firstGame ? 'N' : firstGame.outcome == 'won' ? 'W' : 'L'}
                                                            </CustomText>
                                                        </View>
                                                    </ImageBackground>
                                                </View>
                                            </View>
                                            <View style={[styles.centerContent, { flex: 1 }]}>
                                                <View style={[styles.centerContent, styles.maxWidthHeight]}>
                                                    <ImageBackground style={[styles.maxWidthHeight, { position: 'relative', bottom: '20%' }]} source={!secondGame ? EmptyStar : secondGame.outcome == 'won' ? FullStar : EmptyStar} resizeMode='contain'>
                                                        <View style={styles.centerContent}>
                                                            <CustomText large style={{ color: !secondGame ? 'white' : secondGame.outcome == 'won' ? 'green' : 'red' }}>
                                                                {!secondGame ? 'N' : secondGame.outcome == 'won' ? 'W' : 'L'}
                                                            </CustomText>
                                                        </View>
                                                    </ImageBackground>
                                                </View>
                                            </View>
                                            <View style={[styles.centerContent, { flex: 1 }]}>
                                                <View style={[styles.centerContent, styles.maxWidthHeight]}>
                                                    <ImageBackground style={[styles.littleStarsWidthHeight, { position: 'relative', right: '15%' }]} source={!thirdGame ? EmptyStar : thirdGame.outcome == 'won' ? FullStar : EmptyStar} resizeMode='contain'>
                                                        <View style={[styles.centerContent]}>
                                                            <CustomText large style={{ color: !thirdGame ? 'white' : thirdGame.outcome == 'won' ? 'green' : 'red' }}>
                                                                {!thirdGame ? 'N' : thirdGame.outcome == 'won' ? 'W' : 'L'}
                                                            </CustomText>
                                                        </View>
                                                    </ImageBackground>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.lastGames}>
                                <View style={[styles.centerContent]}>
                                    <ProfileGameHistory name={firstGame ? firstGame.opponent.shortName : 'NO HISTORY'} win={firstGame ? firstGame.outcome === 'won' : false} none={firstGame ? false : true} />
                                </View>
                                <View style={[styles.centerContent]}>
                                    <ProfileGameHistory name={secondGame ? secondGame.opponent.shortName : 'NO HISTORY'} win={secondGame ? secondGame.outcome === 'won' : false} none={secondGame ? false : true} />
                                </View>
                                <View style={[styles.centerContent]}>
                                    <ProfileGameHistory name={thirdGame ? thirdGame.opponent.shortName : 'NO HISTORY'} win={thirdGame ? thirdGame.outcome === 'won' : false} none={thirdGame ? false : true} />
                                </View>
                            </View>
                        </View>
                    </View>
                }

            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    usernameContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '60%',
        width: '70%',
        position: 'relative',
        bottom: '14%'
    },
    exitButtonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '18%',
        height: '80%'
    },
    exitButton: {
        width: '70%',
        height: '70%',
        position: 'relative',
        bottom: '14%',
        right: '8%'
    },
    pointsBackgroundPosition: {
        position: 'relative',
        top: '20%'
    },
    pointsPosition: {
        position: 'relative',
        top: '11%',
        left: '1%'
    },
    winLosePosition: {
        position: 'relative',
        bottom: '20%'
    },
    bluePanel: {
        width: '100%',
        height: '60%',
        position: 'relative',
        left: '8%'
    },
    text: {
        fontFamily: 'Troika',
        fontSize: 40,
        color: 'red'
    },
    littleStarsWidthHeight: {
        width: '95%',
        height: '95%'
    },
    maxWidthHeight: {
        width: '100%',
        height: '100%'
    },
    profilePic: {
        flex: 1
    },
    headerName: {
        flex: 1,
        height: '100%'
    },
    headerWins: {
        flex: 1
    },
    topPanelImage: {
        width: '100%',
        height: '128%',
        position: 'relative',
        top: '3%'
    },
    topPanelContainer: {
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        flex: 1,
        justifyContent: 'center'
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1
    },
    gamesDataWrapper: {
        flex: 7,
    },
    gamesDataStatusWrapper: {
        height: '50%',
        flexDirection: 'row'
    },
    gamesDataStats: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    gamesData: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 14
    },
    lastGames: {
        flex: 1
    },
    textPointWrapper: {
        flex: 1,
    },
    levelPointWrapper: {
        flex: 1,
    },
    lastGamesStatus: {
        flex: 1,
        flexDirection: 'row'
    },
    textPoint: {
        fontSize: 43
    },
    levelPoint: {
        letterSpacing: 2,
        fontSize: 16
    },
    resultText: {
        paddingRight: 4,
        fontSize: 36
    },
    insidePie: {
        position: 'absolute',
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    insidePieText: {
        backgroundColor: 'transparent',
        fontSize: 24,
    },
});

const mapStateToProps = state => ({
    token: state.user.token
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withNavigation(ProfileScreen));