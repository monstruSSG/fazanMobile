import { CREATE_CONNECTION, CLOSE_CONNECTION } from '../actions/actionTypes';

const initialState = {
    socket: null
};

const socketReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_CONNECTION:
            return {
                ...state,
                socket: action.payload
            }
        default:
            return state;
    }
};

export default socketReducer;