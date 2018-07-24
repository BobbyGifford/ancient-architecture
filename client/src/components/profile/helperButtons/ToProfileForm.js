import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ToProfileForm extends Component {
  render() {
    return (
      <div className="text-center">
        <Link className="btn btn-info" to="/profileform">
          Edit Profile
        </Link>
      </div>
    );
  }
}

export default ToProfileForm;
