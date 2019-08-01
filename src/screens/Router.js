import { createStackNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from './Home/Home';
import SingleplayerScreen from './SingleplayerGame/SingleplayerGame';
import MultiplayerScreen from './MultiplayerGame/MultiplayerGame';
import AccountScreen from './Account/Account';
import SearchGameScreen from './SearchGame/SearchGame'

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
    Account: {
        screen: AccountScreen
    },
    SearchGame: {
        screen: SearchGameScreen
    }
}, {
        initialRouteName: 'Home'
    });

export default createAppContainer(stackNavigator);