import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';

import CustomText from '../../components/UI/Text/Text';
import ModalTemplate from './ModalTemplate';
import CONSTANTS from '../../utils/constants'

import GreenButton from '../../assets/Buttons/greenLabel.png';
import Bg from '../../assets/Modals/invitationModal.png';

const photoSize = CONSTANTS.screenWidth / 3
const detailIconSize = CONSTANTS.screenWidth / 12

class InvitationModal extends Component {

    render() {

        return (
            <ModalTemplate background={Bg} isVisible={this.props.isVisible}>
                <View style={[styles.content]}>
                    <View style={styles.exitButton}>
                        <TouchableOpacity style={styles.exitButtonPressArea} onPress={this.props.onClose} />
                    </View>
                    <View style={[styles.invitationDescription]}>
                        <View style={styles.invitationArea}>
                            <CustomText color='white' large style={{ textAlign: 'center' }}>
                                {this.props.from} {'\n'}
                                <CustomText style={{ textAlign: 'center' }}>Te-a invitat la joc, accepta provocarea!</CustomText>
                            </CustomText>
                        </View>
                        <View style={styles.detailsContainer}>
                            <View style={[styles.center, { width: '60%', alignItems: 'flex-end' }]}>
                                <Image
                                    source={this.props.imageUrl ? { uri: this.props.imageUrl } : require('../../assets/av.png')}
                                    style={{ width: photoSize, height: photoSize, borderRadius: photoSize / 2 }}
                                />
                            </View>

                            <View style={[styles.center, { width: '40%' }]}>
                                <CustomText>Victorii</CustomText>
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <CustomText color={'white'}>{this.props.wins}</CustomText>
                                    <Image source={require('../../assets/Stuff/1st.png')} style={{ width: detailIconSize, height: detailIconSize }} />
                                </View>
                                <CustomText>Scor</CustomText>
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <CustomText color={'white'}>{this.props.score}</CustomText>
                                    <Image source={require('../../assets/Stuff/goldStar.png')} style={{ width: detailIconSize, height: detailIconSize }} />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.acceptButton}>
                        <TouchableOpacity style={[styles.max, styles.center]} onPress={this.props.onInvitationAccepted}>
                            <ImageBackground source={GreenButton} style={[styles.max, styles.center]} resizeMode='contain'>
                                <CustomText style={styles.redButtonText}>JOACA</CustomText>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                </View>
            </ModalTemplate>
        );
    }
}

const styles = StyleSheet.create({
    redButtonText: {
        position: 'relative',
        bottom: '5%'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    max: {
        width: '100%',
        height: '100%'
    },
    acceptButton: {
        width: '50%',
        height: '15%'
    },
    invitationDescription: {
        position: 'relative',
        display: 'flex',
        flex: 1,
        width: '60%',
        justifyContent: 'center',
    },
    exitButtonPressArea: {
        width: '20%',
        height: '100%'
    },
    exitButton: {
        width: '100%',
        height: '22%',
        alignItems: 'flex-end'
    },
    content: {
        width: '90%',
        height: '70%',
        alignItems: 'center'
    },
    invitationArea: {
        height: '40%'
    },
    detailsContainer: {
        height: '40%',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row'
    }
});


export default InvitationModal; 