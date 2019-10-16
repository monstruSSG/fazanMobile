import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';

import CONSTANTS from '../../utils/constants';
import CustomText from '../../components/UI/Text/Text';

import NameHolder from '../../assets/Stuff/nameHolder.png';
import First from '../../assets/Stuff/1st.png';
import Second from '../../assets/Stuff/2nd.png';
import Third from '../../assets/Stuff/3rd.png';
import GoldStar from '../../assets/Stuff/goldStar.png';

const size = CONSTANTS.screenWidth * 0.6;

const renderWithTrophy = props => (
    <View style={[styles.trophy]}>
        <View style={[styles.center, styles.trophyImage]}>
            <Image source={props.position == 1 ? First : props.position == 2 ? Second : Third} resizeMode='stretch' style={styles.max} />
        </View>
        <View style={[styles.center, styles.trophyName]}>
            <CustomText color='white'>{props.name}</CustomText>
        </View>
    </View>
)

const renderName = props => props.position > 3 ? <CustomText color='white'>{props.name}</CustomText> : renderWithTrophy(props);

export default props => {

    return (
        <ImageBackground imageStyle={{ borderRadius: 15 }} style={[{ width: size }, styles.image, styles.center, props.style]} source={NameHolder}>
            <View style={[styles.position]}>
                <CustomText color='white' normal>{props.position}</CustomText>
            </View>
            <View style={[styles.name]}>
                {renderName(props)}
            </View>
            <View style={[styles.points]}>
                <View style={[styles.center, styles.half]}>
                    <CustomText color='white'>{props.points}</CustomText>
                </View>
                <View style={[styles.half, { alignItems: 'flex-end' }]}>
                    <Image style={styles.max} source={GoldStar} resizeMode='center' />
                </View>
            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
    trophyName: {
        width: '80%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    trophyImage: {
        width: '20%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    trophy: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    max: {
        width: '100%',
        height: '100%'
    },
    half: {
        width: '50%',
        height: '100%'
    },
    image: {
        height: 60,
        flexDirection: 'row',
        paddingBottom: 8,
        paddingTop: 8
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    position: {
        width: '15%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    name: {
        width: '55%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        width: '100%',
        height: '100%',
    },
    points: {
        width: '30%',
        height: '100%',
        flexDirection: 'row'
    }
});