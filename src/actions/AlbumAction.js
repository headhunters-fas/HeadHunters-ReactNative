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
    console.log("ALBUMSITO", album);
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
    return (dispatch) => {
        AsyncStorage.getItem('id_token')
        .then(res => { 
            axios.get('http://10.0.2.2:8080/api/users/albums/all', {
                headers: {
                    Authorization: res
                }
            })
            .then((resp) => { dispatch({ type: ALBUM_FETCH_SUCCESS, payload: resp.data }); })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    };
};

export const albumDelete = ({ title, id }) => {
    return () => {
        AsyncStorage.getItem('id_token')
        .then(res => { 
            axios.delete(`http://10.0.2.2:8080/api/users/albums/${id}`, {
                headers: {
                    Authorization: res
                }
            })
            .then(() => { 
                toastMessage(`Se ha eliminado ${title} de la playlist.`);
                Actions.myList({ type: 'pop' });
             });
        })
        .catch(err => console.log(err));
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
