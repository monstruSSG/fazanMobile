import React, { Component } from 'react';
import { View, StyleSheet, Animated, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';

import * as SOCKET from '../../store/actions/socket';
import Input from '../../components/UI/DefaultInput/DefaultInput';
import Text from '../../components/UI/Text/Text';
import CONSTANTS from '../../utils/constants';
import BackgroudImage from '../../assets/back.png';
import Avatar from '../../assets/s.jpg';
import LoseTitle from '../../assets/loseTitle3.png';
import WinTitle from '../../assets/winmessage.png';
import LoseModal from '../../components/Modals/LoseModal';
import WinModal from '../../components/Modals/WinModal';


class MultiplayerGameScreen extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        animation: new Animated.Value(1),
        animationOpWord: new Animated.Value(0),
        animationYourWord: new Animated.Value(0),
        fadeYou: new Animated.Value(1),
        fadeOponent: new Animated.Value(1),
        startGameAnimation: new Animated.Value(0),
        usedWords: [],
        words: [],
        word: '',
        lastWord: '',
        opLastWord: '',
        yourLastWord: '',
        gameFinished: false,
        showTimer: false,
        loseModal: false,
        winModal: false,
        selected: false,
        letterIndex: 0
    }

    componentDidMount() {
        this.props.socket.socket.on('gotWord', this.onGotWordHandler);

        if (!this.state.selected) this.letterIncrementInterval = setInterval(() => {
            this.setState(
                prevState => ({
                    letterIndex: (prevState.letterIndex + 1) % 26
                }), () => {
                    if (this.state.selected) {
                        clearImmediate(this.letterIncrementInterval);
                    }
                })
        }, 500);
    }

    onGotWordHandler = word => {
        console.log(word, 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
    }

    navigateSearchGame = () => this.props.navigation.navigate('SearchGame');

    exitGame = () => {
        this.props.closeSocketConnection().then(() => {
            console.log(this.props.socket.socket)
            this.navigateSearchGame()
        });
    }

    insertWordHandler = () => {
        let { word, usedWords } = this.state;

        this.props.socket.socket.emit('sendWord', { word });
    }

    onWordChangeHandler = word => this.setState({ word })

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

    fadeYouOut = () => Animated.timing(this.state.fadeYou, {
        toValue: 0.25,
        duration: 500
    }).start()

    fadeYouIn = () => Animated.timing(this.state.fadeYou, {
        toValue: 1,
        duration: 300
    }).start()

    fadeOponentOut = () => Animated.timing(this.state.fadeOponent, {
        toValue: 0.25,
        duration: 500
    }).start()

    fadeOponentIn = () => Animated.timing(this.state.fadeOponent, {
        toValue: 1,
        duration: 300
    }).start()

    resetTimer = () => this.setState({
        showTimer: false
    }, () => this.setState({
        showTimer: true
    }))

    render() {
        const fadeYou = {
            opacity: this.state.fadeYou
        }

        const fadeOponent = {
            opacity: this.state.fadeOponent
        }

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
                outputRange: ['-20%', '-100%']
            })
        }

        const opWordAnimationStyle = {
            right: this.state.animationOpWord.interpolate({
                inputRange: [0, 1],
                outputRange: ['-20%', '-100%']
            })
        }

        return (
            <ImageBackground source={BackgroudImage} style={{ width: '100%', height: '100%' }}>
                {this.state.selected ? <View
                    style={[styles.singlePlayerContainer]} >
                    <View style={styles.header}>
                        <Animated.View style={[styles.cell, fadeYou]}>
                            <View style={styles.myContainer}>
                                <Image source={Avatar} style={styles.myAvatar} />
                                <Text style={styles.myName} color={CONSTANTS.buttonColor}>MSR</Text>
                            </View>
                        </Animated.View>
                        <View style={styles.cell}>
                            {!this.state.gameFinished && this.state.showTimer && <Timer
                                count={300}
                                onTimeExpired={this.onTimeExpiredHandler}
                            />}
                        </View>
                        <Animated.View style={[styles.cell, fadeOponent]}>
                            <View style={styles.computerContainer}>
                                <Text style={styles.computerName} color={CONSTANTS.secondaryColor}>GB</Text>
                                <Image source={Avatar} style={styles.computerAvatar} />
                            </View>
                        </Animated.View>
                    </View>
                    <View style={styles.lastWords}>
                        <Animated.View
                            style={[styles.oponentInput, styles.currentWordContainer, animatedStyle]}>
                            <Text color="azure" style={styles.currentWord}>{this.state.lastWord}</Text>
                        </Animated.View>
                        <Animated.View style={[styles.yourLastWordContainer, yourWordAnimationStyle]}>
                            <Text color={CONSTANTS.buttonColor} style={[styles.center, styles.yourLastWord]}>{this.state.yourLastWord}</Text>
                        </Animated.View>
                        <Animated.View style={[styles.opLastWordContainer, opWordAnimationStyle]}>
                            <Text color={CONSTANTS.secondaryColor} style={[styles.center, styles.opLastWord]}>{this.state.opLastWord}</Text>
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
                        </View>
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={this.insertWordHandler}>
                            <Text color="azure">TRIMITE</Text>
                        </TouchableOpacity>
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
                </View> : <TouchableOpacity onPress={() => this.setState({ selected: true })}>
                        <View style={styles.alphabet}>
                            <Text style={styles.letter}>{CONSTANTS.letters[this.state.letterIndex]}</Text>
                        </View>
                    </TouchableOpacity>}
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    alphabet: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    letter: {
        fontSize: 80
    },
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
        borderColor: CONSTANTS.buttonColor,
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
        borderColor: CONSTANTS.secondaryColor,
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
        borderColor: "black",
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
        fontSize: 20,
        letterSpacing: 6,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    opLastWord: {
        fontSize: 20,
        letterSpacing: 6,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    lastWords: {
        flex: 1,
        paddingTop: 58,
        width: '80%',
        alignItems: "center",
        justifyContent: "flex-end"
    },
    currentWord: {
        fontSize: 20,
        letterSpacing: 6,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    header: {
        height: '15%',
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
    },
    myContainer: {
        borderTopLeftRadius: 40,
        borderBottomLeftRadius: 50,
        borderRightWidth: 0,
        borderWidth: 2,
        borderBottomWidth: 2,
        borderTopWidth: 0,
        borderColor: CONSTANTS.buttonColor,
        width: 120,
        height: 70
    },
    myAvatar: {
        width: 65,
        height: 65,
        position: 'relative',
        left: 4,
        resizeMode: 'cover',
        borderRadius: 35,
        borderWidth: 1
    },
    myName: {
        position: 'relative',
        bottom: 44,
        left: 38,
        fontSize: 22
    },
    computerContainer: {
        borderTopRightRadius: 40,
        borderBottomRightRadius: 50,
        borderLeftWidth: 0,
        borderWidth: 2,
        borderBottomWidth: 2,
        borderTopWidth: 0,
        borderColor: CONSTANTS.secondaryColor,
        width: 120,
        height: 70
    },
    computerAvatar: {
        width: 65,
        height: 65,
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
        flexDirection: 'row',
        width: "50%",
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
        flexDirection: 'row',
        borderBottomWidth: 1
    },
    textInput: {
        paddingRight: 6
    },
    submitButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 1,
        backgroundColor: CONSTANTS.buttonColor
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
    },
    loseModal: {
        width: 50,
        height: 50
    }
});

const mapStateToProps = state => ({
    socket: state.socket
});

const mapDispatchToProps = dispatch => ({
    closeSocketConnection: () => dispatch(SOCKET.closeSocketConnection())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MultiplayerGameScreen);
