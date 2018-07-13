import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

class Header extends Component {
    renderContent() {
        if (this.props.auth === null || this.props.auth === undefined) {
            return <li className="nav-item" ><a className="nav-link" href="/auth/google">Login</a></li>
        } else {
            return (
                <ul className="navbar-nav">
                    <li className="nav-item"><Link className="nav-link" to="/profile">{this.props.auth.displayName}</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/posts">Posts</Link></li>
                </ul>
            )
        }
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link to="/" className="navbar-brand" href="#">Ancient Architecture</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        {this.renderContent()}
                    </div>
                </nav>
            </div>
        )
    }
}

function mapStateToProps({ auth }) {
    return { auth }
}


export default connect(mapStateToProps)(Header);