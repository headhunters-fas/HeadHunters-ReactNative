import {
    GENRE_ALL,
    GENRE_CHANGED,
    ALBUM_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    loading: true,
    albums: null,
    genre: '',
    loadBtn: false
};

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case ALBUM_FETCH_SUCCESS:
            return { ...state,
                loading: false,
                albums: action.payload };
        case GENRE_CHANGED:
            return { ...state, genre: action.payload };
        case GENRE_ALL:
            return { ...state, genre: '' };
        default:
            return state;
    }
};
