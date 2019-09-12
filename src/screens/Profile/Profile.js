import React, { Component } from 'react';
import { View, StyleSheet, FlatList, ImageBackground, Text } from 'react-native';

import HeaderBackground from '../../assets/Modals/topPanelBackground.png';
import BackgroundImg from '../../assets/Stuff/bg.jpg';
import CONSTANTS from '../../utils/constants';
import Header from '../../components/Header/Header';
import GameDetails from '../../components/GameDetails/GameDetails';
import UserImage from '../../assets/c.jpg'
import EmptyStar from '../../assets/Stuff/emptyStar.png';
import FullStar from '../../assets/Stuff/fullStar.png';
import BluePanel from '../../assets/Stuff/bluePanel.png';
import ProfileGameHistory from '../../components/ProfileGameHistory/ProfileGameHistory';
import PointsBackground from '../../assets/Modals/titleShadow.png';

import { getMe } from '../../utils/requests';

class ProfileScreen extends Component {
    static navigationOptions = {
        header: null,
    }

    navigateHomeScreen = () => this.props.navigation.navigate('Home');

    state = {
        me: {}
    }

    componentDidMount() {
        getMe().then(me => this.setState({ me }))
    }

    render() {
        const losesProcent = (this.state.me.wins / (this.state.me.loses + this.state.me.wins)) * 100

        return (
            <ImageBackground source={BackgroundImg} style={{ flex: 1 }}>
                <View style={styles.content}>
                    <View style={[styles.centerContent, styles.topPanelContainer]}>
                        <Text>HEADER</Text>
                    </View>
                    <View style={styles.gamesDataWrapper}>
                        <View style={styles.gamesDataStatusWrapper}>
                            <View style={[styles.centerContent, { flexDirection: 'row' }]}>
                                <View style={[{ flex: 1 }]}>
                                    <View style={[styles.centerContent, styles.max]}>
                                        <ImageBackground source={BluePanel} style={[styles.bluePanel]} resizeMode='stretch'>
                                            <View style={[styles.centerContent]}>
                                                <View style={[styles.centerContent, styles.winLosePosition, { top: '10%', bottom: undefined }]}>
                                                    <Text style={[styles.text, { color: 'white' }]}>W/L</Text>
                                                </View>
                                                <View style={[styles.centerContent, styles.winLosePosition, { flexDirection: 'row' }]}>
                                                    <Text style={[styles.text, { color: 'white', fontSize: 50 }]}>80</Text>
                                                    <Text style={[styles.text, { color: 'white', fontSize: 25 }]}>%</Text>
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
                                                    <Text style={[styles.text,  styles.pointsPosition, { color: 'white' }]}>288 P</Text>
                                                </View>
                                            </ImageBackground>
                                        </View>
                                    </View>
                                    <View style={[styles.centerContent, { flex: 1 }]}>
                                        <Text style={{ fontSize: 30, fontFamily: 'Troika', color: 'white' }}>Nivel:
                                            <Text style={{ fontSize: 55, fontFamily: 'Troika', color: 'white' }}> 66</Text>
                                        </Text>
                                    </View>
                                    <View style={[styles.centerContent, { flexDirection: 'row' }, { flex: 1 }]}>
                                        <View style={[styles.centerContent, { flex: 1 }]}>
                                            <View style={[styles.centerContent, styles.maxWidthHeight]}>
                                                <ImageBackground style={[styles.littleStarsWidthHeight, { position: 'relative', left: '15%' }]} source={EmptyStar} resizeMode='contain'>
                                                    <View style={styles.centerContent}>
                                                        <Text style={styles.text}>L</Text>
                                                    </View>
                                                </ImageBackground>
                                            </View>
                                        </View>
                                        <View style={[styles.centerContent, { flex: 1 }]}>
                                            <View style={[styles.centerContent, styles.maxWidthHeight]}>
                                                <ImageBackground style={[styles.maxWidthHeight, { position: 'relative', bottom: '20%' }]} source={FullStar} resizeMode='contain'>
                                                    <View style={[styles.centerContent]}>
                                                        <Text style={[styles.text, { color: 'green', fontSize: 50 }]}>W</Text>
                                                    </View>
                                                </ImageBackground>
                                            </View>
                                        </View>
                                        <View style={[styles.centerContent, { flex: 1 }]}>
                                            <View style={[styles.centerContent, styles.maxWidthHeight]}>
                                                <ImageBackground style={[styles.littleStarsWidthHeight, { position: 'relative', right: '15%' }]} source={EmptyStar} resizeMode='contain'>
                                                    <View style={[styles.centerContent]}>
                                                        <Text style={styles.text}>L</Text>
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
                                <ProfileGameHistory name='Cozloschi Raul' win />
                            </View>
                            <View style={[styles.centerContent]}>
                                <ProfileGameHistory name='Giurgi Smecheru' />
                            </View>
                            <View style={[styles.centerContent]}>
                                <ProfileGameHistory name='Raul Aka BUBU' win />
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    pointsBackgroundPosition: {
        position: 'relative',
        top: '10%'
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
        height: '50%'
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

export default ProfileScreen;