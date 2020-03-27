import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';

import CONSTANTS from '../../utils/constants';
import CustomText from '../../components/UI/Text/Text';

import NameHolder from '../../assets/Stuff/leaderboardHolder.png';
import First from '../../assets/Stuff/1st.png';
import Second from '../../assets/Stuff/2nd.png';
import Third from '../../assets/Stuff/3rd.png';
import GoldStar from '../../assets/Stuff/goldStar.png';

const size = CONSTANTS.screenWidth * 0.61;

const renderWithTrophy = props => (
    <View style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <View>
            <Image source={props.position == 1 ? First : props.position == 2 ? Second : Third} resizeMode='cover' style={styles.trophyImage} />
        </View>
        <View style={[styles.center, styles.trophyName]}>
            <CustomText color='white'>{props.name}</CustomText>
        </View>
    </View>
)

const renderName = props => props.position > 3 ? <CustomText color='white'>{props.name}</CustomText> : renderWithTrophy(props);

export default props => {

    return (
        <ImageBackground resizeMode="cover" style={[{ width: size, marginBottom: 2, paddingLeft: 12, paddingRight: 12 }, styles.image, styles.center, props.style]} source={NameHolder}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <View>
                    <CustomText color='white' normal>{props.position}.</CustomText>
                </View>
                <View style={{ flex: 2, paddingLeft: 8, paddingRight: 8 }}>
                    {renderName(props)}
                </View>
                <View style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <View>
                        <Image style={styles.starImage} source={GoldStar} resizeMode='cover' />
                    </View>
                    <View>
                        <CustomText color='white'>{props.points}</CustomText>
                    </View>
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
        height: CONSTANTS.screenHeight / 14,
        width: CONSTANTS.screenHeight / 14 
    },
    starImage: {
        height: CONSTANTS.screenHeight / 14,
        width: CONSTANTS.screenHeight / 14 
    },
    trophy: {
        width: '100%',
        height: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    max: {
        width: '100%'
    },
    half: {
        width: '50%',
        height: '100%'
    },
    image: {
        height: CONSTANTS.screenHeight / 7.2,
        flexDirection: 'row',
        paddingTop: 8
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    position: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    name: {
        paddingLeft: 4,
        width: '62%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    content: {
        width: '100%',
        height: '100%',
    },
    points: {
        width: '38%',
        height: '100%',
        flexDirection: 'row'
    }
});