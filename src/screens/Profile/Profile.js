import React, { Component } from 'react';
import { View, StyleSheet, FlatList, ImageBackground } from 'react-native';
import Pie from 'react-native-pie';

import Text from '../../components/UI/Text/Text';
import CONSTANTS from '../../utils/constants';
import Header from '../../components/Header/Header';
import GameDetails from '../../components/GameDetails/GameDetails';
import BackgroundImg from '../../assets/back.png';

class ProfileScreen extends Component {
    static navigationOptions = {
        header: null,
    }

    navigateHomeScreen = () => this.props.navigation.navigate('Home');

    render() {
        return (

            <ImageBackground source={BackgroundImg} style={{ width: '100%', height: '100%' }}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Header
                            title='Xulescu Andrei'
                            navigate={this.navigateHomeScreen} />
                    </View>
                    <View style={styles.gamesDataWrapper}>
                        <View style={styles.gamesDataStats}>
                            <Pie
                                radius={70}
                                series={[60]}
                                colors={[CONSTANTS.borderColor]}
                                backgroundColor={CONSTANTS.buttonColor} />
                        </View>
                        <View style={styles.gamesData}>
                            <View style={styles.points}>
                                <View style={styles.textPointWrapper}>
                                    <Text style={styles.textPoint}>1200223</Text>
                                </View>
                                <View style={styles.levelPointWrapper}>
                                    <Text style={styles.levelPoint}>Level 66</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.lastGames}>

                        </View>
                    </View>
                </View>
            </ImageBackground>
                );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center'
    },
    header: {
        flex: 1
    },
    gamesDataWrapper: {
        flex: 7,
        
    }

});

export default ProfileScreen;