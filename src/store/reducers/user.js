import { SAVE_TOKEN, DELETE_TOKEN, OPONENT_NAME } from '../actions/actionTypes';

const initialState = {
    token: null,
    oponentName: null
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
        case OPONENT_NAME:
            return {
                ...state,
                oponentName: action.payload
            }
        default:
            return state;
    }
};

export default userReducer;