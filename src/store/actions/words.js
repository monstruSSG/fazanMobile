import SQL from 'react-native-sqlite-storage';

import { CONNECT_DB, CLOSE_DB } from './actionTypes';
import { GET_WORDS } from '../../utils/querys';

export const connectToDb = () => dispatch => new Promise((resolve, reject) => {
    let db = SQL.openDatabase({
        name: 'fazanWords.db',
        readOnly: true,
        createFromLocation: 1
    }, () => {
        dispatch({
            type: CONNECT_DB,
            payload: { db }
        });
        return resolve(db);
    }, reject)
})

//returns true if word exists in db, false otherwise
export const checkWordExists = word => (dispatch, getState) =>
    new Promise((resolve, reject) => {
        const { db } = getState();

        return db.transaction(tx =>
            tx.executeSql(`${GET_WORDS} WHERE word=?`, [word], (tx, res) => resolve((res.rows.length > 0)),
                err => reject(err.message)),
            err => reject(err.message))

    })


//returns true if word with given prefix exists, false otherwise
export const checkWordExistsWithPrefix = prefix => (dispatch, getState) =>
    new Promise((resolve, reject) => {
        const { db } = getState();

        return db.transaction(tx =>
            tx.executeSql(`${GET_WORDS} WHERE word LIKE '${prefix}%'`, [], (tx, res) => resolve((res.rows.length > 0)),
                err => reject(err.message)),
            err => reject(err.message))
    })

//returns first word found with given prefix, undefined if none found
export const generateWord = prefix => (dispatch, getState) =>
    new Promise((resolve, reject) => {
        return db.transaction(tx =>
            tx.executeSql(`${GET_WORDS} WHERE word LIKE '${prefix}%'`, [], (tx, res) => resolve((res.rows[0])),
                err => reject(err.message)),
            err => reject(err.message))
    })

export const closeDbConnection = () => (dispatch, getState) => {
    const { db } = getState();

    db.close();

    dispatch({
        type: CLOSE_DB
    })
}
