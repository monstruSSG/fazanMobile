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
                        <View style={styles.gamesDataStatusWrapper}>
                            <View style={styles.gamesDataStats}>
                                <Pie
                                    radius={50}
                                    innerRadius={45}
                                    series={[60]}
                                    colors={[CONSTANTS.buttonColor]}
                                    backgroundColor={CONSTANTS.secondaryColor} />
                                <View style={styles.insidePie}>
                                    <Text color="azure" style={styles.insidePieText}>60%</Text>
                                </View>
                            </View>
                            <View style={styles.gamesData}>
                                <View style={styles.textPointWrapper}>
                                    <Text color="azure" style={styles.textPoint}>7543</Text>
                                </View>
                                <View style={styles.levelPointWrapper}>
                                    <Text color="azure" style={styles.levelPoint}>Level 66</Text>
                                </View>
                                <View style={styles.lastGamesStatus}>
                                    <Text color={CONSTANTS.buttonColor} style={styles.resultText}>L/</Text>
                                    <Text color={CONSTANTS.secondaryColor} style={styles.resultText}>W/</Text>
                                    <Text color={CONSTANTS.buttonColor} style={styles.resultText}>L</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.lastGames}>
                            <FlatList
                                data={[
                                    { key: 'a', oponentName: 'Silviu MSR', status: 'L' },
                                    { key: 'b', oponentName: 'Comiati RUPTU', status: 'W' },
                                    { key: 'c', oponentName: 'Comiati RUPTU Cu nume foarte lung', status: 'L' }
                                ]}
                                renderItem={({ item }) => <GameDetails
                                    oponentName={item.oponentName}
                                    status={item.status}
                                />}
                            />
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
    },
    gamesDataStatusWrapper: {
        flex: 1,
        flexDirection: 'row',
    },
    gamesDataStats: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    gamesData: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 14
    },
    lastGames: {
        flex: 2,
    },
    textPointWrapper: {
        flex: 1,
    },
    levelPointWrapper: {
        flex: 1,
    },
    lastGamesStatus: {
        flex: 1,
        flexDirection: 'row'
    },
    textPoint: {
        fontSize: 43
    },
    levelPoint: {
        letterSpacing: 2,
        fontSize: 16
    },
    resultText: {
        paddingRight: 4,
        fontSize: 36
    },
    insidePie: {
        position: 'absolute',
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
      },
      insidePieText: {
        backgroundColor: 'transparent',
        fontSize: 24,
      },
});

export default ProfileScreen;