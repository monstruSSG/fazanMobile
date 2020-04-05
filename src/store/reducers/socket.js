import { CREATE_CONNECTION, CLOSE_CONNECTION, SET_OPONENT_SOCKETID, CLEAR_OPONENT_SOCKETID } from '../actions/actionTypes';

const initialState = {
    socket: null,
    oponentSocketId: null
};

const socketReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_CONNECTION:
            return {
                ...state,
                socket: action.payload
            }
        case CLOSE_CONNECTION:
            return {
                ...state,
                socket: action.payload
            }
        case SET_OPONENT_SOCKETID: 
            return {
                ...state,
                oponentSocketId: action.payload
            }
        case CLEAR_OPONENT_SOCKETID: 
            return {
                ...state,
                oponentSocketId: null
            }
        default:
            return state;
    }
};

export default socketReducer;