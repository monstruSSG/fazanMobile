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
 
    //get a popular word which does not end the game

    return db.transaction(tx =>
        tx.executeSql(`${GET_WORDS} WHERE weight = 1 and closed = 0 order by RANDOM() limit 1`, [] , (tx, res) => {
            let item = res.rows.item(0)
            return resolve(item)
        },
            err => reject(err)),
        err => reject(err))
})

//returns true if word exists in db, false otherwise
export const checkWordExists = word => (dispatch, getState) =>
    new Promise((resolve, reject) => {
        const { db } = getState().words;

        word = word.toLowerCase();

        return db.transaction(tx =>
            tx.executeSql(`${GET_WORDS} WHERE word=? limit 1`, [word], (tx, res) => resolve((res.rows.length > 0)),
                err => reject(err.message)),
            err => reject(err.message))

    })


//returns true if word with given prefix exists, false otherwise
export const checkWordExistsWithPrefix = prefix => (dispatch, getState) =>
    new Promise((resolve, reject) => {
        const { db } = getState().words;

        prefix = prefix.toLowerCase();

        return db.transaction(tx =>
            tx.executeSql(`${GET_WORDS} WHERE word LIKE '${prefix}%' limit 1`, [], (tx, res) => {
                resolve(res.rows.length > 0)

            }),
            err => reject(err.message),
            err => reject(err.message))
    })

//returns first words found with given prefix, emptyarray otherwise
export const generateWord = (word, generatedWords) => (dispatch, getState) =>
    new Promise((resolve, reject) => {
        const { db } = getState().words;

        word = word.toLowerCase();

        return db.transaction(tx =>
            tx.executeSql(`Select id, word, weight, random() as r from words WHERE word LIKE '${word.slice(-2)}%' and id not IN (?) order by weight desc, r limit 1`, [generatedWords], (tx, res) => {
                
                return resolve(res.rows.item(0))
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
