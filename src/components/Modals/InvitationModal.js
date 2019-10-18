import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

import CustomText from '../../components/UI/Text/Text';
import ModalTemplate from './ModalTemplate';

import GreenButton from '../../assets/Buttons/greenLabel.png';
import Bg from '../../assets/Modals/invitationModal.png';

class InvitationModal extends Component {

    render() {
        return (
            <ModalTemplate background={Bg} isVisible={this.props.isVisible}>
                <View style={[styles.content]}>
                    <View style={styles.exitButton}>
                        <TouchableOpacity style={styles.exitButtonPressArea} onPress={this.props.onClose} />
                    </View>
                    <View style={[styles.invitationDescription]}>
                        <CustomText style={{textAlign: 'center'}}> Ai primit invitatie de la {'\n'}
                            <CustomText color='white' large style={{textAlign: 'center'}}>{this.props.from}</CustomText>
                        </CustomText>
                    </View>
                    <View style={styles.acceptButton}>
                        <TouchableOpacity style={[styles.max, styles.center]} onPress={this.props.onInvitationAccepted}>
                            <ImageBackground source={GreenButton} style={[styles.max, styles.center]} resizeMode='contain'>
                                <CustomText style={styles.redButtonText}>ACCEPTA</CustomText>
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
        position: 'relative',
        top: '25%',
        width: '50%',
        height: '15%'
    },
    invitationDescription: {
        position: 'relative',
        top: '15%',
        height: '35%',
        width: '50%',
        alignItems: 'center',
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
    }
});

export default InvitationModal; 