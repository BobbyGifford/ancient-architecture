import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ToProfileForm from './helperButtons/ToProfileForm';
import PersonalDetails from './profileDetails/PersonalDetails';
import LocationList from './profileDetails/LocationList';

class Profile extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  renderContent() {
    if (this.props.profile === null || this.props.profile === undefined) {
      return (
        <div className="text-center">
          <Link className="text-center btn btn-info" to="/profileform">
            Create Profile
          </Link>
        </div>
      );
    } else {
      return (
        <div className="col-sm-6 offset-sm-4">
          <div className="media">
            <img
              className="mr-3"
              src={this.props.profile.user.googleImg}
              alt="Pic didn't load"
            />
            <div className="media-body">
              <h5 className="mt-0">{this.props.profile.user.displayName}</h5>
              <ToProfileForm />
            </div>
          </div>
          <PersonalDetails
            from={this.props.profile.fromWhere}
            current={this.props.profile.livingWhere}
            description={this.props.profile.description}
          />

          <div className="mt-5">
            <h5>Locations of interest</h5>
            <LocationList
              locationList={this.props.profile.locationsOfInterest}
            />
            <Link to="/locationform">Add a location of interest</Link>
          </div>
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

function mapStateToProps({ profile }) {
  return { profile };
}

export default connect(
  mapStateToProps,
  actions
)(Profile);
