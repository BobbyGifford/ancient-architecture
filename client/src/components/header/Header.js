import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

class Header extends Component {
    renderContent() {
        if (this.props.auth === null || this.props.auth === undefined) {
            return <li className="mr 2" ><a href="/auth/google">Login</a></li>
        } else {
            return <li className="mr 2">{this.props.auth.displayName}</li>
        }
    }

    render() {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper #263238 blue-grey darken-4">
                        <a href="#" className="brand-logo center">Ancient Architecture</a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down" style={{ margin: " 0 10px" }} >
                            {this.renderContent()}
                        </ul>
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