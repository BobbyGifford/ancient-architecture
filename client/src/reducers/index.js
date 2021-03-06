import { combineReducers } from 'redux';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import postsReducer from './postsReducer';
import postReducer from './postReducer';

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  posts: postsReducer,
  post: postReducer,
});
