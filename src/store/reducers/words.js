import { CHECK_WORD_EXISTS, CHECK_WORD_EXISTS_WITH_PREFIX, CONNECT_DB, CLOSE_DB } from '../actions/actionTypes';

const initialState = {
    db: null
};

const wordsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONNECT_DB:
            return {
                ...state,
                db: action.payload.db
            }
        case CLOSE_DB:
            return {
                ...state,
                db: null
            }
        default:
            return state;
    }
};

export default wordsReducer;