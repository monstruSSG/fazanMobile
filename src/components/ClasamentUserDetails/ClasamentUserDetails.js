import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';

import * as CONSTANTS from '../../utils/constants';

import NameHolder from '../../assets/Stuff/nameHolder.png';
import First from '../../assets/Stuff/1st.png';
import Second from '../../assets/Stuff/2nd.png';
import Third from '../../assets/Stuff/3rd.png';
import GoldStar from '../../assets/Stuff/goldStar.png';

const renderPodium = props => {
    if (props.position == 1) return <Image resizeMode="contain" style={{ width: 35, height: 35 }} source={First} />
    if (props.position == 2) return <Image resizeMode="contain" style={{ width: 35, height: 35 }} source={Second} />
    if (props.position == 3) return <Image resizeMode="contain" style={{ width: 35, height: 35 }} source={Third} />

    return <View style={{ width: 35, height: 35 }}></View>
}

export default props => {

    return (
        <ImageBackground imageStyle={{ borderRadius: 10 }} style={[styles.content, props.style]} source={NameHolder}>
            <View style={styles.userDetailsContainer}>
                <View style={styles.positionContainer}>
                    <View style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'Troika',color: 'white', fontSize: 18 }}>{props.position}.</Text>
                    </View>
                    <View style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        {renderPodium(props)}
                    </View>
                </View>
                <View style={styles.nameContainer}>
                    <Text style={{ fontFamily: 'Troika', color: 'white', fontSize: 18 }}>{props.name}</Text>
                </View>
                <View style={styles.pointsContainer}>
                    <View style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'Troika',color: 'white', fontSize: 17 }}>{props.points}</Text>
                    </View>
                    <View style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={GoldStar} resizeMode="contain" style={{ width: 35, height: 35 }} />
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 12,
        marginLeft: 12,
        marginRight: 12,
        height: 50,

    },
    userDetailsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    positionContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    nameContainer: {
        display: 'flex',
        flex: 2,
        justifyContent: 'center'
    },
    pointsContainer: {
        flex: 1,
        flexDirection: 'row'
    }
});