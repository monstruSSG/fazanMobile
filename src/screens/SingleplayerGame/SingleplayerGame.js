import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';

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
                    <Text>Current word: {this.state.words[this.state.words.length-1]}</Text>
                </View>
                <View style={styles.previousWords}>
                    {this.state.words.map(word => <Text>{word}</Text>)}
                </View>
                <View style={styles.myInput}>
                    <Text>Insert word:</Text>
                    <Input value={this.state.word} onChangeText={word => this.onWordChangeHandler(word)} placeholder="Your word..."></Input>
                </View>
                <Socket saveWord={word => this.saveWordHandler(word)} word={this.state.word}/>
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
        justifyContent: "center",
        height: "75%"
    },
    myInput: {
        height: "25%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    }
});

export default SingleplayerGameScreen;