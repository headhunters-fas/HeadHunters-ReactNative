import axios from 'axios';
import { AsyncStorage, ToastAndroid } from 'react-native';
import {
    PROFILE_FETHCED,
    USERS_FETCHED,
    PROFILE_SAVED,
    ACCOUNT_SELECTED
} from './types';

export const getUserProfile = () => {
    return (dispatch) => {
        AsyncStorage.getItem('id_token')
        .then(res => { 
            axios.get('https://headhunters-api.herokuapp.com/api/users/profile', {
                headers: {
                    Authorization: res
                }
            })
            .then((resp) => { 
                dispatch({ type: PROFILE_FETHCED, payload: resp.data }); 
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    };
};

export const saveProfile = (profile) => {
    return (dispatch) => {
        AsyncStorage.getItem('id_token')
        .then(res => { 
            axios.post('https://headhunters-api.herokuapp.com/api/users/profile', profile, {
                headers: {
                    Authorization: res
                }
            })
            .then((resp) => { 
                dispatch({ type: PROFILE_SAVED, payload: resp }); 
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    };
};

export const updateProfile = (profile) => {
    return () => {
        AsyncStorage.getItem('id_token')
        .then(res => { 
            axios.put(`https://headhunters-api.herokuapp.com/api/users/${profile.id}`, profile, {
                headers: {
                    Authorization: res
                }
            })
            .then(() => { 
                ToastAndroid.showWithGravity(
                    'Tu perfil ha sido actualizado!',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    };
};

export const getAllArtists = () => {
    return (dispatch) => {
        AsyncStorage.getItem('id_token')
        .then(res => { 
            axios.get('https://headhunters-api.herokuapp.com/api/users/getAll', {
                headers: {
                    Authorization: res
                }
            })
            .then((resp) => { 
                console.log(resp.data);
                dispatch({ type: USERS_FETCHED, payload: resp.data }); 
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    };
};

export const setAccount = (value) => {
    return {
        type: ACCOUNT_SELECTED,
        payload: value
    };
};
