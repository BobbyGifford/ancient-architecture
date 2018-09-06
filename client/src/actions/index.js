import axios from 'axios';
import { FETCH_USER, FETCH_PROFILE, FETCH_POSTS, FETCH_POST } from './types';

export const fetchUser = () => {
  return async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
  };
};

export const fetchProfile = () => {
  return async dispatch => {
    const res = await axios.get('/api/profile/user/');
    dispatch({ type: FETCH_PROFILE, payload: res.data });
  };
};

export const fetchPosts = () => {
  return async dispatch => {
    const res = await axios.get('/api/posts/');
    dispatch({ type: FETCH_POSTS, payload: res.data });
  };
};

export const fetchPost = id => {
  return async dispatch => {
    const res = await axios.get('/api/posts/' + id);
    dispatch({ type: FETCH_POST, payload: res.data });
  };
};

export const deleteComment = async (postid, commentid) => {
  const res = await axios.delete(
    '/api/posts/comment/' + postid + '/' + commentid
  );
  console.log(res.data);

  fetchPosts();
};

// api/posts/comment/:postid/:commentid
