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
        <View style={styles.contentWrapper}>
            <View style={styles.max}>
                <View style={[styles.max, styles.container]}>
                    <ImageBackground source={RankingModal} resizeMode="stretch" style={styles.backgroundImageContainer}>
                        <View style={styles.titleContainer}>
                            <TouchableOpacity onPress={props.closeModal}>
                                <ImageBackground style={styles.buttonImage} resizeMode="cover" source={ExitButton}>
                                </ImageBackground>
                            </TouchableOpacity>
                            <ImageBackground resizeMode="stretch" style={styles.titleImage} source={Title}>
                                <View style={[styles.centerItems, styles.max, styles.titleTextContainer]}>
                                    <Text style={styles.titleText}>CLASAMENT</Text>
                                </View>
                            </ImageBackground>
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
    contentWrapper: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    centerItems: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    max: {
        flex: 1
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
        height: "100%",
        width: "95%",
        position: 'relative',
        bottom: "150%",
        left: '5%'
    },
    buttonImage: {
        width: "40%",
        height: "90%",
        left: '88%',
        bottom: "8%"
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
    },
    titleTextContainer: {
        display: 'flex'
    },
    titleText: {
        position: 'relative',
        marginTop: '5%',
        fontFamily: 'Troika',
        color: 'white',
        fontSize: 26,
        letterSpacing: 2,
    }
})

export default rankingModal; 