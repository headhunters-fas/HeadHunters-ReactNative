import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    CONFIRM_PASSWORD_CHANGED,
    SIGNUP_USER,
    SIGNUP_USER_FAIL,
    SIGNUP_USER_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
    email: '',
    password: '',
    confirmPassword: '',
    user: null,
    error: {
        password: '',
        username: '',
        message: ''
    },
    loading: false
}; 

export default (state = INITIAL_STATE, action) => {
    switch (action.type) { 
        case EMAIL_CHANGED: 
            return { ...state, email: action.payload }; 
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case CONFIRM_PASSWORD_CHANGED:
            return { ...state, confirmPassword: action.payload };
        case SIGNUP_USER:
            return { ...state, loading: true, error: '' };
        case SIGNUP_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload };
        case SIGNUP_USER_FAIL:
            return { ...state, error: action.payload, password: '', loading: false };
        default:                                        
            return state;
    }
};