import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router-dom';

import PostedBy from './postedBy';

class Posts extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  componentDidUpdate() {
    console.log(this.props.posts);
    console.log(this.state);
  }

  renderPosts() {
    if (this.props.posts === null || this.props.posts === undefined) {
      return <h1 className="text-center">Loading</h1>;
    } else {
      return this.props.posts.map(post => {
        return (
          <div key={post._id}>
            <div className="card bg-light text-center">
              <h5 className="card-header">{post.title}</h5>
              <div className="card-body">
                <h5 className="card-title">{post.location}</h5>
                <p className="card-text">{post.description}</p>
                <br />
                <Link to={'/post/' + post._id} className="btn btn-primary">
                  View Post
                </Link>
              </div>
              <div className="card-footer text-muted">
                <PostedBy
                  id={post.user._id}
                  displayName={post.user.displayName}
                  googleImg={post.user.googleImg}
                />
              </div>
            </div>
            <br />
          </div>
        );
      });
    }
  }

  render() {
    return (
      <div className="container text-center">
        <div className="text-center subtitle">
          Locations other users are interested in
        </div>
        {this.props.profile ? (
          <Link to="/addpost" className="btn btn-success my-2">
            Add Post
          </Link>
        ) : null}
        {this.renderPosts()}
      </div>
    );
  }
}

function mapStateToProps({ posts, profile }) {
  return { posts, profile };
}

export default connect(
  mapStateToProps,
  actions
)(Posts);
