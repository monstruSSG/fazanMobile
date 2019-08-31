import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Avatar from '../../assets/av.png';
import Button from '../../components/UI/Button/Button';
import CONSTANTS from '../../utils/constants';

export default props => (
    <View style={[styles.content, props.style]}>
        <View style={styles.oponentDetailsWrapper}>
            <View style={styles.oponentImageWrapper}>
                <Image
                    style={styles.image}
                    source={Avatar} />
            </View>
            <View style={styles.oponentNameWrapper}>
                <View>
                    <Text style={styles.oponentNameText}>{props.name}</Text>
                    <Text style={styles.oponentPointsText}>{props.points}</Text>
                </View>
            </View>
        </View>
        <View style={styles.resultWrapper}>
            <View style={styles.oponentInviteWrapper}>
                <Button color={CONSTANTS.secondaryColor}><Text style={{ color: "azure" }}>INVITE</Text></Button>
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 20,
        marginTop: 12,
        marginLeft: 12,
        marginRight: 12,
        height: 100,

    },
    oponentNameWrapper: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    oponentImageWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    oponentDetailsWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    oponentInviteWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    oponentNameText: {
        fontSize: 16,
        textAlign: 'center',
        letterSpacing: 1,
        fontWeight: 'bold',
        color: CONSTANTS.textColor
    },
    oponentPointsText: {
        fontSize: 16,
        textAlign: 'center',
        letterSpacing: 1,
        fontWeight: 'bold',
        color: CONSTANTS.textColor
    },
    resultWrapper: {
        paddingTop: 4,
        paddingRight: 4
    },
    image: {
        width: 75,
        height: 75,
        resizeMode: 'cover'
    }
});