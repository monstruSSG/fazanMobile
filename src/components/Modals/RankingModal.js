import React from 'react';
import { View, Modal, StyleSheet, Image, TouchableOpacity, FlatList, ImageBackground, Text, Button } from 'react-native';

import ClasamentUserDetails from '../ClasamentUserDetails/ClasamentUserDetails';

import RankingModal from '../../assets/Modals/clasamentModal.png';

const renderUserList = props => <FlatList
    data={props.users.map((user, index) => ({ ...user, key: user._id, index: index + 1 }))}
    renderItem={({ item }) => <ClasamentUserDetails
        name={item.username}
        points={item.score || 123}
        position={item.index}
    />}
/>

export default props => (

    <Modal visible={props.isVisible} onRequestClose={props.onClose} animationType="slide" transparent={true}>
        <View style={[styles.contentWrapper, styles.max, styles.center]}>
            <ImageBackground style={[styles.max, styles.center]} source={RankingModal} resizeMode='contain'>
                <View style={[styles.contentSize, styles.centerItems]}>
                    <View style={[styles.header]}>
                        <View style={[styles.exitButton]}>
                            <TouchableOpacity style={[styles.max]} onPress={props.close} />
                        </View>
                    </View>
                    <View style={[styles.users, styles.centerItems]}>
                        {renderUserList(props)}
                    </View>
                </View>
            </ImageBackground>
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    users: {
        width: '70%',
        height: '73%',  
        position: 'relative',
        left: '2%'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        height: '20%',
        width: '100%',
        alignItems: 'flex-end'
    },
    exitButton: {
        width: '20%',
        height: '100%'
    },
    max: {
        width: '100%',
        height: '100%'
    },
    contentSize: {
        width: '90%',
        height: '65%'
    },
    contentWrapper: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    centerItems: {
        alignItems: 'center'
    }
});