import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

import HomeScreen from './Home/Home';
import SingleplayerScreen from './SingleplayerGame/SingleplayerGame';
import MultiplayerScreen from './MultiplayerGame/MultiplayerGame';
import SearchGameScreen from './SearchGame/SearchGame';
import ProfileScreen from './Profile/Profile';
import LoginScreen from './Login/Login';


const UnauthorisedStack = createStackNavigator({
    Home: {
        screen: HomeScreen
    },
    Singleplayer: {
        screen: SingleplayerScreen
    },
    Multiplayer: {
        screen: LoginScreen
    },
    SearchGame: {
        screen: LoginScreen
    },
    Profile: {
        screen: LoginScreen
    }
}, {
    initialRouteName: 'Home'
});

const AuthorisedStack = createStackNavigator({
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
    }
}, {
    initialRouteName: 'SearchGame'
});

export default createAppContainer(
    createSwitchNavigator({
        Auth: AuthorisedStack,
        Unauth: UnauthorisedStack
    }, {
        initialRouteName: 'Unauth'
    })
);