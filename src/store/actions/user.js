import axios from 'axios';

import { SAVE_TOKEN } from './actionTypes';
import CONSTANTS from '../../utils/constants';

export const login = data => axios.post(`${CONSTANTS.backendUrl}/auth/login`, data)
    .then(res => Promise.resolve({ ...res.data.user }))


export const saveToken = token => dispatch => {
    dispatch({
        type: SAVE_TOKEN,
        payload: token
    })
    return Promise.resolve()
}