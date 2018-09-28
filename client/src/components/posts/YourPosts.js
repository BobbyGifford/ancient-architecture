import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class YourPosts extends Component {
  renderPosts() {
    if (this.props.posts && this.props.auth) {
      return this.props.posts.map(post => {
        if (post.user._id === this.props.auth._id) {
          return (
            <div
              style={{ maxWidth: '25vw', marginLeft: '15vw' }}
              className="card"
              key={post._id}
            >
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.description}</p>
                <Link className="btn btn-success" to={'/post/' + post._id}>
                  View
                </Link>
              </div>
            </div>
          );
        }
      });
    } else {
      return <h1>Loading</h1>;
    }
  }

  render() {
    return (
      <div>
        <div className="container text-center">
          <p className="subtitle">This is a list of your posts</p>
          {this.renderPosts()}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ posts, auth }) {
  return { posts, auth };
}

export default connect(
  mapStateToProps,
  null
)(YourPosts);
