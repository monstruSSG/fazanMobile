import * as USERS from './fakeData/users.json';
import * as ME from './fakeData/me.json';

export const getUsers = () => new Promise((resolve, reject) => resolve(Object.values(USERS)));

export const getMe = () => new Promise((resolve, reject) => resolve(ME));