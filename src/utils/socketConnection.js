import SocketIOClient from 'socket.io-client';

import CONSTANTS from '../utils/constants'

module.exports = {
    createConnection: () => {
        return SocketIOClient(CONSTANTS.backendUrl);
    }   
}