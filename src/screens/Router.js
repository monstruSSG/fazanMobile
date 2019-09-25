import { createStackNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from './Home/Home';
import SingleplayerScreen from './SingleplayerGame/SingleplayerGame';
import MultiplayerScreen from './MultiplayerGame/MultiplayerGame';
import SearchGameScreen from './SearchGame/SearchGame';
import ProfileScreen from './Profile/Profile';
import LoginScreen from './Login/Login';

const ApplicationStack = createStackNavigator({
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
    },
    Profile: {
        screen: ProfileScreen
    },
    Login: {
        screen: LoginScreen
    }
}, {
    initialRouteName: 'Home'
});

export default createAppContainer(ApplicationStack);