import { SAVE_TOKEN, DELETE_TOKEN } from '../actions/actionTypes';

const initialState = {
    token: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        case DELETE_TOKEN: 
            return {
                ...state,
                token: null
            }
        default:
            return state;
    }
};

export default userReducer;