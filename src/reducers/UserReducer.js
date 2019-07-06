import {
    PROFILE_FETHCED,
    PROFILE_SAVED,
    ACCOUNT_SELECTED,
    USERS_FETCHED
} from '../actions/types';

const INITIAL_STATE = {
    loading: true,
    profile: null,
    users: [],
    account: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PROFILE_FETHCED:
            return { ...state, profile: action.payload };
        case ACCOUNT_SELECTED:
            return { ...state, account: action.payload };
        case PROFILE_SAVED:
            return state;
        case USERS_FETCHED:
            return { ...state, loading: false, users: action.payload };
        default:
            return state;
    }
};
