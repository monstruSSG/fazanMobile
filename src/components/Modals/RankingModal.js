import React from 'react';
import { View, Modal, StyleSheet, Image, TouchableOpacity, FlatList, ImageBackground, Text, Button } from 'react-native';

import ClasamentUserDetails from '../ClasamentUserDetails/ClasamentUserDetails';

import RankingModal from '../../assets/Modals/clasamentModal.png';
import Title from '../../assets/Modals/titleShadow.png';
import ExitButton from '../../assets/Buttons/exitButton.png';

const renderUserList = props => {

    return <FlatList
        data={props.users.map((user, index) => ({ ...user, key: index || '1' }))}
        renderItem={({ item }) => <ClasamentUserDetails
            name={item.username}
            points={item.score || 123}
            position={item.key}
        />}
    />
}

const rankingModal = props => (

    <Modal visible={props.isVisible} onRequestClose={props.onClose} animationType="slide" transparent={true}>
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)'
        }}>
            <View style={{
                width: "100%",
                height: "100%"
            }}>
                <View style={styles.container}>
                    <ImageBackground source={RankingModal} resizeMode="stretch" style={styles.backgroundImageContainer}>
                        <View style={styles.titleContainer}>
                            <TouchableOpacity onPress={props.closeModal}>
                                <ImageBackground style={styles.buttonImage} resizeMode="cover" source={ExitButton}>
                                </ImageBackground>
                            </TouchableOpacity>
                            <Image resizeMode="stretch" style={styles.titleImage} source={Title} />
                        </View>
                        <View style={styles.usersContainerWrapper}>
                            <View style={styles.userWrapper}>
                                {renderUserList(props)}
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            </View>
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        justifyContent: "flex-end"
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
        height: "100%",
        width: "95%",
        position: 'relative',
        bottom: "150%"
    },
    buttonImage: {
        width: "40%",
        height: "90%",
        left: '85%',
        bottom: "20%"
    },
    usersContainerWrapper: {
        height: "75%",
        width: "80%",
        position: 'absolute',
        left: "15%",
        top: "8%",
        alignItems: 'center',
    },
    userWrapper: {
        width: "100%"
    }
})

export default rankingModal; 