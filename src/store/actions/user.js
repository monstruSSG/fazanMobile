import { SAVE_TOKEN, DELETE_TOKEN, OPONENT_NAME} from './actionTypes';

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

export const setOponentName = name => dispatch => {
    dispatch({
        type: OPONENT_NAME,
        payload: name
    });
    return Promise.resolve();  
}