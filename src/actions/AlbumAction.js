import { ToastAndroid, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import {
    ACCOUNT_SELECTED,
    GENRE_CHANGED,
    GENRE_ALL,
    ALBUM_FETCH_SUCCESS
} from './types';


export const albumAdd = (album) => {
    return () => {
        AsyncStorage.getItem('id_token')
        .then(res => { 
            console.log(res);
            axios.post('http://10.0.2.2:8080/api/users/albums', album, {
                headers: {
                    Authorization: res //the token is a variable which holds the token
                }
            })
            .then((resp) => { console.log(resp); toastMessage(`¡Has agregado ${album.title} a la playlist!`); })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    };
};

export const albumsFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/albums`)
        .on('value', snapshot => { //snapshot is an object that describes de data to handle our albums and has access to it
            dispatch({ type: ALBUM_FETCH_SUCCESS, payload: snapshot.val() });
        });
    };
};

export const albumDelete = ({ title, uid }) => {
    const { currentUser } = firebase.auth();

    return () => {
        firebase.database().ref(`/users/${currentUser.uid}/albums/${uid}`)
        .remove()
        .then(() => {
            toastMessage(`Se ha eliminado ${title} de la playlist.`);
            Actions.myList({ type: 'pop' });
        });
    };
};

export const genreChanged = (genre) => {
    return {
        type: GENRE_CHANGED,
        payload: genre
    };
};

export const genreAll = () => {
    return {
        type: GENRE_ALL,
        payload: 'todos los generos'
    };
};

export const setAccount = (value) => {
    return {
        type: ACCOUNT_SELECTED,
        payload: value
    };
};

const toastMessage = (texto) => {
    ToastAndroid.showWithGravity(
        texto,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
    );
};
