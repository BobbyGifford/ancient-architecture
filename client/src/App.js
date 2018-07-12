import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import * as actions from './actions';
import { connect } from 'react-redux';

// Components
import Header from './components/header/Header';
import Home from './components/home/Home';
import Profile from './components/profile/Profile'

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchProfile();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/profile" component={Profile} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
