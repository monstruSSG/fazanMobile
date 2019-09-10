import React from 'react';
import { View, Modal, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import DefaultInput from '../UI/DefaultInput/DefaultInput';
import Text from '../UI/Text/Text';
import Button from '../UI/Button/Button';
import CONSTANTS from '../../utils/constants';
import Avatar from '../../assets/av.png';

const sideDrawer = props => (
    <Modal visible={props.isVisible} onRequestClose={props.onClose} animationType="fade" transparent={true}>
        <View style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
            <View style={{
                width: "75%",
                height: "100%",
                backgroundColor: "azure",
                elevation: 20,
                borderTopRightRadius: 15,
                borderBottomRightRadius: 15,
            }}>
                <View style={styles.imageContainer}>
                    <TouchableOpacity style={styles.backIcon}  onPress={props.closeSideDrawer}>
                        <View style={styles.backIcon}>
                            <Icon name='arrow-left' size={25} color="black" />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.userDetailsContainer}>
                        <Image style={styles.logo} source={Avatar} />
                        <Text style={styles.userName}>Silviu Profile</Text>
                    </View>
                </View>
                <View style={styles.optionsContainer}>
                    <View style={styles.option}>
                        <Icon style={styles.optionIcon} name='arrow-left' size={25} color="black" />
                        <Text style={styles.optionName}>Single player mode</Text>
                    </View>
                    <View style={styles.option}>
                        <Icon style={styles.optionIcon} name='arrow-left' size={25} color="black" />
                        <Text style={styles.optionName}>Clasament</Text>
                    </View>
                    <View style={styles.option}>
                        <Icon style={styles.optionIcon} name='arrow-left' size={25} color="black" />
                        <Text style={styles.optionName}>Profil</Text>
                    </View>
                </View>
                <View style={styles.exitContainer}>
                    <Text style={styles.exitName}>Logout</Text>
                </View>
            </View>
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    imageContainer: {
        width: "100%",
        height: "20%",
        borderBottomWidth: 1,
        borderBottomColor: 'black'
    },
    logo: {
        width: "50%",
        height: "80%",
    },
    userName: {
        width: "100%",
        height: "100%",
        letterSpacing: 3,
    },
    backIcon: {
        width: "30%",
        height: "30%",
        paddingLeft: 4,
        paddingTop: 2
    },
    userDetailsContainer: {
        width: "100%",
        height: "70%",
        alignItems: "center"
    },
    optionsContainer: {
        width: "100%",
        height: "70%",
        alignItems: "center",
        paddingTop: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'black'
    },
    option: {
        display: "flex",
        marginTop: 20,
        height: 50,
        flexDirection: 'row',
    },
    optionIcon: {
        flex: 1,
        textAlign: "center",
    },
    optionName: {
        flex: 4,
        textAlign: 'left',
        fontSize: 16,
    },
    exitContainer: {
        width: "100%",
        height: "10%",
        alignItems: "center"
    },
    exitName: {
        paddingTop: 12,
        textTransform: 'uppercase',
        fontSize: 16
    }
})

export default sideDrawer; 