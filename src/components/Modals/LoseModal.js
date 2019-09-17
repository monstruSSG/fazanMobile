import React from 'react';
import { View, Modal, StyleSheet, Image, TouchableOpacity, FlatList, ImageBackground, Text, Button } from 'react-native';

import ClasamentUserDetails from '../ClasamentUserDetails/ClasamentUserDetails';

import RankingModal from '../../assets/Modals/clasamentModal.png';
import Title from '../../assets/Modals/titleShadow.png';
import ExitButton from '../../assets/Buttons/exitButton.png';
import Holder from '../../assets/Modals/loseHolder.png';
import EmptyStar from '../../assets/Stuff/emptyStar.png';
import RetryButton from '../../assets/Buttons/retry.png';
import MenuButton from '../../assets/Buttons/yellowHolder.png';

const loseModal = props => (

    <Modal visible={props.isVisible} onRequestClose={props.onClose} animationType="slide" transparent={true}>
        <View style={styles.contentWrapper}>
            <View style={styles.max}>
                <View style={[styles.max, styles.container]}>
                    <ImageBackground source={RankingModal} resizeMode="stretch" style={styles.backgroundImageContainer}>
                        <View style={styles.titleContainer}>
                            <TouchableOpacity onPress={props.onClose}>
                                <ImageBackground style={styles.buttonImage} resizeMode="cover" source={ExitButton}>
                                </ImageBackground>
                            </TouchableOpacity>
                            <ImageBackground resizeMode="stretch" style={styles.titleImage} source={Title}>
                                <View style={[styles.centerItems, styles.max, styles.titleTextContainer]}>
                                    <Text style={styles.titleText}>AI PIERDUT!</Text>
                                </View>
                            </ImageBackground>
                        </View>
                        <View style={styles.usersContainerWrapper}>
                            <ImageBackground source={Holder} style={{ width: '100%', height: '100%' }}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>
                                        <Image source={EmptyStar} style={{ width: '80%', height: '70%', position: 'relative', top: '40%', left: '30%' }} />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Image source={EmptyStar} style={{ width: '100%', height: '100%', position: 'relative', top: '5%' }} />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Image source={EmptyStar} style={{ width: '80%', height: '70%', position: 'relative', top: '40%', right: '5%' }} />
                                    </View>
                                </View>
                                <View style={{ flex: 2 }}>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 8 }}>
                                        <Text style={{ fontFamily: 'Troika', color: 'white', fontSize: 18, textAlign: 'center' }}>Adversarul te-a inchis folosind cuvantul {props.cu}</Text>
                                        {/* <Text style={{ fontFamily: 'Troika', color: 'white', fontSize: 18, textAlign: 'center' }}>Punctaj: 233</Text> */}
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                            <TouchableOpacity style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                                <Image resizeMode="stretch" source={RetryButton} style={{ width: '70%', height: '70%' }} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                            <TouchableOpacity style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                                <ImageBackground resizeMode="stretch" imageStyle={{ width: '100%', height: '100%' }} source={MenuButton} style={{ width: '80%', height: '60%' }}>
                                                    <Text style={{color: 'white', fontFamily: 'Troika', position: 'relative', textAlign: 'center', top: '20%', fontSize: 22}}>MENIU</Text>
                                                </ImageBackground>
                                            </TouchableOpacity>

                                        </View>
                                    </View>
                                </View>
                            </ImageBackground>
                        </View>
                    </ImageBackground>
                </View>
            </View>
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    contentWrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    centerItems: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    max: {
        width: '100%',
        height: '85%'
    },
    container: {
        justifyContent: "flex-end",
        position: 'relative',
        right: '3%'
    },
    backgroundImageContainer: {
        height: "90%",
        width: "100%",
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    titleContainer: {
        width: "100%",
        height: "15%",
    },
    titleImage: {
        height: "130%",
        width: "95%",
        position: 'relative',
        bottom: "180%",
        left: '7%'
    },
    buttonImage: {
        width: "40%",
        height: "100%",
        left: '88%',
        bottom: "8%"
    },
    usersContainerWrapper: {
        height: "65%",
        width: "70%",
        position: 'relative',
        left: '5%',
        alignItems: 'center',
    },
    userWrapper: {
        width: "100%"
    },
    titleTextContainer: {
        display: 'flex'
    },
    titleText: {
        position: 'relative',
        top: '40%',
        fontFamily: 'Troika',
        color: 'white',
        fontSize: 29,
        letterSpacing: 1,
    }
})

export default loseModal; 