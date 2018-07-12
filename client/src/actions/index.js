import axios from 'axios';
import { FETCH_USER, FETCH_PROFILE } from './types';

export const fetchUser = () => {
    return async dispatch => {
        const res = await axios.get("/api/current_user")
        dispatch({ type: FETCH_USER, payload: res.data })
    }
}

export const fetchProfile = () => {
    return async dispatch => {
        const res = await axios.get("/api/profile/user/")
        dispatch({ type: FETCH_PROFILE, payload: res.data })
    }
}