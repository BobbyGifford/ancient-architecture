import React, { Component } from 'react';
import axios from 'axios';

import BasicInputs from './basicInputs';
import { connect } from 'react-redux';
import history from '../../../../history';
import * as actions from '../../../../actions';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromWhere: '',
      livingWhere: '',
      description: '',
      social: {
        youtube: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        instagram: '',
      },
    };
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

    const result = await axios.post('/api/profile/', this.state);
    this.props.fetchProfile();
    history.push('/profile');
    console.log(result.data);
  }

  render() {
    return (
      <div className="container">
        <h3>Please Create your profile</h3>
        <form onSubmit={this.handleSubmit}>
          <BasicInputs
            label="Where are you from?"
            name="fromWhere"
            type="text"
            onChange={this.handleInputChange}
          />
          <BasicInputs
            label="Where are you currently?"
            name="livingWhere"
            type="text"
            onChange={this.handleInputChange}
          />
          <BasicInputs
            label="Describe a bit about yourself"
            name="description"
            type="text"
            onChange={this.handleInputChange}
          />
          <div className="col-sm-6 offset-sm-3">
            <BasicInputs
              label="Youtube"
              name="youtube"
              type="url"
              onChange={this.handleSocialInputChange}
            />
            <BasicInputs
              label="Twitter"
              name="twitter"
              type="url"
              onChange={this.handleSocialInputChange}
            />
            <BasicInputs
              label="Facebook"
              name="facebook"
              type="url"
              onChange={this.handleSocialInputChange}
            />
            <BasicInputs
              label="Linkedin"
              name="linkedin"
              type="url"
              onChange={this.handleSocialInputChange}
            />
            <BasicInputs
              label="Instagram"
              name="instagram"
              type="url"
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

export default connect(
  null,
  actions
)(Profile);
