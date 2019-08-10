import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Pie from 'react-native-pie';

import Text from '../../components/UI/Text/Text';
import CONSTANTS from '../../utils/constants';
import Header from '../../components/Header/Header';

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
                            {key: 'a', text: 'Ana are foarte multe mere'}, 
                            {key: 'b', text:'Fain flatlistu,nu?'}
                        ]}
                        renderItem={({item}) => <Text>{item.key}</Text>}
                    />
                    <Text>Ana are mere</Text>
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
        backgroundColor: 'red'
    },
    stats: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow'
    },
    points: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'pink'
    },
    textPointWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    textPoint: {
        fontSize: 30,
        fontFamily: 'bold'
    },
    levelPointWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue'
    },
    levelPoint: {
        fontSize: 30,
        fontFamily: 'bold'
    },
    gamesData: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'green'
    }

});

export default ProfileScreen;