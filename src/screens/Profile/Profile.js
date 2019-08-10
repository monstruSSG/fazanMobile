import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
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
                            radius={50}
                            innerRadius={45}
                            series={[60]}
                            colors={['#f00']}
                            backgroundColor='#ddd' />
                    </View>
                    <View style={styles.points}>
                        <Text>Point/elo etc</Text>
                    </View>
                </View>
                <View style={styles.lastGames}>
                    <Text>Game history</Text>
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
        backgroundColor: 'yellow'
    },
    points: {
        flex: 1,
        backgroundColor: 'pink'
    },
    gamesData: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'green'
    }

});

export default ProfileScreen;