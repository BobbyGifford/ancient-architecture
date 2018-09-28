import React, { Component } from 'react';
import axios from 'axios';

import BasicInputs from './basicInputs';
import { connect } from 'react-redux';
import history from '../../../../history';
import * as actions from '../../../../actions';

class Profile extends Component {
  constructor(props) {
    super(props);
    if (
      this.props.profile.social === undefined ||
      this.props.profile.social === null
    ) {
      let initialState = this.props.profile;
      initialState.social = {
        youtube: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        instagram: '',
      };
      this.state = initialState;
    } else {
      this.state = this.props.profile;
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSocialInputChange = this.handleSocialInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
  }

  handleSocialInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    let social = this.state.social;

    social[name] = value;
    this.setState({ social });
  }

  async handleSubmit(event) {
    event.preventDefault();

    await axios.post('/api/profile/', this.state);
    this.props.fetchProfile();
    history.push('/profile');
  }

  render() {
    return (
      <div className="container">
        <h3>This is the edit form</h3>
        <form onSubmit={this.handleSubmit}>
          <BasicInputs
            label="Where are you from?"
            name="fromWhere"
            type="text"
            defaultValue={this.state.fromWhere}
            onChange={this.handleInputChange}
          />
          <BasicInputs
            label="Where are you currently?"
            name="livingWhere"
            type="text"
            defaultValue={this.state.livingWhere}
            onChange={this.handleInputChange}
          />
          <BasicInputs
            label="Describe a bit about yourself"
            name="description"
            type="text"
            defaultValue={this.state.description}
            onChange={this.handleInputChange}
          />
          <div className="col-sm-6 offset-sm-3">
            <BasicInputs
              label="Youtube"
              name="youtube"
              type="url"
              defaultValue={
                this.state.social ? this.state.social.youtube : null
              }
              onChange={this.handleSocialInputChange}
            />
            <BasicInputs
              label="Twitter"
              name="twitter"
              type="url"
              defaultValue={
                this.state.social ? this.state.social.twitter : null
              }
              onChange={this.handleSocialInputChange}
            />
            <BasicInputs
              label="Facebook"
              name="facebook"
              type="url"
              defaultValue={
                this.state.social ? this.state.social.facebook : null
              }
              onChange={this.handleSocialInputChange}
            />
            <BasicInputs
              label="Linkedin"
              name="linkedin"
              type="url"
              defaultValue={
                this.state.social ? this.state.social.linkedin : null
              }
              onChange={this.handleSocialInputChange}
            />
            <BasicInputs
              label="Instagram"
              name="instagram"
              type="url"
              defaultValue={
                this.state.social ? this.state.social.instagram : null
              }
              onChange={this.handleSocialInputChange}
            />
          </div>
          <input
            type="submit"
            className="col-sm-6 offset-sm-3 btn btn-success"
          />
        </form>
      </div>
    );
  }
}

function mapStateToProps({ profile }) {
  return { profile };
}

export default connect(
  mapStateToProps,
  actions
)(Profile);
