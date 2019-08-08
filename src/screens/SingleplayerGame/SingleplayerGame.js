import React, { Component } from 'react';
import {
    View, StyleSheet,
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
            <View style={styles.singlePlayerContainer} >
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.gameFinished}
                    onRequestClose={() => this.setState({ gameFinished: false })}>
                    <View style={styles.modalViewContainer}>
                        <View style={styles.modalDetails}>
                            <Text>LOSER</Text>
                            <Button onPress={() => this.setState({ gameFinished: false })} title="EXIT"></Button>
                            <Button onPress={this.newGame} title="Play again"></Button>
                        </View>
                    </View>
                </Modal>
                <TouchableWithoutFeedback onPress={this.startCurrentWordAnimation}>
                    <Animated.View
                        style={[styles.oponentInput, animatedStyle]}>
                        <Text style={styles.currentWord}>{this.state.lastWord}</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
                <ScrollView style={styles.previousWords}>
                    {this.state.words.map(word => <Text>{word}</Text>)}
                </ScrollView>
                <View style={styles.myInput}>
                    <View style={styles.submitForm}>
                        <Input
                            value={this.state.word}
                            onChangeText={word => this.onWordChangeHandler(word)}
                            placeholder='Introdu un cuvant...'
                            style={styles.textInput} />
                        <Button style={styles.submitButton} title='SALVEAZA' onPress={this.insertWordHandler} />
                    </View>
                </View>
            </View>
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
        flex: 1,
        width: '80%',
        alignItems: 'center'
    },
    currentWord: {
    },
    hourglass: {
        height: "25%",
        justifyContent: "center"
    },
    previousWords: {
        flex: 1,
        height: "75%",
    },
    myInput: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
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
<<<<<<< HEAD
=======
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
>>>>>>> working at styling
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