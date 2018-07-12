import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';

import ToProfileForm from "./helperButtons/ToProfileForm";

class Profile extends Component {

    componentDidMount() {
        this.props.fetchUser();
    }

    renderContent() {
        if (this.props.profile === null || this.props.profile === undefined) {
            return <h1>Loading</h1>
        } else {
            return (
                <div className="col-sm-6 offset-sm-3">
                    <div className="media">
                        <img className="mr-3" src={this.props.profile.user.googleImg} />
                        <div className="media-body">
                            <h5 className="mt-0">{this.props.profile.user.displayName}</h5>
                            <ToProfileForm />
                        </div>
                    </div>
                    <div>
                        From: {this.props.profile.fromWhere}
                        <br />
                        Currently in: {this.props.profile.livingWhere}
                        <br />
                        About: {this.props.profile.description}
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
}

function mapStateToProps({ profile }) {
    return { profile }
}

export default connect(mapStateToProps, actions)(Profile);