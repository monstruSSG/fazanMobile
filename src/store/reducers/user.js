import { SAVE_TOKEN } from '../actions/actionTypes';

const initialState = {
    token: ''
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        default:
            return state;
    }
};

export default userReducer;