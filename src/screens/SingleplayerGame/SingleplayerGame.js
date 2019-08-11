import React, { Component } from 'react';
import {
    View, KeyboardAvoidingView, StyleSheet,
    Image, ScrollView,
    Button, Modal, Animated,
    TouchableWithoutFeedback, Easing
} from 'react-native';
import { connect } from 'react-redux';

import * as WORDS from '../../store/actions/words'
import CONSTANTS from '../../utils/constants';
import Logo from '../../assets/fazanLogo.png';
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
    }

    generateWord = word => this.props.generateWord(word)

    checkWordExists = word => this.props.checkWordExists(word)

    checkWordExistsWithPrefix = word => this.props.checkWordExistsWithPrefix(word.slice(-2))

    componentWillUnmount() {
        this.props.closeDbConnection()
    }

    onTimeExpiredHandler = time => {
        if (time < 0) return this.setState({ gameFinished: true }, () => alert('Ai pierdut'))
    }

    insertWordHandler = () => {
        let { word, usedWords } = this.state;

        return this.checkWordExists(word)
            .then(existsWord => {
                if (!existsWord || usedWords.includes(word)) return this.setState({ gameFinished: true }, () => alert('Ai pierdut'))

                return this.checkWordExistsWithPrefix(word)
            })
            .then(existsWordWithPrefix => {
                if (!existsWordWithPrefix) return this.setState({ gameFinished: true }, () => alert('Ai pierdut'))

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

    onWordChangeHandler = word => {
        this.setState({ word })
    }

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
                    </View>
                    <View style={styles.cell}>
                        <Image
                            style={styles.logo}
                            resizeMode='contain'
                            source={Logo} />
                    </View>
                    <View style={styles.cell}>
                        {!this.state.gameFinished && this.state.showTimer && <Timer
                            count={5}
                            onTimeExpired={this.onTimeExpiredHandler}
                        />}
                    </View>
                </View>
                <Animated.View
                    style={[styles.oponentInput, animatedStyle]}>
                    <Text style={styles.currentWord}>{this.state.lastWord}</Text>
                </Animated.View>
                <View style={styles.lastWords}>
                    <Animated.View style={[styles.cell, yourWordAnimationStyle]}>
                        <Text style={styles.center}>{this.state.yourLastWord}</Text>
                    </Animated.View>
                    <Animated.View style={[styles.cell, opWordAnimationStyle]}>
                        <Text style={styles.center}>{this.state.opLastWord}</Text>
                    </Animated.View>
                </View>
                <View style={styles.myInput}>
                    <View style={styles.submitForm}>
                        <Input
                            value={this.state.word}
                            onChangeText={word => this.onWordChangeHandler(word)}
                            placeholder='Introdu un cuvant...'
                        />
                        <Button title='SALVEAZA' onPress={this.insertWordHandler} />
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
        height: '15%',
        width: '80%',
        alignItems: 'center'
    },
    center: {
        textAlign: 'left'
    },
    lastWords: {
        flex: 1,
        width: '80%'
    },
    currentWord: {
    },
    header: {
        height: '15%',
        flexDirection: 'row',
        backgroundColor: CONSTANTS.buttonColor
    },
    cell: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    myInput: {
        flex: 1,
        width: "80%",
        alignItems: "center",
        justifyContent: "center"
    },
    submitForm: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    textInput: {
        paddingRight: 6
    },
    submitButton: {
        flex: 1
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
    generateWord: word => dispatch(WORDS.generateWord(word))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleplayerGameScreen);