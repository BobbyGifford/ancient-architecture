import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import Header from './components/header/Header';
import Home from './components/home/Home';

class App extends Component {
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

export default App;
