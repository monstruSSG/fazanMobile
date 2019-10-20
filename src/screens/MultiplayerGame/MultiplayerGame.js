import React, { Component } from 'react';
import { View, StyleSheet, Animated, ImageBackground, TouchableOpacity, Image, Easing } from 'react-native';
import { connect } from 'react-redux';

import Keyboard from '../../components/UI/Keyboard/Keyboard';
import * as SOCKET from '../../store/actions/socket';
import CONSTANTS from '../../utils/constants';
import Timer from '../../components/Timer/Timer';
import LoseModal from '../../components/Modals/LoseModal';
import WinModal from '../../components/Modals/WinModal';
import AtentionModal from '../../components/Modals/AtentionModal';
import NotExistsModal from '../../components/Modals/NotExist';
import Background from '../../assets/Stuff/bg.jpg';
import CustomText from '../../components/UI/Text/Text';
import InputAnimation from '../../screens/SingleplayerGame/InputAnimation';
import OponentMoving from '../../screens/SingleplayerGame/OponentMovingDots';


import HeaderBg from '../../assets/Stuff/singleplayerHeader.png';
import ExitButton from '../../assets/Buttons/exitButton.png';
import BluePanel from '../../assets/Stuff/bluePanel.png';
import LastWordImage from '../../assets/Stuff/titleBox.png';
import SendWord from '../../assets/Buttons/sendWord.png';

