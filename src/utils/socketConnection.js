import SocketIOClient from 'socket.io-client';

import CONSTANTS from '../utils/constants'

module.exports = {
    createConnection: token => {
        return SocketIOClient(CONSTANTS.backendUrl, {
            extraHeaders: { authorisation: `Bearer ${token}` }
        });
    }
}