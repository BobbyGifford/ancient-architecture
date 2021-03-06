import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '../../images/ancientlogo3.png';
// Added logout
class Header extends Component {
  renderContent() {
    if (
      this.props.auth === null ||
      this.props.auth === undefined ||
      this.props.auth === false
    ) {
      return (
        <a className="btn btn-success" href="/api/auth/google/">
          Login
        </a>
      );
    } else {
      return (
        <ul className="navbar-nav mr-auto">
          {this.props.profile ? (
            <li className="nav-item">
              <Link className="nav-link" to={'/yourposts'}>
                Your Locations
              </Link>
            </li>
          ) : null}

          <li className="nav-item">
            <Link className="nav-link" to="/posts">
              Locations
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/profile">
              Your Profile
            </Link>
          </li>
        </ul>
      );
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link to="/" className="navbar-brand">
            <img style={{ maxHeight: '3rem' }} src={logo} alt="logo" />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            {this.renderContent()}
            {this.props.auth ? (
              <a href="/api/logout" className="btn btn-success">
                Logout
              </a>
            ) : null}
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps({ auth, profile }) {
  return { auth, profile };
}

export default connect(mapStateToProps)(Header);
