import {
    PROFILE_FETHCED,
    PROFILE_SAVED,
    ACCOUNT_SELECTED
} from '../actions/types';

const INITIAL_STATE = {
    profile: null,
    account: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PROFILE_FETHCED:
            return { ...state, profile: action.payload };
        case ACCOUNT_SELECTED:
            return { ...state, account: action.payload };
        case PROFILE_SAVED:
            return { state };
        default:
            return state;
    }
};
