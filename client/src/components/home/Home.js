import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        console.log(this.props.auth)
        return (
            (!this.props.auth ?
                <div className="center">
                    <h1>You're not logged in.</h1>
                </div>
                :
                <div className="center" >
                    <h1>Welcome</h1>
                    <h3>{this.props.auth.displayName}</h3>
                </div>
            )
        )
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Home);