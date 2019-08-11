import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Logo from '../../assets/fazanLogo.png'

export default props => (
    <View style={[styles.content, props.style]}>
        <View style={styles.imageWrapper}>
            <Image
                style={styles.image}
                source={Logo} />
        </View>
        <View style={styles.oponentPointsWrapper}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{props.name}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{props.points}</Text>
            </View>
        </View>
        <View style={styles.resultWrapper}>
            <Icon name='rocket' size={30} />
        </View>
    </View>
);

const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'yellow'
    },
    imageWrapper: {
        backgroundColor: 'white'
    },
    oponentPointsWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    resultWrapper: {
        backgroundColor: 'grey'
    },
    image: {
        width: 30,
        height: 30,
        resizeMode: 'cover'
    }
});