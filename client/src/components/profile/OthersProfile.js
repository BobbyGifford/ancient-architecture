import React, { Component } from 'react';
import axios from 'axios';

class OthersProfile extends Component {
  async componentDidMount() {
    const profileRes = await axios.get(
      '/api/profile/user/' + this.props.match.params.id
    );
    const postsRes = await axios.get(
      '/api/posts/byuser/' + this.props.match.params.id
    );
    console.log(postsRes.data);
    console.log(profileRes.data);
    this.setState({ otherProfile: profileRes.data });
    this.setState({ otherPosts: postsRes.data });
  }
  rednerPosts() {
    if (
      this.state === null ||
      this.state.otherPosts === null ||
      this.state.otherPosts === undefined
    ) {
      return <h1>Loading</h1>;
    } else {
      return this.state.otherPosts.map(post => {
        return (
          <div key={post._id} className="col-4 offset-md-4">
            <div className="card bg-dark text-white">
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {post.location}
                </h6>
                {post.description}
              </div>
            </div>
          </div>
        );
      });
    }
  }

  renderContent() {
    if (this.state === null || this.state === undefined) {
      return <h1>Loading</h1>;
    } else {
      return (
        <div className="container text-center">
          <h1>{this.state.otherProfile.user.displayName}</h1>
          <p>From: {this.state.otherProfile.fromWhere}</p>
          <p>Currently in: {this.state.otherProfile.livingWhere}</p>

          <h4>
            Locations {this.state.otherProfile.user.displayName} is interested
            in:
          </h4>
          <div className="row">
            {this.state.otherProfile.locationsOfInterest.map(location => {
              return (
                <div key={location._id} className="col-3">
                  <div
                    className="card bg-dark text-white"
                    // style={{ width: '18rem' }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">{location.name}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {location.location}
                      </h6>
                      {location.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <br />
          <h4>Posts by: {this.state.otherProfile.user.displayName}</h4>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderContent()}
        {this.rednerPosts()}
      </div>
    );
  }
}

export default OthersProfile;
