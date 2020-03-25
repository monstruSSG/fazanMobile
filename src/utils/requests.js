import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import CONSTANTS from './constants';

// Configure axios token interceptor
axios.interceptors.request.use(async config => {
    let token = await AsyncStorage.getItem('token')
    console.log(token)
    if (token) config.headers.authorisation = `Bearer ${token}`;

    return config;
}, (error) => Promise.reject(error));

export const login = data => axios.post(`${CONSTANTS.backendUrl}/auth/login`, data)
    .then(res => Promise.resolve({ ...res.data.user }))

export const getUsers = (_, from, limit, search) => axios.get(`${CONSTANTS.backendUrl}/user?from=${from}&limit=${limit}&search=${search}`)
    .then(result => Promise.resolve(result.data.users))

export const isLogged = _ => axios.get(`${CONSTANTS.backendUrl}/isLogged`);

export const getMe = _ => axios.get(`${CONSTANTS.backendUrl}/user/profile`)
    .then(response => Promise.resolve({ user: response.data.user, history: response.data.gamesHistory }));