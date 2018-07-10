import React, { Component } from 'react';


class Header extends Component {
    renderContent() {
        return (
            <div>

            </div>
        )
    }

    render() {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper #263238 blue-grey darken-4">
                        <a href="#" className="brand-logo center">Ancient Architecture</a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down" style={{ margin: " 0 10px" }} >
                            <li className="mr 2" ><a href="/auth/google">Login</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}


export default Header;