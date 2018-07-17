import { combineReducers } from "redux";
import authReducer from "./authReducer"
import profileReducer from "./profileReducer";
import postsReducer from "./postsReducer";

export default combineReducers({
    auth: authReducer,
    profile: profileReducer,
    posts: postsReducer
})