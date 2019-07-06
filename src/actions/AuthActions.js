import axios from 'axios';
import firebase from 'firebase';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    CONFIRM_PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    SIGNUP_USER_FAIL,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER
} from './types';

 //curly braces allows us to specify which type we want to import as there are many 
const STORAGE_KEY = 'id_token';

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const confirmPasswordChanged = (text) => {
    return {
        type: CONFIRM_PASSWORD_CHANGED,
        payload: text
    };
};

export const loginUser = (newUser) => async dispatch => {
    dispatch({ type: LOGIN_USER });
    try {
        const res = await axios.post('https://headhunters-api.herokuapp.com/api/users/login', newUser);
        firebase.auth().signInWithEmailAndPassword(newUser.username, newUser.password)
        .then(user => console.log(user))
        .catch(err => console.log(err));
        loginUserSuccess(dispatch, res);
    } catch (error) {
        loginUserFail(dispatch, error.response.data);
    }
};

export const signupUser = (newUser) => async dispatch => {
    dispatch({ type: SIGNUP_USER });
    try {
        const res = await axios.post('https://headhunters-api.herokuapp.com/api/users/register', newUser);
        firebase.auth().createUserWithEmailAndPassword(newUser.username, newUser.password)
        .then(user => console.log(user))
        .catch(err => console.log(err));
        signupUserSuccess(dispatch, res);
    } catch (error) {
        signupUserFail(dispatch, error.response.data);
    }
};


const loginUserFail = (dispatch, error) => {
    dispatch({ 
        type: LOGIN_USER_FAIL,
        payload: error
    });
};

const loginUserSuccess = (dispatch, res) => {
    onValueChange(STORAGE_KEY, res.data.token);

    dispatch({
        type: LOGIN_USER_SUCCESS
    });

    Actions.main();
};

const signupUserFail = (dispatch, error) => {
    dispatch({ 
        type: SIGNUP_USER_FAIL,
        payload: error
    });
};

const signupUserSuccess = (dispatch, user) => {
    dispatch({
        type: SIGNUP_USER_SUCCESS,
        payload: user
    });

    Actions.login();
};

const onValueChange = (item, selectedValue) => {
    try {
      AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
};
