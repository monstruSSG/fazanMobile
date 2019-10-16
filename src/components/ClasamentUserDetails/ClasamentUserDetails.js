import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';

import * as CONSTANTS from '../../utils/constants';
import CustomText from '../../components/UI/Text/Text';

import NameHolder from '../../assets/Stuff/nameHolder.png';
import First from '../../assets/Stuff/1st.png';
import Second from '../../assets/Stuff/2nd.png';
import Third from '../../assets/Stuff/3rd.png';
import GoldStar from '../../assets/Stuff/goldStar.png';

const renderPodium = props => {
    if (props.position == 1) return <Image resizeMode="contain" style={styles.maxHeightWidht} source={First} />
    if (props.position == 2) return <Image resizeMode="contain" style={styles.maxHeightWidht} source={Second} />
    if (props.position == 3) return <Image resizeMode="contain" style={styles.maxHeightWidht} source={Third} />

    return <View style={styles.maxHeightWidht}></View>
}

export default props => {

    return (
        <View style={[styles.centerContent, styles.maxHeightWidht]}>
            <ImageBackground imageStyle={{ borderRadius: 10 }} style={[styles.maxHeightWidht, styles.centerContent, styles.modalImage,props.style]} source={NameHolder}>
                <View style={[styles.maxHeightWidht]}>
                    <View style={[{width: '20%', height: '100%', backgroundColor: 'red'}]}>
                        <CustomText>{props.position}</CustomText>
                    </View>
                    <View style={[{width: '60%', height: '100%', backgroundColor: 'red'}]}>
                        <CustomText>{props.username}</CustomText>
                    </View>
                    <View style={[{width: '20%', height: '100%', backgroundColor: 'red'}]}>
                        <CustomText>{props.score}</CustomText>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
};

const styles = StyleSheet.create({
    goldStar: {
        height: '95%',
        width: '95%'
    },
    maxHeightWidht: {
        height: '100%',
        width: '100%'
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        flexDirection: 'row',
        flex: 1
    },
    userDetailsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
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