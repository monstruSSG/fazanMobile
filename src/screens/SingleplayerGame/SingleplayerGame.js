import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView, Button } from 'react-native';
import SQL from 'react-native-sqlite-storage';

import CONSTANTS from '../../utils/constants';
import { GET_WORDS } from '../../utils/querys';

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

    constructor(props) {
        super(props);

        db = SQL.openDatabase({
            name: 'fazanWords.db',
            readOnly: true,
            createFromLocation: 1
        }, this.dbSuccessHandler, this.dbErrHandler)

        this.state = {
            db,
            words: [],
            word: ''
        }
    }

    dbErrHandler = err => { }
    dbSuccessHandler = () => { }

    checkWordExists = word => new Promise((resolve, reject) =>
        db.transaction(tx =>
            tx.executeSql(`${GET_WORDS} WHERE word=?`, [word], (tx, res) => resolve(res.rows),
                err => reject(err.message)),
            err => reject(err.message)))

    checkWordExistsWithPrefix = word => new Promise((resolve, reject) =>
        db.transaction(tx =>
            tx.executeSql(`${GET_WORDS} WHERE word LIKE '${word.slice(-2)}%'`, [ ], (tx, res) => resolve(res.rows),
                err => reject(err.message)),
            err => reject(err.message)))

    componentWillUnmount() {
        const { db } = this.state;

        db.close();
    }

    insertWordHandler = () => {
        let { word } = this.state;

        return this.checkWordExists(word)
            .then(words => {
                if (words.length < 1) return alert('Cuvantul nu exista')

                this.setState(prevState => ({
                    word: prevState.word.slice(-2),
                    words: prevState.words.concat(prevState.word)
                }), Promise.resolve)
            })
            .then(() => this.checkWordExistsWithPrefix(this.state.word))
            .then(words => {
                if(words.lengt < 1) return alert('Ai fost inchis')
            })
            .catch(err => console.log(err))
    }

    onWordChangeHandler = word => {
        this.setState({ word })
    }

    render() {
        return (
            <View style={styles.singlePlayerContainer} >
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

export default SingleplayerGameScreen;