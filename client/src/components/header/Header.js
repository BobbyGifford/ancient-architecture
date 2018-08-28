import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
          <li className="nav-item">
            <Link
              className="nav-link"
              to={'/profileother/' + this.props.auth._id}
            >
              Your Locations
            </Link>
          </li>

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
          {this.props.auth ? (
            <Link to="/posts" className="navbar-brand">
              Ancient Architecture
            </Link>
          ) : (
            <Link to="/" className="navbar-brand">
              Ancient Architecture
            </Link>
          )}

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

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
