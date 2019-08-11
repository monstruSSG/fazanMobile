import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Pie from 'react-native-pie';

import Text from '../../components/UI/Text/Text';
import CONSTANTS from '../../utils/constants';
import Header from '../../components/Header/Header';
import GameDetails from '../../components/GameDetails/GameDetails';

class ProfileScreen extends Component {
    static navigationOptions = {
        header: <Header title='My custom header' />,
    }

    render() {
        return (
            <View style={styles.content}>
                <View style={styles.gamesData}>
                    <View style={styles.stats}>
                        <Pie
                            radius={70}
                            innerRadius={30}
                            series={[60]}
                            colors={['#f00']}
                            backgroundColor='#61B329' />
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
                    <FlatList
                        data={[
                            { key: 'a', name: 'Silviu MSR', points: 12312 },
                            { key: 'b', name: 'Comiati RUPTU', points: 200 },
                            { key: 'c', name: 'Comiati RUPTU', points: 200 },
                            { key: 'd', name: 'Cozloschi', points: 210 },
                            { key: 'e', name: 'Rapperu xxx', points: 21200 },
                            { key: 'f', name: 'Unknown', points: 9200 }
                        ]}
                        renderItem={({ item }) => <GameDetails
                            name={item.name}
                            points={item.points}
                        />}
                    />
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
    lastGames: {
        flex: 1,
        justifyContent: 'center'
    },
    stats: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    }

});

export default ProfileScreen;