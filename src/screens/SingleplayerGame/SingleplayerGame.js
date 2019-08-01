import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView, Button } from 'react-native';
import SQL from 'react-native-sqlite-2';

import CONSTANTS from '../../utils/constants';

import Hourglass from '../../assets/glass.png';
import Text from '../../components/UI/Text/Text';
import Input from '../../components/UI/DefaultInput/DefaultInput'
import Socket from '../../utils/Socket'

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

    componentDidMount() {
        const dbMaster = SQL
            .openDatabase({
                name: "words",
                readOnly: true,
                createFromLocation: '../../utils/words.sqlite3'
            })
        
        dbMaster.transaction(tx => {
            tx.executeSql('SELECT * FROM words')
        }, err => alert(err.message),
        res => alert(res + 'RESULT'))
        
    }

    state = {
        word: "",
        words: []
    }

    onWordChangeHandler = word => {
        this.setState({ word })
    }

    saveWordHandler = word => {
        this.setState(prevState => ({ words: prevState.words.concat(word), word: "" }))
    }

    render() {
        return (
            <View style={styles.singlePlayerContainer}>
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
                            placeholder="Your word..."
                            style={styles.textInput} />
                        <Socket
                            saveWord={word => this.saveWordHandler(word)}
                            word={this.state.word}
                            style={styles.submitButton} />
                    </View>
                    <View style={styles.giveUpButton}>
                        <Button title="GIVE UP" />
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

    },
    myInputTitle: {
        flex: 1,
        justifyContent: "flex-end"
    },
    giveUpButton: {
        flex: 1
    }
});

export default SingleplayerGameScreen;