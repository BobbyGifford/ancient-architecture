import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
    render() {
        console.log("Auth:", this.props.auth)
        console.log("Profile:", this.props.profile);
        return (
            (!this.props.auth ?
                <div className="text-center">
                    <h1>You're not logged in.</h1>
                </div>
                :
                <div className="text-center" >
                    <h1>Welcome</h1>
                    <h3>{this.props.auth.displayName}</h3>
                </div>
            )
        )
    }
}

function mapStateToProps({ auth, profile }) {
    return { auth, profile };
}

export default connect(mapStateToProps)(Home);