import { SAVE_TOKEN, DELETE_TOKEN} from './actionTypes';

export const saveToken = token => dispatch => {
    dispatch({
        type: SAVE_TOKEN,
        payload: token
    });
    return Promise.resolve();        
}

export const deleteToken = () => dispatch => {
    dispatch({
        type: DELETE_TOKEN
    });
    return Promise.resolve();        
}