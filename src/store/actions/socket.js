import { CREATE_CONNECTION, CLOSE_CONNECTION, SET_OPONENT_SOCKETID, CLEAR_OPONENT_SOCKETID } from './actionTypes';
import { createConnection } from '../../utils/socketConnection' 

export const createSocketConnection = token => dispatch => {
    const socket = createConnection(token);

    dispatch({
        type: CREATE_CONNECTION,
        payload: socket
    })
    return Promise.resolve(socket)
}

export const closeSocketConnection = () => dispatch => {
    dispatch({
        type: CLOSE_CONNECTION,
        payload: null
    })
    return Promise.resolve()
}

export const setOponentSocketId = socketId => dispatch => {
    dispatch({
        type: SET_OPONENT_SOCKETID,
        payload: socketId
    })
    return Promise.resolve()
}

export const clearOponentSocketId = () => {
    dispatch({
        type: CLEAR_OPONENT_SOCKETID
    })
    return Promise.resolve()
}