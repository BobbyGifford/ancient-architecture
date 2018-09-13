import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class OthersProfile extends Component {
  constructor() {
    super();

    this.state = {
      otherProfile: null,
      otherPosts: null,
    };
  }

  componentDidMount() {
    axios.get('/api/profile/user/' + this.props.match.params.id).then(res => {
      this.setState({ otherProfile: res.data });
    });

    axios.get('/api/posts/byuser/' + this.props.match.params.id).then(res => {
      this.setState({ otherPosts: res.data });
    });
  }

  rednerPosts() {
    if (this.state.otherPosts === null || this.state.otherPosts === undefined) {
      return <h1 className="text-center">Loading</h1>;
    } else {
      return this.state.otherPosts.map(post => {
        return (
          <div key={post._id} className="col-12">
            <div className="card bg-light">
              <h5 className="card-header text-center">{post.title}</h5>
              <div className="card-body">
                <h6 className="card-subtitle text-center mb-2 text-muted">
                  {post.location}
                </h6>
                {post.description}
                <br />
                <div className="text-center">
                  <Link to={'/post/' + post._id} className="btn btn-success">
                    Go to post
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      });
    }
  }

  renderContent() {
    if (this.state.otherPosts === null || this.state.otherProfile === null) {
      return <h1 className="text-center">Loading</h1>;
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
                <div key={location._id} className="col-12">
                  <div className="card bg-light">
                    <h5 className="card-header">{location.name}</h5>
                    <div className="card-body">
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
