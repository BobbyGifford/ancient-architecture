import React, { Component } from 'react';
import { Router, Route } from "react-router-dom";
import * as actions from './actions';
import { connect } from 'react-redux';
import history from './history';

// Components
import Header from './components/header/Header';
import Home from './components/home/Home';
import Profile from './components/profile/Profile'
import ProfileForm from './components/profile/forms/profileForm/ProfileForm'
import LocationForm from './components/profile/forms/locationForm/LocationForm'

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchProfile();
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Header />
          <Route exact path="/" component={Home} />
          <Route path='/profile' component={Profile} />
          <Route path="/profileform" component={ProfileForm} />
          <Route path='/locationform' component={LocationForm} />
        </div>
      </Router>
    );
  }
}

export default connect(null, actions)(App);
