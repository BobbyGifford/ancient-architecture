import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import AboutArea from './AboutArea';
import './Home.css';

class Home extends Component {
  render() {
    return !this.props.auth ? (
      <div>
        <div className="style-container">
          <div className="style-body">
            <div className="style-content">
              <div className="text-center">
                <h1>Welcome to Ancient Architecture</h1>
                <blockquote className="blockquote text-center">
                  <p className="mb-0">
                    "I believe we are a species with amnesia. I think we have
                    forgotten our roots and our origins. I think we are quite
                    lost in many ways."
                  </p>
                  <footer className="blockquote-footer">Graham Hancock</footer>
                </blockquote>
                <a className="btn btn-success" href="/api/auth/google/">
                  Login with Google
                </a>
              </div>
            </div>
          </div>
        </div>
        <AboutArea />
      </div>
    ) : (
      <div>
        <div className="style-container">
          <div className="style-body">
            <div className="style-content">
              <div className="text-center">
                <h1>Welcome back {this.props.auth.displayName}</h1>
                <br />
                <Link to="/profile" className="btn btn-info">
                  Go To Your Profile
                </Link>
                <br />
                <br />
                <Link to="/posts" className="btn btn-success">
                  Go To Posts
                </Link>
              </div>
            </div>
          </div>
        </div>
        <AboutArea />
      </div>
    );
  }
}

function mapStateToProps({ auth, profile }) {
  return { auth, profile };
}

export default connect(mapStateToProps)(Home);