class MultiplayerGameScreen extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        roundAnimation: new Animated.Value(1),
        lastWordAnimation: new Animated.Value(1),
        keyboardAnimation: new Animated.Value(1),
        roundNumber: 0,
        gameFinished: false,
        lastWord: '',
        word: '',
        showTimer: false,
        showWinModal: false,
        showLoseModal: false,
        showAtentionModal: false,
        showNotExistsModal: false,
        oponentMoving: true
    }

    waitingForOponent = word => {

    }

    componentDidMount() {
        this.props.socket.on('gotWord', data => {
            console.log(data, 'WORDDDDDD')
            this.resetTimer();
            this.setState(prevState => ({
                roundNumber: prevState.roundNumber + 1
            }));
            this.resetTimer()
            this.onGotWordHandler(data.word)
            this.setState({ oponentMoving: false })
            this.keyboardFadeIn()
        });

        this.props.socket.on('gameOver', data => {
            console.log(data, 'GAME OVEEERRR');
            this.setState({ showLoseModal: true, showTimer: false })
            this.props.socket.off('gameOver')
            this.props.socket.off('youWon')
        })

        this.props.socket.on('oponentIsThinking', data => this.watingForOponent(data.word))

        this.props.socket.on('youWon', data => {
            //oponentDisconnected timeExipired
            this.setState({ showWinModal: true })
            this.props.socket.off('gameOver')
            this.props.socket.off('youWon')
        })

        //this.props.socket.on('wordNotExists', data => this.wordNotExistsHandler(data.exists))
    }

    componentWillUnmount() {
        return this.props.socket.emit('exitGame', { socketId: this.props.oponentSocketId });
    }

    onGotWordHandler = word => this.setState({ lastWord: word, word: word.slice(-2), showTimer: true }, this.newLatestWordAnimation)

    //Animations
    keyboardFadeOut = () => Animated.timing(this.state.keyboardAnimation, {
        toValue: 0.4,
        duration: 300,
        useNativeDriver: true
    }).start()

    keyboardFadeIn = () => Animated.timing(this.state.keyboardAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
    }).start()
    //Round increment animation
    roundIncrementAnimation = () => Animated.timing(this.state.roundAnimation, {
        toValue: 0.97,
        useNativeDriver: true,
        duration: 200
    }).start(() => this.setState(prevState => ({
        roundNumber: prevState.roundNumber + 1
    }), () => Animated.timing(this.state.roundAnimation, {
        toValue: 1,
        easing: Easing.bounce,
        useNativeDriver: true,
        duration: 600
    }).start()))

    newLatestWordAnimation = () => Animated.timing(this.state.lastWordAnimation, {
        toValue: 0.97,
        useNativeDriver: true,
        duration: 200
    }).start(() => Animated.timing(this.state.lastWordAnimation, {
        toValue: 1,
        easing: Easing.bounce,
        useNativeDriver: true,
        duration: 200
    }).start())

    wordNotExistsHandler = exists => {
        if (!exists) return alert('Here let the user know that the inserted word does not exist');
    }

    navigateSearchGame = () => this.props.navigation.navigate('SearchGame');
    navigateHomeHandler = () => this.props.navigation.navigate('Home');

    exitGame = () => {
        this.props.closeSocketConnection().then(() => {
            this.navigateSearchGame()
        });
    }

    insertWordHandler = () => {
        let { word, usedWords } = this.state;

        this.props.socket.emit('sendWord', { word, socketId: this.props.oponentSocketId });
        this.keyboardFadeOut();
        this.setState({ showTimer: false, oponentMoving: true })
    }

    deleteLastLetterHandler = () => {
        this.setState((prevState) => ({
            word: prevState.word.length <= 2 ? prevState.word : prevState.word.slice(0, -1)
        }))
    }

    onTimeExpiredHandler = time => {
        if (time < 0 ) {
            return this.props.socket.emit('iLost', { socketId: this.props.oponentSocketId, word: this.state.lastWord })
        }
    }

    resetTimer = () => this.setState({
        showTimer: false
    }, () => this.setState({
        showTimer: true
    }))

    letterPressedHandler = letter => {
        this.setState((prevState) => ({
            word: prevState.word.concat(letter)
        }))
    }

    render() {
        //Animations configuration
        const roundIncrementScale = {
            transform: [
                {
                    scale: this.state.roundAnimation
                }
            ]
        };

        const lastWordScale = {
            transform: [
                {
                    scale: this.state.lastWordAnimation
                }
            ]
        };

        return (
            <ImageBackground source={Background} style={[styles.maxWidthHeight]}>
                <View style={[styles.maxWidthHeight, { alignItems: 'center' }]}>
                    <View style={[{ width: '100%', height: '14%' }]}>
                        <ImageBackground source={HeaderBg} style={styles.maxWidthHeight} resizeMode='stretch'>
                            <View style={[styles.maxWidthHeight, { flexDirection: 'row' }]}>
                                <View style={[styles.centerContent, { flex: 1 }]}>
                                    <TouchableOpacity style={[styles.centerContent, styles.exitButtonSize, styles.exitButtonPosition]}
                                        onPress={() => this.setState({ showAtentionModal: true })}>
                                        <Image source={ExitButton} style={[styles.maxWidthHeight]} resizeMode='stretch' />
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.centerContent, { flex: 1 }]}>
                                    <CustomText large style={[styles.headerText]}>{this.props.oponentName}</CustomText>
                                </View>
                                <View style={[styles.centerContent, { flex: 1 }]}>
                                    <View style={[styles.centerContent, { flex: 1 }]}>
                                        {this.state.showTimer === true ? <Timer style={styles.counter}
                                            onTimeExpired={count => this.onTimeExpiredHandler(count)}
                                            count={15} /> : <CustomText style={styles.counter} normal>OP</CustomText>}
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={[styles.centerContent, { width: '100%', height: '50%' }]}>
                        <View style={[styles.centerContent, { width: '30%', flex: 1, position: 'relative', top: '10%' }]}>
                            <ImageBackground source={BluePanel}
                                style={[styles.centerContent, styles.maxWidthHeight]}
                                resizeMode='stretch'>
                                <View style={[styles.centerContent, { flex: 1 }]}>
                                    <View style={[{ flex: 1, justifyContent: 'flex-end' }]}>
                                        <CustomText small style={styles.roundText}>RUNDA</CustomText>
                                    </View>
                                    <Animated.View style={[{ flex: 1 }, roundIncrementScale]}>
                                        <CustomText large style={styles.roundNumber}>{this.state.roundNumber}</CustomText>
                                    </Animated.View>
                                </View>
                            </ImageBackground>
                        </View>
                        <View style={[{ width: '100%', flex: 3, alignItems: 'center' }]}>
                            <View style={[styles.centerContent, { flex: 1 }]}>
                                <CustomText normal>ULTIMUL CUVANT</CustomText>
                            </View>
                            <View style={[{ height: '30%', width: '90%', position: 'relative', bottom: '25%' }, styles.centerContent]}>
                                <ImageBackground source={LastWordImage}
                                    style={[styles.maxWidthHeight]}
                                    resizeMode='stretch'>
                                    <Animated.View style={[styles.centerContent, { width: '100%', height: '60%' }, lastWordScale]}>
                                        {!this.state.oponentMoving ?
                                            <CustomText large style={styles.lastWord}>{this.state.lastWord}</CustomText> :
                                            <OponentMoving style={styles.oponentMovingLastWord} message='' />}
                                    </Animated.View>
                                </ImageBackground>
                            </View>
                        </View>
                    </View>
                    <View style={[{ flex: 1 }, styles.centerContent]}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'center', borderBottomColor: '#FBFFB7', borderBottomWidth: 5 }}>
                                {this.state.oponentMoving ?
                                    <OponentMoving message='RANDUL OPONENTULUI' /> :
                                    <>
                                        <View style={{ width: '60%', height: '90%', justifyContent: 'center', flexDirection: 'row' }}>
                                            <CustomText style={{ fontSize: 26 }}>{this.state.word}</CustomText>
                                            <InputAnimation />
                                        </View>
                                        <TouchableOpacity
                                            style={styles.submitButton}
                                            onPress={this.insertWordHandler}
                                            style={{ width: '25%', height: '90%', justifyContent: 'center' }}>
                                            <ImageBackground imageStyle={{ height: 50, width: 50, position: 'relative', bottom: '8%' }} source={SendWord} resizeMode="center" style={styles.submitButtonText} />
                                        </TouchableOpacity>
                                    </>}
                            </View>
                        </View>
                        <Animated.View style={{ flex: 3, opacity: this.state.keyboardAnimation }}>
                            <Keyboard
                                letterPressed={letter => this.letterPressedHandler(letter)}
                                deleteLastLetter={() => this.deleteLastLetterHandler()} />
                        </Animated.View>
                    </View>
                    <WinModal isVisible={this.state.showWinModal}
                        cu={this.state.lastWord}
                        oponent={this.props.oponentName}
                        rounds={this.state.roundNumber}
                        restart={this.restartGame}
                        home={this.navigateSearchGame}
                        onClose={this.navigateHomeHandler}
                        to='SEARCH'
                        mp />
                    <LoseModal isVisible={this.state.showLoseModal}
                        cu={this.state.lastWord}
                        oponent={this.state.oponentName}
                        rounds={this.state.roundNumber}
                        restart={this.restartGame}
                        home={this.navigateSearchGame}
                        onClose={this.navigateHomeHandler}
                        to='SEARCH'
                        mp />
                    <AtentionModal isVisible={this.state.showAtentionModal}
                        onContinue={() => this.setState({ showAtentionModal: false })}
                        onClose={this.navigateHomeHandler}
                    />
                    <NotExistsModal isVisible={this.state.showNotExistsModal}
                        word={this.state.word}
                        onClose={() => this.setState({ showNotExistsModal: false })} />

                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    oponentMovingLastWord: {
        position: 'relative',
        top: '3%'
    },
    lastWord: {
        position: 'relative',
        top: '32%'
    },
    roundNumber: {
        position: 'relative',
        bottom: '45%'
    },
    roundText: {
        position: 'relative',
        bottom: '20%'
    },
    counter: {
        position: 'relative',
        bottom: '13%',
        right: '13%'
    },
    headerText: {
        position: 'relative',
        bottom: '13%'
    },
    exitButtonSize: {
        width: '40%',
        height: '70%'
    },
    exitButtonPosition: {
        position: 'relative',
        right: '27%',
        bottom: '3%'
    },
    cell: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    myInput: {
        flex: 1,
        flexDirection: 'column',
        width: "100%",
    },
    inputText: {
        borderColor: CONSTANTS.textColor,
        borderWidth: 0,
        padding: 0,
        marginTop: 0,
        marginBottom: 0,
        right: '28%',
        bottom: '5%'
    },
    maxWidthHeight: {
        width: '100%',
        height: '100%'
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitButton: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '100%',
        width: '100%'
    },
    submitButtonText: {
        fontFamily: 'Troika',
        alignItems: 'flex-end'
    }
});

const mapStateToProps = state => ({
    socket: state.socket.socket,
    oponentSocketId: state.socket.oponentSocketId,
    oponentName: state.user.oponentName
});

const mapDispatchToProps = dispatch => ({
    closeSocketConnection: () => dispatch(SOCKET.closeSocketConnection())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MultiplayerGameScreen);
