import React, { Component } from 'react';
import { View, StyleSheet, Animated, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import Keyboard from '../../components/UI/Keyboard/Keyboard';

import * as WORDS from '../../store/actions/words';
import CONSTANTS from '../../utils/constants';
import CustomText from '../../components/UI/Text/Text';
import Timer from '../../components/Timer/Timer';

import Background from '../../assets/Stuff/bg.jpg';
import HeaderBg from '../../assets/Stuff/singleplayerHeader.png';
import ExitButton from '../../assets/Buttons/exitButton.png';


class SingleplayerGameScreen extends Component {
    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <ImageBackground source={Background} style={[styles.maxWidthHeight]}>
                <View style={[styles.maxWidthHeight, { alignItems: 'center' }]}>
                    <View style={[{ width: '100%', height: '14%' }]}>
                        <ImageBackground source={HeaderBg} style={styles.maxWidthHeight} resizeMode='stretch'>
                            <View style={[styles.maxWidthHeight, { flexDirection: 'row' }]}>
                                <View style={[styles.centerContent, { flex: 1 }]}>
                                    <TouchableOpacity style={[styles.centerContent, styles.exitButtonSize, styles.exitButtonPosition]}>
                                        <Image source={ExitButton} style={[styles.maxWidthHeight]} resizeMode='stretch' />
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.centerContent, { flex: 1 }]}>
                                    <CustomText large style={[styles.headerText]}>Robot</CustomText>
                                </View>
                                <View style={[styles.centerContent, { flex: 1 }]}>
                                    <View style={[styles.centerContent, { flex: 1 }]}>
                                        <Timer style={styles.counter}
                                            onTimeExpired={() => { }}
                                            count={15} />
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={[{ width: '100%', height: '50%' }, styles.centerContent]}>
                        <CustomText extra>Some stats, like round, Content</CustomText>
                    </View>
                    <View style={[{ flex: 1, backgroundColor: undefined }, styles.centerContent]}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 2 }}>
                                <View style={{ width: '80%', height: '90%', borderWidth: 1, borderRadius: 10 }}>
                                    <Text>{this.state.word}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity
                                    style={styles.submitButton}
                                    onPress={this.insertWordHandler}>
                                    <Text color="azure">TRIMITE</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flex: 3 }}>
                            <Keyboard
                                letterPressed={letter => this.letterPressedHandler(letter)}
                                deleteLastLetter={() => this.deleteLastLetterHandler()} />
                        </View>
                    </View>

                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
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
        left: 49,
        bottom: 29,
        resizeMode: 'cover',
        borderRadius: 35,
        borderWidth: 1
    },
    computerName: {
        position: 'relative',
        right: 46,
        top: 21,
        color: CONSTANTS.secondaryColor,
        fontSize: 22
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