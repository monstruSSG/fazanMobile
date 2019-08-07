import { CREATE_CONNECTION } from './actionTypes';
import { createConnection } from '../../utils/socketConnection' 

export const createSocketConnection = () => dispatch => {
    const socket = createConnection();
    dispatch({
        type: CREATE_CONNECTION,
        payload: socket
    })
    return Promise.resolve(socket)
}