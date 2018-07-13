import axios from 'axios';
import { FETCH_USER, FETCH_PROFILE, FETCH_POSTS } from './types';

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

export const fetchPosts = () => {
    return async dispatch => {
        const res = await axios.get("/api/posts/")
        dispatch({ type: FETCH_POSTS, payload: res.data })
    }
}