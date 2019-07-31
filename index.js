/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import { name as appName } from './app.json';
import configureStore from './src/store/configureStore'

import Router from './src/screens/Router'

const store = configureStore();

const FAZANRedux = () => (
    <Provider store={store}>
        <Router />
    </Provider>
);

AppRegistry.registerComponent(appName, () => FAZANRedux);