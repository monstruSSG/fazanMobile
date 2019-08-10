import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView, Button, Modal } from 'react-native';
import { connect } from 'react-redux';

import * as WORDS from '../../store/actions/words'
import CONSTANTS from '../../utils/constants';

import Hourglass from '../../assets/glass.png';
import Text from '../../components/UI/Text/Text';
import Input from '../../components/UI/DefaultInput/DefaultInput';

class SingleplayerGameScreen extends Component {
    static navigationOptions = {
        title: 'Oponent name',
        headerStyle: {
            backgroundColor: '#7b5e20'
        },
        headerRight: (
            <Text>Score:</Text>
        )
    }

    state = {
        usedWords: [],
        words: [],
        word: '',
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

                this.setState(prevState => ({
                    usedWords: prevState.usedWords.concat([prevState.word, nextWord]),
                    word: nextWord.slice(-2),
                    words: prevState.words.concat([prevState.word, nextWord])
                }))
            })
    }

    onWordChangeHandler = word => {
        this.setState({ word })
    }

    newGame = () => this.setState({ words: [], word: '', gameFinished: false })

    render() {
        return (
            <View style={styles.singlePlayerContainer} >
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.gameFinished}
                    onRequestClose={() => this.setState({ gameFinished: false })}>
                    <Text> You Lost</Text>
                </Modal>
                <View style={styles.hourglass}>
                    <Image source={Hourglass} />
                </View>
                <View style={styles.oponentInput}>
                    <Text>Current word: {this.state.words[this.state.words.length - 1]}</Text>
                </View>
                <ScrollView style={styles.previousWords}>
                    {this.state.words.map(word => <Text>{word}</Text>)}
                </ScrollView>
                <View style={styles.myInput}>
                    <View style={styles.myInputTitle}>
                        <Text>Insert word:</Text>
                    </View>
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
    },
    myInputTitle: {
        flex: 1,
        justifyContent: "flex-end"
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