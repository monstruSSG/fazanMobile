import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Pie from 'react-native-pie';

import Text from '../../components/UI/Text/Text';
import CONSTANTS from '../../utils/constants';
import Header from '../../components/Header/Header';
import GameDetails from '../../components/GameDetails/GameDetails';

class ProfileScreen extends Component {
    static navigationOptions = {
        header: null,
    }

    navigateHomeScreen = () => this.props.navigation.navigate('Home');

    render() {
        return (
            <View style={styles.content}>
                <View style={styles.header}>
                    <Header
                        title='Xulescu Andrei'
                        navigate={this.navigateHomeScreen} />
                </View>
                <View style={styles.gamesData}>
                    <View style={styles.stats}>
                        <Pie
                            radius={70}
                            series={[60]}
                            colors={[CONSTANTS.borderColor]}
                            backgroundColor={CONSTANTS.buttonColor} />
                    </View>
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
                    <View style={styles.oponent}>
                        <GameDetails name='Silviu MSR' points={12321} wins={100} loses={20} win/>
                    </View>
                    <View style={styles.oponent}>
                        <GameDetails name='Comiati RUPTU' points={99321} wins={100} loses={20} win/>
                    </View>
                    <View style={styles.oponent}>
                        <GameDetails name='Vali OLT' points={1331} wins={100} loses={20} lose/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: CONSTANTS.backgroundColor
    },
    header: {
        flex: 1
    },
    lastGames: {
        flex: 4,
        justifyContent: 'center'
    },
    stats: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow'
    },
    points: {
        flex: 1,
        justifyContent: 'center'
    },
    textPointWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textPoint: {
        fontSize: 30,
        fontFamily: 'bold'
    },
    levelPointWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    levelPoint: {
        fontSize: 30,
        fontFamily: 'bold'
    },
    gamesData: {
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    oponent: {
        flex: 1
    }

});

export default ProfileScreen;