import * as USERS from './fakeData/users.json';
import * as ME from './fakeData/me.json';
import CONSTANTS from './constants';
import axios from 'axios';

export const getUserss= (from, limit) => axios.get(`${CONSTANTS.backendUrl}/user?from=${from}&limit=${limit}`)
    .then(response => {
      console.log(response, 'RESPONSE')  
    })
    .catch(err => console.log(err));

export const isLogged = token => axios.get(`${CONSTANTS.backendUrl}/isLogged`, {
    headers: {
        Authorisation: `Bearer ${token}`
    }
});

export const getUsers = () => new Promise((resolve, reject) => resolve([]))

export const getMe = token => axios.get(`${CONSTANTS.backendUrl}/user/profile`,{
    headers: {
        Authorisation: `Bearer ${token}`
    }
}).then(response => Promise.resolve(response.data.user));