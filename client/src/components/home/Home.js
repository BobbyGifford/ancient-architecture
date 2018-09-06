import React, { Component } from 'react';
import { connect } from 'react-redux';
import mainImage from '../../images/cambodia1.jpg';
import { Link } from 'react-router-dom';

import './Home.css';

class Home extends Component {
  render() {
    const style = {
      styleContainer: {
        height: '80vh',
        width: '100%',
        backgroundImage: `url(${mainImage})`,
        backgroundPositionY: '-20vh',
      },
      styleBody: {
        padding: '7vh 0 15vh 0',
        width: '100%',
      },
      styleContent: {
        backgroundColor: 'rgb(239, 232, 198, .9',
        height: '100%',
        width: '100%',
        color: 'black',
        paddingTop: '2vh',
        paddingBottom: '2vh',
      },
    };
    console.log('Auth:', this.props.auth);
    console.log('Profile:', this.props.profile);
    return !this.props.auth ? (
      <div style={style.styleContainer}>
        <div style={style.styleBody}>
          <div style={style.styleContent}>
            <div className="text-center">
              <h1>Welcome to Ancient Architure</h1>
              <blockquote className="blockquote text-center">
                <p className="mb-0">
                  "I believe we are a species with amnesia. I think we have
                  forgotten our roots and our origins. I think we are quite lost
                  in many ways."
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
    ) : (
      <div>
        <div style={style.styleContainer}>
          <div style={style.styleBody}>
            <div style={style.styleContent}>
              <div className="text-center">
                <h1>Welcome</h1>
                <h3>{this.props.auth.displayName}</h3>
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
        <div className="container">
          <h1>Header</h1>
          <hr />
          <div className="subtitle">subtitle</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth, profile }) {
  return { auth, profile };
}

export default connect(mapStateToProps)(Home);
