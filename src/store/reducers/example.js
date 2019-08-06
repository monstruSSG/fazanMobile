import { EXAMPLE } from '../actions/actionTypes';

const initialState = {
    example: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case EXAMPLE:
            return {
                ...state,
                example: action.example
            };
        default:
            return state;
    }
};

export default reducer;