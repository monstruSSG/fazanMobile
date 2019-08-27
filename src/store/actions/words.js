import SQL from 'react-native-sqlite-storage';

import { CONNECT_DB, CLOSE_DB } from './actionTypes';
import { GET_WORDS } from '../../utils/querys';
import CONSTANTS from '../../utils/constants';

const wordsNumber = 40000;

export const connectToDb = () => dispatch => new Promise((resolve, reject) => {
    let db = SQL.openDatabase({
        name: CONSTANTS.db.name,
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

export const generateStartWord = () => (dispatch, getState) => new Promise((resolve, reject) => {
    const { db } = getState().words;
    const uniqueNumber = Math.floor(Math.random() * (wordsNumber + 1));

    return db.transaction(tx =>
        tx.executeSql(`${GET_WORDS} WHERE words.id=?`, [uniqueNumber], (tx, res) => resolve(res.rows.item(0).word),
            err => reject(err.message)),
        err => reject(err.message))    
})

//returns true if word exists in db, false otherwise
export const checkWordExists = word => (dispatch, getState) =>
    new Promise((resolve, reject) => {
        const { db } = getState().words;

        return db.transaction(tx =>
            tx.executeSql(`${GET_WORDS} WHERE word=?`, [word], (tx, res) => resolve((res.rows.length > 0)),
                err => reject(err.message)),
            err => reject(err.message))

    })


//returns true if word with given prefix exists, false otherwise
export const checkWordExistsWithPrefix = prefix => (dispatch, getState) =>
    new Promise((resolve, reject) => {
        const { db } = getState().words;

        return db.transaction(tx =>
            tx.executeSql(`${GET_WORDS} WHERE word LIKE '${prefix}%'`, [], (tx, res) => {
                resolve(res.rows.length > 0)

            }),
            err => reject(err.message),
            err => reject(err.message))
    })

//returns first words found with given prefix, emptyarray otherwise
export const generateWord = word => (dispatch, getState) =>
    new Promise((resolve, reject) => {
        const { db } = getState().words;

        return db.transaction(tx =>
            tx.executeSql(`${GET_WORDS} WHERE word LIKE '${word.slice(-2)}%'`, [], (tx, res) => {
                let endOfInterval = res.rows.length;

                if (endOfInterval < 0) return resolve('')

                let randomNumber = Math.floor(Math.random() * (endOfInterval + 1))

                return resolve(res.rows.item(randomNumber).word)
            },
                err => reject(err.message)),
            err => reject(err.message))
    })

export const closeDbConnection = () => (dispatch, getState) => {
    const { db } = getState().words;

    db.close();

    dispatch({
        type: CLOSE_DB
    })
}
