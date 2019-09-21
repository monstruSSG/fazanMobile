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

import Background from '../../assets/Stuff/bg.jpg';
import HeaderBg from '../../assets/Stuff/singleplayerHeader.png';
import ExitButton from '../../assets/Buttons/exitButton.png';
import BluePanel from '../../assets/Stuff/bluePanel.png';
import LastWordImage from '../../assets/Stuff/titleBox.png';


class SingleplayerGameScreen extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        roundAnimation: new Animated.Value(1),
        lastWordAnimation: new Animated.Value(1),
        roundNumber: 0,
        gameFinished: false,
        lastWord: '',
        word: '',
        usedWords: [],
        showTimer: false,
        showWinModal: false,
        showLoseModal: false,
        showAtentionModal: false,
        showNotExistsModal: false
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
                showLoseModal: false,
                showWinModal: false,
                lastWord: startWord,
                word: startWord.slice(-2)
            }, this.resetTimer);
        })


    resetTimer = () => this.setState({ showTimer: false }, () => this.setState({ showTimer: true }))

    onInserWordHandler = () => {
        //First check if inserted word exists
        this.props.checkWordExists(this.state.word)
            .then(exists => {
                if (!exists) return Promise.reject({ message: 'WORD_NOT_EXISTS' });
                this.resetTimer();

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
                    setTimeout(() => this.setState({ showNotExistsModal: false }), 2000);
                } else {
                    console.log('INVALID_ERROR_MESSAGE');
                }
            })
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
                                    <CustomText large style={[styles.headerText]}>ROBOT</CustomText>
                                </View>
                                <View style={[styles.centerContent, { flex: 1 }]}>
                                    <View style={[styles.centerContent, { flex: 1 }]}>
                                        {this.state.showTimer ? <Timer style={styles.counter}
                                            onTimeExpired={count => this.onTimeExpiredHandler(count)}
                                            count={20} /> : null}
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
                                        <CustomText large style={styles.lastWord}>{this.state.lastWord}</CustomText>
                                    </Animated.View>
                                </ImageBackground>
                            </View>
                        </View>
                    </View>
                    <View style={[{ flex: 1 }, styles.centerContent]}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 2 }}>
                                <View style={{ width: '80%', height: '90%', borderWidth: 1, borderRadius: 10 }}>
                                    <CustomText>{this.state.word}</CustomText>
                                </View>
                            </View>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity
                                    style={styles.submitButton}
                                    onPress={this.onInserWordHandler}>
                                    <CustomText color="azure">TRIMITE</CustomText>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flex: 3 }}>
                            <Keyboard
                                letterPressed={letter => this.letterPressedHandler(letter)}
                                deleteLastLetter={() => this.deleteLastLetterHandler()} />
                        </View>
                    </View>
                    <WinModal isVisible={this.state.showWinModal}
                        cu={this.state.lastWord}
                        oponent='ROBOT'
                        rounds={this.state.roundNumber}
                        restart={this.restartGame}
                        home={this.navigateHomeHandler}
                        onClose={() => this.setState({ showWinModal: false }, this.navigateHomeHandler)} />
                    <LoseModal isVisible={this.state.showLoseModal}
                        cu={this.state.lastWord}
                        oponent='ROBOT'
                        rounds={this.state.roundNumber}
                        restart={this.restartGame}
                        home={this.navigateHomeHandler}
                        onClose={() => this.setState({ showLoseModal: false }, this.navigateHomeHandler)} />
                    <AtentionModal isVisible={this.state.showAtentionModal}
                        onClose={() => this.setState({ showAtentionModal: false })}
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