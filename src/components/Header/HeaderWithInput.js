import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import CONSTANTS from '../../utils/constants';
import CustomInput from '../../components/UI/DefaultInput/DefaultInput'

export default props => {
    return (
        <View style={[styles.content, props.contentStyles]}>
            <View style={styles.navigate}>
                <TouchableOpacity
                    onPress={props.navigate}
                    style={[styles.fullAndCenter, styles.menuIcon]}>
                    <View>
                        <Icon name='navicon' size={30} color={CONSTANTS.textColor} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.searchTitle}>
                <Text style={{ letterSpacing: 1, color: CONSTANTS.textColor, fontWeight: 'bold', fontSize: 20 }}>SEARCH OPONENT</Text>
            </View>
            <View style={styles.searchIcon}>
                <Icon name='search' size={25} color={CONSTANTS.textColor} />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
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