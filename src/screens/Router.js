import { createStackNavigator, createAppContainer } from 'react-navigation';

import SingleplayerScreen from './SingleplayerGame/SingleplayerGame';
import HomeScreen from './Home/Home';
import MultiplayerScreen from './MultiplayerGame/MultiplayerGame';

export default createAppContainer(
    createStackNavigator({
        Home: { screen: HomeScreen }
    })
);