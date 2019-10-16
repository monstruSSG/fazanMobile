import React from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

import CONSTANTS from '../../../utils/constants';
import CustomText from '../../../components/UI/Text/Text';

import LetterHolder from '../../../assets/Stuff/letterHolder.png';
import DeleteButton from '../../../assets/Buttons/yellowHolder.png';

const elementSize = Math.floor(CONSTANTS.screenWidth / 10) - 2
const textSize = Math.floor(elementSize * 2 / 3)

const element = (props, letter, isDelete) => (
    <View style={{ width: elementSize, height: elementSize }}>
        <TouchableOpacity onPress={isDelete ? props.deleteLastLetter : () => props.letterPressed(letter.trim().toLowerCase())}
            style={[styles.max, styles.center]}>
            <ImageBackground source={LetterHolder} style={[styles.max, styles.center]}>
                <View style={[styles.max, styles.center]}>
                    {isDelete ? <CustomText color='black' style={[{ fontSize: textSize }, styles.buttonTextPosition]}>{'-'}</CustomText> : <CustomText style={[{ fontSize: textSize }, styles.buttonTextPosition]}>{letter}</CustomText>}
                </View>
            </ImageBackground>
        </TouchableOpacity>
    </View>
)

const keyboard = props => {
    let firstRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
    let secondRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
    let thirdRow = ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']


    return (
        <View style={styles.keyboardContainer}>
            <View style={[styles.rowsContent]}>
                <View style={styles.firstRow}>{firstRow.map(letter => element(props, letter))}</View>
                <View style={styles.secondRow}>{secondRow.map(letter => element(props, letter))}</View>
                <View style={styles.thirdRow}>{thirdRow.map(letter => letter === 'DEL' ? element(props, letter, true) : element(props, letter))}</View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonTextPosition: {
        position: 'relative',
        bottom: '5%'
    },
    max: {
        width: '100%',
        height: '100%'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    keyboardContainer: {
        width: "100%",
        height: "100%",
    },
    rowsContent: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    firstRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingBottom: 8
    },
    secondRow: {
        paddingBottom: 8,
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'center'
    },
    thirdRow: {
        flex: 1,
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'center'
    }
})

export default keyboard; 