import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import CONSTANTS from '../../utils/constants';

const textSize = Math.floor(CONSTANTS.screenWidth / 16);

export default class Header extends Component {

    render() {
        return (
            <View style={[styles.content, this.props.contentStyles]}>
                <View style={styles.navigate}>
                    <TouchableOpacity
                        onPress={this.props.setLeaderBoardTrue}
                        style={[styles.fullAndCenter, styles.menuIcon]}>
                        <View>
                            <Icon name='navicon' size={30} color={CONSTANTS.textColor} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.searchTitle}>
                    <TextInput
                        style={[styles.input, { fontSize: textSize }]}
                        placeholderTextColor='white'
                        ref={ref => { this._textInputRef = ref }} 
                        onChangeText={this.props.onChangeText} 
                        placeholder='Cauta'
                    />
                </View>
                <View style={styles.searchIcon}>
                    <TouchableOpacity
                        style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => this._textInputRef.focus()}>
                        <Icon name='search' size={25} color={CONSTANTS.textColor} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    input: {
        fontFamily: 'Troika',
        color: 'white',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        height: '100%',
        flexDirection: 'row'
    },
    navigate: {
        flex: 1
    },
    fullAndCenter: {
        flex: 1,
        justifyContent: 'center'
    },
    searchTitle: {
        flex: 6,
        justifyContent: 'center',
        alignItems: "center"
    },
    searchIcon: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingRight: 14
    },
    menuIcon: {
        flex: 1,
        alignItems: "center",
        paddingLeft: 12
    }
});