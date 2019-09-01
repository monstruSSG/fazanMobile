import * as USERS from './fakeData/users.json';

export const getUsers = () => new Promise((resolve, reject) => resolve(Object.values(USERS)));