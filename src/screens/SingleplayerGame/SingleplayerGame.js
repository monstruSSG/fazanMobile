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

import Text from '../../components/UI/Text/Text';
import Input from '../../components/UI/DefaultInput/DefaultInput';

class SingleplayerGameScreen extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        animation: new Animated.Value(1),
        usedWords: [],
        words: [],
        word: '',
        lastWord: '',
        gameFinished: false
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

    insertWordHandler = () => {
        let { word, usedWords } = this.state;

        return this.checkWordExists(word)
            .then(existsWord => {
                if (!existsWord || usedWords.includes(word)) return this.setState({ gameFinished: true })

                return this.checkWordExistsWithPrefix(word)
            })
            .then(existsWordWithPrefix => {
                if (!existsWordWithPrefix) return this.setState({ gameFinished: true })

                return this.generateWord(word)
            })
            .then(nextWord => {

                if (nextWord.length < 1) return this.setState({ gameFinished: true })
                if (usedWords.includes(nextWord)) return this.setState({ gameFinished: true })

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
            duration: 300,
            useNativeDriver: true
        }).start(() =>
            this.setState({ lastWord: word }, () => {
                Animated.timing(this.state.animation, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true
                }).start()
            }))
    }

    render() {
        const animatedStyle = {
            transform: [
                {
                    scaleX: this.state.animation
                }
            ]
        }

        return (
            <KeyboardAvoidingView
                style={styles.singlePlayerContainer} >
                <View style={styles.header}>
                    <View style={styles.cell}>
                        <Text style={styles.center}>Exit game</Text>
                    </View>
                    <View style={styles.cell}>
                        <Text style={styles.center}>Logo/Title</Text>
                    </View>
                    <View style={styles.cell}>
                        <Text style={styles.center}>Timer</Text>
                    </View>
                </View>
                <Animated.View
                    style={[styles.oponentInput, animatedStyle]}>
                    <Text style={styles.currentWord}>{this.state.lastWord}</Text>
                </Animated.View>
                <View style={styles.lastWords}>
                    <View style={styles.cell}>
                        <Text style={styles.center}>My word</Text>
                    </View>
                    <View style={styles.cell}>
                        <Text style={styles.center}>Oponent Word</Text>
                    </View>
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
    oponentInput: {
        height: '15%',
        width: '80%',
        alignItems: 'center',
        backgroundColor: 'yellow'
    },
    center: {
    },
    lastWords: {
        flex: 1,
        width: '80%'
    },
    currentWord: {
    },
    header: {
        height: '15%',
        flexDirection: 'row'
    },
    cell: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'pink'
    },
    myInput: {
        flex: 1,
        width: "80%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'red'
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