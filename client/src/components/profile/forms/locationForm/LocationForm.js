import React, { Component } from 'react';
import * as actions from '../../../../actions';
import { connect } from 'react-redux';
import axios from 'axios';
import history from '../../../../history';

import BasicInputs from './basicInputs';

class LocationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      location: '',
      description: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const result = await axios.post(
      '/api/profile/locationofinterest',
      this.state
    );
    this.props.fetchProfile();
    history.push('/profile');

    console.log(result.data);
  }

  render() {
    return (
      <div className="container">
        <h4 className="mt-3">Add a location that interests you</h4>
        <form onSubmit={this.handleSubmit}>
          <BasicInputs
            id="name"
            label="Name"
            name="name"
            type="text"
            onChange={this.handleInputChange}
          />
          <BasicInputs
            id="location"
            label="Location"
            name="location"
            type="text"
            onChange={this.handleInputChange}
          />
          <BasicInputs
            id="description"
            label="Description"
            name="description"
            type="text"
            onChange={this.handleInputChange}
          />

          <input type="submit" className="btn btn-success" />
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(LocationForm);
