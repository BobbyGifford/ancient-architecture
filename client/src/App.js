import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import * as actions from './actions';
import Header from './components/header/Header';
import Home from './components/home/Home';
import { connect } from 'react-redux';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Home} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
