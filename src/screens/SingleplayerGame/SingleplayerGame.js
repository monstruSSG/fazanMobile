import React, { Component } from 'react';
import { View, StyleSheet, Animated, Easing, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import Keyboard from '../../components/UI/Keyboard/Keyboard';

import * as WORDS from '../../store/actions/words';
import CONSTANTS from '../../utils/constants';
import CustomText from '../../components/UI/Text/Text';
import Timer from '../../components/Timer/Timer';
import LoseModal from '../../components/Modals/LoseModal';
import WinModal from '../../components/Modals/WinModal';
import AtentionModal from '../../components/Modals/AtentionModal';
import NotExistsModal from '../../components/Modals/NotExist';
import Count from '../../components/Modals/StartGameModal';
import OponentMovingDots from './OponentMovingDots';
import Header from './Header/Header';
import InputAnimation from './InputAnimation';

import Background from '../../assets/Stuff/bg.jpg';
import BluePanel from '../../assets/Stuff/bluePanel.png';
import LastWordImage from '../../assets/Stuff/titleBox.png';
import SendWord from '../../assets/Buttons/sendWord.png';

class SingleplayerGameScreen extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        roundAnimation: new Animated.Value(1),
        lastWordAnimation: new Animated.Value(1),
        keyboardAnimation: new Animated.Value(1),
        inputAnimation: new Animated.Value(1),
        roundNumber: 0,
        gameFinished: false,
        lastWord: '',
        word: '',
        usedWords: [],
        showTimer: false,
        showWinModal: false,
        showLoseModal: false,
        showAtentionModal: false,
        showNotExistsModal: false,
        showCountModal: true,
        oponentMoving: false
    }

    componentDidMount() {
        this.props.connectToDb()
            .then(() => {
                this.props.generateStartWord()
                    .then(word => this.setState({ lastWord: word, word: word.slice(-2), showTimer: true }))
                    .catch(e => console.log(e))
            })
     
    }

    //Animations
    inputAnimation = () => Animated.loop([
        Animated.timing(this.state.inputAnimation, {
            toValue: 0.4,
            duration: 200
        })
    ]).start()

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

    navigateHomeHandler = () => this.props.navigation.navigate('Home');

    onTimeExpiredHandler = count => {
        if (count < 0) this.setState({ gameFinished: true, showLoseModal: true, showTimer: false })
    }

    letterPressedHandler = letter => {
        this.setState((prevState) => ({
            word: prevState.word.concat(letter)
        }))
    }

    deleteLastLetterHandler = () => {
        this.setState((prevState) => ({
            word: prevState.word.length <= 2 ? prevState.word : prevState.word.slice(0, -1)
        }))
    }

    restartGame = () => this.props.generateStartWord()
        .then(startWord => {
            this.setState({
                showCountModal: true,
                showLoseModal: false,
                showWinModal: false,
                oponentMoving: false,
                lastWord: startWord,
                word: startWord.slice(-2),
                roundNumber: 0
            }, this.resetTimer);
        })


    resetTimer = () => this.setState({ showTimer: false }, () => this.setState({ showTimer: true }))

    onInserWordHandler = () => {
        //First check if inserted word exists
        this.props.checkWordExists(this.state.word)
            .then(exists => {
                if (!exists) return Promise.reject({ message: 'WORD_NOT_EXISTS' });
                this.resetTimer();
                this.keyboardFadeOut();
                this.setState({ oponentMoving: true });
                return this.props.generateWord(this.state.word);
            })
            .then(generatedWord => {
                if (!generatedWord) return Promise.reject({ message: 'YOU_WON' });

                //Here the 'AI' generates a word
                this.setState({ lastWord: generatedWord, word: generatedWord.slice(-2) }, this.newLatestWordAnimation);
                this.resetTimer();
                this.roundIncrementAnimation();
                return this.props.checkWordExistsWithPrefix(generatedWord)
            })
            .then(exists => {
                if (!exists) return Promise.reject({ message: 'YOU_LOST' });
                this.setState({ oponentMoving: false });
                this.keyboardFadeIn();
            })
            .catch(e => {
                if (!e.message) return console.log(e);

                if (e.message === 'YOU_LOST') {
                    return this.setState({ showLoseModal: true });
                } else if (e.message === 'YOU_WON') {
                    return this.setState({ showWinModal: true });
                } else if (e.message === 'WORD_NOT_EXISTS') {
                    this.setState({ showNotExistsModal: true });
                    //close after 2 second
                    setTimeout(() => this.setState({ showNotExistsModal: false }), 1500);
                } else {
                    console.log('INVALID_ERROR_MESSAGE');
                }
            })
    }

    onCountTimeExiredHandler = count => {
        if (count < 1) this.setState({ showCountModal: false });
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
                {this.state.showCountModal ?
                    <Count count={3} onTimeExpired={this.onCountTimeExiredHandler} /> :
                    <View style={[styles.maxWidthHeight, { alignItems: 'center' }]}>
                        <View style={[{ width: '100%', height: '14%' }]}>
                            <Header headerTitle='ROBOT' count={20} showTimer={this.state.showTimer} onTimeExpired={this.onTimeExpiredHandler} />
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
                                    <CustomText large>ULTIMUL CUVANT</CustomText>
                                </View>
                                <View style={[{ height: '30%', width: '90%', position: 'relative', bottom: '25%' }, styles.centerContent]}>
                                    <ImageBackground source={LastWordImage}
                                        style={[styles.maxWidthHeight]}
                                        resizeMode='stretch'>
                                        <Animated.View style={[styles.centerContent, { width: '100%', height: '60%' }, lastWordScale]}>
                                            <CustomText normal style={styles.lastWord}>{this.state.lastWord}</CustomText>
                                        </Animated.View>
                                    </ImageBackground>
                                </View>
                            </View>
                        </View>
                        <View style={[{ flex: 1 }, styles.centerContent]}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'center', borderBottomColor: '#FBFFB7', borderBottomWidth: 5 }}>
                                    {this.state.oponentMoving ?
                                        <OponentMovingDots message='RANDUL OPONENTULUI' /> :
                                        <>
                                            <Animated.View style={{ width: '60%', height: '90%', justifyContent: 'center', flexDirection: 'row' }}>
                                                <CustomText style={{ fontSize: 26 }}>{this.state.word}</CustomText>
                                                <InputAnimation />
                                            </Animated.View>
                                            <TouchableOpacity
                                                style={styles.submitButton}
                                                onPress={this.onInserWordHandler}
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
                            oponent='ROBOT'
                            rounds={this.state.roundNumber}
                            restart={this.restartGame}
                            home={this.navigateHomeHandler}
                            onClose={this.navigateHomeHandler}
                            to='home' />
                        <LoseModal isVisible={this.state.showLoseModal}
                            cu={this.state.lastWord}
                            oponent='ROBOT'
                            rounds={this.state.roundNumber}
                            restart={this.restartGame}
                            home={this.navigateHomeHandler}
                            onClose={this.navigateHomeHandler}
                            to='home' />
                        <AtentionModal isVisible={this.state.showAtentionModal}
                            onContinue={() => this.setState({ showAtentionModal: false })}
                            onClose={this.navigateHomeHandler}
                        />
                        <NotExistsModal isVisible={this.state.showNotExistsModal}
                            word={this.state.word}
                            onClose={() => this.setState({ showNotExistsModal: false })} />

                    </View>
                }
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
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
    db: state.words.db
})

const mapDispatchToProps = dispatch => ({
    connectToDb: () => dispatch(WORDS.connectToDb()),
    closeDbConnection: () => dispatch(WORDS.closeDbConnection()),
    checkWordExists: word => dispatch(WORDS.checkWordExists(word)),
    checkWordExistsWithPrefix: prefix => dispatch(WORDS.checkWordExistsWithPrefix(prefix)),
    generateWord: word => dispatch(WORDS.generateWord(word)),
    generateStartWord: () => dispatch(WORDS.generateStartWord())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleplayerGameScreen);