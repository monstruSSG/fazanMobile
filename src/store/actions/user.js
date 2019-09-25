import { SAVE_TOKEN } from './actionTypes';

export const saveToken = token => dispatch => {
    dispatch({
        type: SAVE_TOKEN,
        payload: token
    });
    return Promise.resolve();        
}