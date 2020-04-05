import React from 'react';
import { View, Modal, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';

import CustomText from '../UI/Text/Text';

import Background from '../../assets/Modals/warningBack.png';
import YellowButton from '../../assets/Buttons/yellowHolder.png';
import GreenButton from '../../assets/Buttons/greenLabel.png';


const sideDrawer = props => (
    <Modal visible={props.isVisible} onRequestClose={props.onClose} animationType="fade" transparent={true}>
        <View style={[styles.max, styles.container, {flexDirection: 'row'}]}>
            <View style={[styles.background]}>
                <ImageBackground source={Background} style={[styles.max]}>
                    <View style={[styles.max]}>
                        <View style={[styles.head, styles.center]}>
                            <View style={[styles.centerAndEnd, styles.half, styles.avatarPosition]}>
                                <Image source={{ uri: props.pictureUrl }} style={{ width: 60, height: 60, borderRadius: 30 }} />
                            </View>
                            <View style={[styles.centerAndEnd, styles.half]}>
                                <CustomText normal>{props.username}</CustomText>
                            </View>
                        </View>
                        <View style={[styles.middle, styles.center]}>
                            <View style={[styles.contentButtons, styles.centerAndEnd]}>
                                <TouchableOpacity style={[styles.max]} onPress={props.goToClasament}>
                                    <ImageBackground style={[styles.max, styles.center]} source={YellowButton} resizeMode='stretch'>
                                        <CustomText normal style={[styles.textPosition]}>CLASAMENT</CustomText>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.contentButtons, styles.center]}>
                                <TouchableOpacity style={[styles.max]} onPress={props.goToProfile}>
                                    <ImageBackground style={[styles.max, styles.center]} source={YellowButton} resizeMode='stretch'>
                                        <CustomText normal style={[styles.textPosition]}>PROFILE</CustomText>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.contentButtons, styles.center]}>
                                <TouchableOpacity style={[styles.max]} onPress={props.goToHome}>
                                    <ImageBackground style={[styles.max, styles.center]} source={YellowButton} resizeMode='stretch'>
                                        <CustomText normal style={[styles.textPosition]}>ACASA</CustomText>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.contentButtons, styles.centerAndStart]}>
                                <TouchableOpacity style={[styles.max]} onPress={props.onClose}>
                                    <ImageBackground style={[styles.max, styles.center]} source={GreenButton} resizeMode='stretch'>
                                        <CustomText normal style={[styles.textPosition]}>INCHIDE</CustomText>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.bottom, styles.centerAndEnd]}>
                            <View style={[styles.contentButtons, { height: '50%' }, styles.centerAndStart]}>
                                <TouchableOpacity style={[styles.max]} onPress={props.onLogout}>
                                    <ImageBackground style={[styles.max, styles.center]} source={GreenButton} resizeMode='stretch'>
                                        <CustomText normal style={[styles.textPosition]}>LOGOUT</CustomText>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
            <View style={{width: '40%', height: '100%'}}>
                <TouchableOpacity style={styles.max} onPress={props.onClose}/>
            </View>
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    avatarPosition: {
        position: 'relative',
        top: '20%'
    },
    textPosition: {
        position: 'relative',
        bottom: '10%'
    },
    contentButtons: {
        height: '20%',
        width: '80%'
    },
    centerAndStart: {
        alignItems: 'center'
    },
    centerAndEnd: {
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    half: {
        height: '50%',
        width: '100%'
    },
    head: {
        width: '100%',
        height: '20%'
    },
    middle: {
        width: '100%',
        height: '50%'
    },
    bottom: {
        width: '100%',
        height: '20%'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    max: {
        width: '100%',
        height: '100%'
    },
    background: {
        width: '60%',
        height: '100%'
    },
    container: {
        flexDirection: 'column',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    imageContainer: {
        width: "100%",
        height: "20%",
        borderBottomWidth: 1,
        borderBottomColor: 'black'
    }
});

export default sideDrawer;
