import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import * as actions from './actions';
import { connect } from 'react-redux';
import history from './history';

// Components
import Header from './components/header/Header';
import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import ProfileForm from './components/profile/forms/profileForm/ProfileForm';
import LocationForm from './components/profile/forms/locationForm/LocationForm';
import Posts from './components/posts/AllPosts';
import Post from './components/posts/Post';
import AddPost from './components/posts/forms/AddPost';
import AddComment from './components/posts/AddComment';
import Confirnmation from './components/posts/Confirmation';
import OthersProfile from './components/profile/OthersProfile';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchProfile();
    this.props.fetchPosts();
  }

  render() {
    return (
      <Router history={history}>
        <div className="bg-dark text-light" style={{ minHeight: '100vh' }}>
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/profileform" component={ProfileForm} />
          <Route path="/locationform" component={LocationForm} />
          <Route path="/posts" component={Posts} />
          <Route path="/post/:id" component={Post} />
          <Route path="/addpost" component={AddPost} />
          <Route path="/addcomment/:id" component={AddComment} />
          <Route path="/confirmation" component={Confirnmation} />
          <Route path="/profileother/:id" component={OthersProfile} />
        </div>
      </Router>
    );
  }
}

export default connect(
  null,
  actions
)(App);
