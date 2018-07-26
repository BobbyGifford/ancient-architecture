import React, { Component } from 'react';
import axios from 'axios';

class OthersProfile extends Component {
  async componentDidMount() {
    const res = await axios.get(
      '/api/profile/user/' + this.props.match.params.id
    );
    console.log(res.data);
    this.setState({ otherProfile: res.data });
  }

  renderContent() {
    if (this.state === null || this.state === undefined) {
      return <h1>Loading</h1>;
    } else {
      return (
        <div className="text-center">
          <h1>{this.state.otherProfile.user.displayName}</h1>
          <p>From: {this.state.otherProfile.fromWhere}</p>
          <p>Currently in: {this.state.otherProfile.livingWhere}</p>

          <h4>
            Locations {this.state.otherProfile.user.displayName} is interested
            in:
          </h4>
          {this.state.otherProfile.locationsOfInterest.map(location => {
            return (
              <div key={location._id}>
                <div
                  className="card bg-dark text-white text-center"
                  style={{ width: '18rem' }}
                >
                  <div className="card-body">
                    <h5 className="card-title">Name: {location.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      Location: {location.location}
                    </h6>
                    <a>Description: {location.description}</a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default OthersProfile;
