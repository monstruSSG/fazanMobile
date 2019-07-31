import { createStackNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from './Home/Home';
import SingleplayerScreen from './SingleplayerGame/SingleplayerGame';
import MultiplayerScreen from './MultiplayerGame/MultiplayerGame';
import SearchGameScreen from './SearchGame/SearchGame';

const stackNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen
    },
    Singleplayer: {
        screen: SingleplayerScreen
    },
    Multiplayer: {
        screen: MultiplayerScreen
    },
    SearchGame: {
        screen: SearchGameScreen
    }
}, {
        initialRouteName: 'Home'
    });

export default createAppContainer(stackNavigator);