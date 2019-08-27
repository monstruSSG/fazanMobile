import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Logo from '../../assets/fazanLogo.png';

export default props => (
    <View style={[styles.content, props.style]}>
        <View style={styles.imageWrapper}>
            <Image
                style={styles.image}
                source={Logo} />
        </View>
        <View style={styles.oponentPointsWrapper}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text >{props.name}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{props.points}</Text>
            </View>
        </View>
        <View style={styles.resultWrapper}>
            <Icon name='send-o' size={20} />
        </View>
    </View>
);

const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 3,
        borderLeftWidth: 3,
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 2,
        shadowRadius: 10,
        elevation: 1,
        marginTop: 12,
        marginLeft: 12,
        marginRight: 12,
        
    },
    imageWrapper: {
    },
    oponentPointsWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    resultWrapper: {
        paddingTop: 4,
        paddingRight: 4
    },
    image: {
        width: 30,
        height: 30,
        resizeMode: 'cover'
    }
});