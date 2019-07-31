import { createStore, combineReducers, compose } from 'redux';

import exampleReducer from './reducers/example';

const rootReducer = combineReducers({
    example: exampleReducer
});

let composeEnhacers = compose;

if (__DEV__) {
    composeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => createStore(rootReducer, composeEnhacers());

export default configureStore;