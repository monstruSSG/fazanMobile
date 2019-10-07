import React from 'react';
import { View, StyleSheet, TouchableNativeFeedback, TouchableOpacity, Text, ImageBackground } from 'react-native';

import CONSTANTS from '../../../utils/constants';
import LetterHolder from '../../../assets/Stuff/letterHolder.png';

const renderLetters = () => {
    CONSTANTS.firstRow.map(letter => (
        <View style={{ height: 5, width: 5, backgroundColor: 'red' }}>

        </View>
    ))
}

const keyboard = props => {

    // CONSTANTS.secondRow.map(letter => (
    //     <Text style={{ color: 'white', fontSize: 22 }}>{letter}</Text>
    // ))

    // CONSTANTS.thirdRow.map(letter => (
    //     <Text style={{ color: 'white', fontSize: 22 }}>{letter}</Text>
    // ))

    let firstRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
    let secondRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
    let thirdRow = ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']


    return (
        <View style={styles.keyboardContainer}>
            <View style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* {renderLetters()} */}
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', paddingBottom: 8 }}>
                    {
                        firstRow.map(letter => (
                            <ImageBackground source={LetterHolder} style={{ width: 35, height: 35 }}>
                                <TouchableOpacity onPress={() => props.letterPressed(letter.trim().toLowerCase())} style={{ width: '100%', height: '100%', flex: 1, marginLeft: 3 }}>
                                    <View>
                                        <Text style={{ color: 'white', fontFamily: 'Troika', fontSize: 24, position: 'relative', left: '20%' }}>{letter}</Text>
                                    </View>
                                </TouchableOpacity>
                            </ImageBackground>
                        ))
                    }
                </View>
                <View style={{ paddingBottom: 8, flexDirection: 'row', width: '90%', justifyContent: 'center', }}>
                    {

                        secondRow.map(letter => (
                            <ImageBackground source={LetterHolder} style={{ width: 35, height: 35 }}>
                                <TouchableOpacity onPress={() => props.letterPressed(letter.trim().toLowerCase())} style={{ width: '100%', height: '100%', flex: 1, marginLeft: 3 }}>
                                    <View>
                                        <Text style={{ color: 'white', fontFamily: 'Troika', fontSize: 24, position: 'relative', left: '20%' }}>{letter}</Text>
                                    </View>
                                </TouchableOpacity>
                            </ImageBackground>
                        ))
                    }
                </View>
                <View style={{ flex: 1, flexDirection: 'row', width: '90%', justifyContent: 'center' }}>
                    {

                        thirdRow.map(letter => {
                            return letter === 'DEL' ?
                                (
                                    <ImageBackground source={LetterHolder} style={{ width: 50, height: 35 }}>
                                        <TouchableOpacity onPress={props.deleteLastLetter} style={{ width: '100%', height: '100%', flex: 1, marginLeft: 3 }}>
                                            <View>
                                                <Text style={{ color: 'white', fontFamily: 'Troika', fontSize: 18, position: 'relative', left: '15%', top: '20%' }}>{letter}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </ImageBackground>
                                )
                                :
                                (
                                    <ImageBackground source={LetterHolder} style={{ width: 35, height: 35 }}>
                                        <TouchableOpacity onPress={() => props.letterPressed(letter.trim().toLowerCase())} style={{ width: '100%', height: '100%', flex: 1, marginLeft: 3 }}>
                                            <View>
                                                <Text style={{ color: 'white', fontFamily: 'Troika', fontSize: 24, position: 'relative', left: '20%' }}>{letter}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </ImageBackground>
                                )
                        })
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    keyboardContainer: {
        width: "100%",
        height: "100%",
    }
})

export default keyboard; 