import axios from 'axios';

import * as USERS from './fakeData/users.json';
import * as ME from './fakeData/me.json';
import CONSTANTS from './constants';

export const login = data => axios.post(`${CONSTANTS.backendUrl}/auth/login`, data)
    .then(res => Promise.resolve({ ...res.data.user }))

export const getUserss = (token, from, limit) => axios.get(`${CONSTANTS.backendUrl}/user?from=${from}&limit=${limit}`, {
    headers: {
        Authorisation: `Bearer ${token}`
    }
}).then(result => Promise.resolve(result.data))

export const isLogged = token => axios.get(`${CONSTANTS.backendUrl}/isLogged`, {
    headers: {
        Authorisation: `Bearer ${token}`
    }
});

export const getUsers = () => new Promise((resolve, reject) => resolve([]))

export const getMe = token => axios.get(`${CONSTANTS.backendUrl}/user/profile`, {
    headers: {
        Authorisation: `Bearer ${token}`
    }
}).then(response => Promise.resolve(response.data.user));