import React, { Component } from 'react';
import {
    View, KeyboardAvoidingView, StyleSheet,
    Image, Animated, Button
} from 'react-native';
import { connect } from 'react-redux';

import * as WORDS from '../../store/actions/words'
import CONSTANTS from '../../utils/constants';
import Text from '../../components/UI/Text/Text';
import Input from '../../components/UI/DefaultInput/DefaultInput';
import Timer from '../../components/Timer/Timer';

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
        showTimer: true
    }

    componentDidMount() {
        this.props.connectToDb()
            .then(this.props.generateStartWord)
            .then(startWord => this.setState({
                lastWord: startWord,
                word: startWord.slice(-2)
            }))
    }

    generateWord = word => this.props.generateWord(word)

    checkWordExists = word => this.props.checkWordExists(word)

    checkWordExistsWithPrefix = word => this.props.checkWordExistsWithPrefix(word.slice(-2))

    componentWillUnmount() {
        this.props.closeDbConnection()
    }

    onTimeExpiredHandler = time => {
        if (time < 0) return this.setState({ gameFinished: true }, () => alert('Ai pierdut with word' + this.state.opLastWord))
    }

    insertWordHandler = () => {
        let { word, usedWords } = this.state;

        return this.checkWordExists(word)
            .then(existsWord => {
                if (!existsWord || usedWords.includes(word)) return this.setState({ gameFinished: true }, () => alert('Ai pierdut with word' + this.state.opLastWord))

                return this.checkWordExistsWithPrefix(word)
            })
            .then(existsWordWithPrefix => {
                if (!existsWordWithPrefix) return this.setState({ gameFinished: true }, () => alert('Ai pierdut with word' + this.state.opLastWord))

                // Reset timer
                this.resetTimer();

                // Start animation for user inserted word
                this.startYourWordAnimation(word);

                return this.generateWord(word);
            })
            .then(nextWord => {

                if (nextWord.length < 1) return this.setState({ gameFinished: true }, () => alert('Ai pierdut'))
                if (usedWords.includes(nextWord)) return alert('Cuvantul a mai fost folosit')

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
    }

    onWordChangeHandler = word => this.setState({ word })
    
    newGame = () => this.setState({ words: [], word: '', gameFinished: false })

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
            duration: 300
        }).start(() => this.setState({
            opLastWord: word
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
                yourLastWord: word
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
            <KeyboardAvoidingView
                style={styles.singlePlayerContainer} >
                <View style={styles.header}>
                    <View style={styles.cell}>
                        <Text>Silviu MSR</Text>
                    </View>
                    <View style={styles.cell}>
                        {!this.state.gameFinished && this.state.showTimer && <Timer
                            count={20}
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
                            onChangeText={word => this.onWordChangeHandler(word)}
                            placeholder='Introdu un cuvant...'
                        />
                        <Button style={styles.submitButton} onPress={this.insertWordHandler} color={CONSTANTS.buttonColor} title="TRIMITE" />
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    singlePlayerContainer: {
        flex: 1,
        backgroundColor: CONSTANTS.backgroundColor,
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
        backgroundColor: CONSTANTS.buttonColor,
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: "30%",
        width: "100%"
    },
    opLastWordContainer: {
        backgroundColor: CONSTANTS.secondaryColor,
        borderWidth: 2,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: "30%",
        width: "100%"
    },
    currentWordContainer: {
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 10,
        padding: 8,
        justifyContent: "center",
        alignItems: "center",
        height: '30%',
        width: "100%",
        backgroundColor: CONSTANTS.thirdColor
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