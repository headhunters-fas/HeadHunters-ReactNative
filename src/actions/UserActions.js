import axios from 'axios';
import { AsyncStorage, ToastAndroid } from 'react-native';
import {
    PROFILE_FETHCED,
    PROFILE_SAVED,
    ACCOUNT_SELECTED
} from './types';

export const getUserProfile = () => {
    return (dispatch) => {
        AsyncStorage.getItem('id_token')
        .then(res => { 
            axios.get('http://10.0.2.2:8080/api/users/profile', {
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
            axios.post('http://10.0.2.2:8080/api/users/profile', profile, {
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
            axios.put(`http://10.0.2.2:8080/api/users/${profile.id}`, profile, {
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

export const setAccount = (value) => {
    return {
        type: ACCOUNT_SELECTED,
        payload: value
    };
};
