import React, { Component } from 'react';
import { View, KeyboardAvoidingView, StyleSheet, Animated, Button, ImageBackground } from 'react-native';
import { connect } from 'react-redux';

import * as WORDS from '../../store/actions/words';
import CONSTANTS from '../../utils/constants';
import LoseTitle from '../../assets/loseTitle3.png';
import WinTitle from '../../assets/winmessage.png';
import Text from '../../components/UI/Text/Text';
import Input from '../../components/UI/DefaultInput/DefaultInput';
import Timer from '../../components/Timer/Timer';
import LoseModal from '../../components/Modals/LoseModal';
import WinModal from '../../components/Modals/WinModal';
import BackgroudImage from '../../assets/back.png';

class SingleplayerGameScreen extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        animation: new Animated.Value(1),
        animationOpWord: new Animated.Value(0),
        animationYourWord: new Animated.Value(0),
        usedWords: [],
        words: [],
        word: '',
        lastWord: '',
        opLastWord: '',
        yourLastWord: '',
        gameFinished: false,
        showTimer: true,
        loseModal: false,
        winModal: false
    }

    componentDidMount() {
        this.props.connectToDb()
            .then(this.generateStartWord)
            .then(startWord => this.setState({
                lastWord: startWord,
                word: startWord.slice(-2)
            }))
    }

    generateStartWord = () => this.props.generateStartWord();

    navigateHomeScreen = () => this.props.navigation.navigate('Home');

    generateWord = word => this.props.generateWord(word)

    checkWordExists = word => this.props.checkWordExists(word)

    checkWordExistsWithPrefix = word => this.props.checkWordExistsWithPrefix(word.slice(-2))

    componentWillUnmount() {
        this.props.closeDbConnection()
    }

    onTimeExpiredHandler = time => {
        if (time < 0) return this.setState({ gameFinished: true, loseModal: true })
    }

    insertWordHandler = () => {
        let { word, usedWords } = this.state;

        return this.checkWordExists(word)
            .then(existsWord => {
                if (!existsWord) return Promise.reject({ message: 'WORD_NOT_EXISTS' });
                if (usedWords.includes(word)) return Promise.reject({ message: 'WORD_ALREADY_USED' });

                return this.checkWordExistsWithPrefix(word)
            })
            .then(existsWordWithPrefix => {
                if (!existsWordWithPrefix) return Promise.reject({ message: 'GAME_FINISHED_WIN' })

                // Reset timer
                this.resetTimer();

                // Start animation for user inserted word
                this.startYourWordAnimation(word);

                return this.generateWord(word);
            })
            .then(nextWord => {

                if (nextWord.length < 1) return Promise.reject({ message: 'GAME_FINISHED_LOSE' })
                if (usedWords.includes(nextWord)) return Promise.reject({ message: 'GAME_FINISHED_WIN' })

                // Reset timer
                this.resetTimer();

                // Start animation for AI generated word
                this.startOpWordAnimation(nextWord);

                this.setState(prevState => ({
                    usedWords: prevState.usedWords.concat([prevState.word, nextWord]),
                    word: nextWord.slice(-2),
                    words: prevState.words.concat([prevState.word, nextWord])
                }), () => this.startCurrentWordAnimation(word))
            })
            .catch(err => {
                if (err.message === 'GAME_FINISHED_WIN') return this.setState({ winModal: true, gameFinished: true })
                if (err.message === 'GAME_FINISHED_LOSE') return this.setState({ loseModal: true, gameFinished: true });
            })
    }

    onWordChangeHandler = word => {

        this.setState({ word })
    }

    newGame = () => this.generateStartWord()
        .then(firstWord => this.setState({
            usedWords: [],
            words: [],
            word: firstWord.slice(-2),
            lastWord: firstWord,
            opLastWord: '',
            yourLastWord: '',
            gameFinished: false,
            loseModal: false
        }))

    startCurrentWordAnimation = word => {
        Animated.timing(this.state.animation, {
            toValue: 0,
            duration: 200
        }).start(() =>
            this.setState({ lastWord: word }, () => {
                Animated.timing(this.state.animation, {
                    toValue: 1,
                    duration: 200
                }).start()
            }))
    }

    startOpWordAnimation = word => {
        Animated.timing(this.state.animationOpWord, {
            toValue: 1,
            duration: 800
        }).start(() => this.setState({
            opLastWord: word.trim()
        }, () => Animated.timing(this.state.animationOpWord, {
            toValue: 0,
            duration: 500
        }).start()))
    }

    startYourWordAnimation = word => {
        Animated.timing(this.state.animationYourWord, {
            toValue: 1,
            duration: 500
        }).start(() => {
            this.setState({
                yourLastWord: word.trim()
            }, () => {
                Animated.timing(this.state.animationYourWord, {
                    toValue: 0,
                    duration: 300
                }).start()
            })
        })
    }

    resetTimer = () => this.setState({
        showTimer: false
    }, () => this.setState({
        showTimer: true
    }))

    render() {
        const animatedStyle = {
            transform: [
                {
                    scaleX: this.state.animation
                }
            ]
        };

        const yourWordAnimationStyle = {
            left: this.state.animationYourWord.interpolate({
                inputRange: [0, 1],
                outputRange: ['-30%', '-100%']
            })
        }

        const opWordAnimationStyle = {
            right: this.state.animationOpWord.interpolate({
                inputRange: [0, 1],
                outputRange: ['-30%', '-100%']
            })
        }

        return (
            <ImageBackground source={BackgroudImage} style={{ width: '100%', height: '100%' }}>
                <KeyboardAvoidingView
                    style={styles.singlePlayerContainer} >
                    <View style={styles.header}>
                        <View style={styles.cell}>
                            <Text>Silviu MSR</Text>
                        </View>
                        <View style={styles.cell}>
                            {!this.state.gameFinished && this.state.showTimer && <Timer
                                count={5}
                                onTimeExpired={this.onTimeExpiredHandler}
                            />}
                        </View>
                        <View style={styles.cell}>
                            <Text>Bogdan Smecherul</Text>
                        </View>
                    </View>
                    <View style={styles.lastWords}>
                        <Animated.View
                            style={[styles.oponentInput, styles.currentWordContainer, animatedStyle]}>
                            <Text color="black" style={styles.currentWord}>{this.state.lastWord}</Text>
                        </Animated.View>
                        <Animated.View style={[styles.yourLastWordContainer, yourWordAnimationStyle]}>
                            <Text color="white" style={[styles.center, styles.yourLastWord]}>{this.state.yourLastWord}</Text>
                        </Animated.View>
                        <Animated.View style={[styles.opLastWordContainer, opWordAnimationStyle]}>
                            <Text color="white" style={[styles.center, styles.opLastWord]}>{this.state.opLastWord}</Text>
                        </Animated.View>
                    </View>
                    <View style={styles.myInput}>
                        <View style={styles.submitForm}>
                            <Input
                                style={styles.inputText}
                                value={this.state.word}
                                onChangeText={word => this.onWordChangeHandler(word.trim())}
                                placeholder='Introdu un cuvant...'
                            />
                            <Button style={styles.submitButton} onPress={this.insertWordHandler} color={CONSTANTS.buttonColor} title="TRIMITE" />
                        </View>
                    </View>
                    <LoseModal
                        isVisible={this.state.loseModal}
                        onClose={() => this.setState({ loseModal: false })}
                        title={LoseTitle}
                        playAgain={() => this.newGame()}
                        exitGame={() => this.navigateHomeScreen()}
                    />
                    <WinModal
                        isVisible={this.state.winModal}
                        onClose={() => this.setState({ winModal: false })}
                        title={WinTitle}
                        playAgain={() => this.newGame()}
                        exitGame={() => this.navigateHomeScreen()}
                    />
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    singlePlayerContainer: {
        flex: 1,
        alignItems: "center",
    },
    logo: {
        width: '100%',
        height: '100%'
    },
    oponentInput: {
        width: '80%',
        alignItems: 'center',
        fontSize: 20,
        color: CONSTANTS.buttonColor
    },
    center: {
        textAlign: 'left'
    },
    yourLastWordContainer: {
        borderTopLeftRadius: 40,
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
        borderTopRightRadius: 40,
        borderWidth: 2,
        borderBottomWidth: 2,
        borderTopWidth: 0,
        marginTop: 12,
        marginLeft: 12,
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
        height: "30%",
        width: "100%"
    },
    opLastWordContainer: {
        borderTopLeftRadius: 40,
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
        borderTopRightRadius: 40,
        borderWidth: 2,
        borderBottomWidth: 2,
        borderTopWidth: 0,
        marginTop: 12,
        marginLeft: 12,
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
        height: "30%",
        width: "100%"
    },
    currentWordContainer: {
        borderTopLeftRadius: 40,
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
        borderTopRightRadius: 40,
        borderWidth: 2,
        borderBottomWidth: 2,
        borderTopWidth: 0,
        marginTop: 12,
        marginLeft: 12,
        marginRight: 12,
        justifyContent: "center",
        alignItems: "center",
        height: '30%',
        width: "100%"
    },
    yourLastWord: {
        fontSize: 20
    },
    opLastWord: {
        fontSize: 20
    },
    lastWords: {
        flex: 1,
        width: '80%',
        alignItems: "center",
        justifyContent: "flex-end"
    },
    currentWord: {
        fontSize: 20
    },
    header: {
        flex: 1,
        height: '15%',
        flexDirection: 'row'
    },
    cell: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    myInput: {
        flex: 1,
        width: "80%",
        alignItems: "center",
        justifyContent: "center"
    },
    inputText: {
        borderColor: CONSTANTS.textColor,
        borderWidth: 0,
        padding: 0,
        marginTop: 0,
        marginBottom: 0,
    },
    submitForm: {
        borderWidth: 2,
        borderRadius: 10,
        flexDirection: 'row'
    },
    textInput: {
        paddingRight: 6
    },
    submitButton: {
        padding: 0,
        margin: 0,
        marginBottom: 0,
        marginTop: 0,
        borderRadius: 0,
        borderColor: "black"
    },
    myInputTitle: {
        flex: 1,
        justifyContent: "flex-end"
    },
    modalViewContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalDetails: {
        height: "50%",
        width: "75%",
        backgroundColor: "red"
    },
    loseModal: {
        width: 50,
        height: 50
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