import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import history from '../../history';
import { Link } from 'react-router-dom';

import PixabayGallery from './pixabayGallery/PixabayGallery';
import PostedBy from './postedBy';
import Comment from './comments/Comment';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  async componentDidMount() {
    console.log('Auth:', this.props.auth);
    const res = await axios.get('/api/posts/' + this.props.match.params.id);
    console.log(res.data);
    this.setState({
      post: res.data,
    });
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  async removePost(id) {
    const res = await axios.delete('/api/posts/' + id);
    console.log(res.data);
    history.push('/posts');
  }

  renderContent() {
    if (this.state.post === null || this.state.post === undefined) {
      return <h1 className="text-center">Loading</h1>;
    } else {
      return (
        <div>
          <div className="text-center">
            <h3> {this.state.post.title} </h3>
            <h5> {this.state.post.location} </h5>
          </div>
          <br />
          <h4 className="text-center">Cool Features</h4>
          <ul
            className="list-group col-5"
            style={{ marginLeft: '20rem', marginBottom: '2rem' }}
          >
            {this.state.post.keyfeatures.map(feature => {
              return (
                <li
                  className="list-group-item list-group-item-dark"
                  key={feature}
                >
                  {feature}
                </li>
              );
            })}
          </ul>
          <p> {this.state.post.description} </p>
          <PostedBy
            id={this.state.post.user._id}
            displayName={this.state.post.user.displayName}
            googleImg={this.state.post.user.googleImg}
          />
          {this.props.auth._id === this.state.post.user._id ? (
            <div className="text-center mb-2">
              <button
                onClick={() => this.removePost(this.state.post._id)}
                className="btn btn-danger"
              >
                Delete Post
              </button>
            </div>
          ) : null}
          <PixabayGallery title={this.state.post.title} />
          <div className="text-center">
            <PostedBy
              id={this.state.post.user._id}
              displayName={this.state.post.user.displayName}
              googleImg={this.state.post.user.googleImg}
            />
            <br />
            {this.props.auth._id === this.state.post.user._id ? (
              <div>
                <button
                  onClick={() => this.removePost(this.state.post._id)}
                  className="btn btn-danger"
                >
                  Delete Post
                </button>
              </div>
            ) : null}
            <br />
            {this.props.profile ? (
              <Link
                to={'/addcomment/' + this.props.match.params.id}
                className="btn btn-info"
              >
                Add Comment
              </Link>
            ) : null}
            <br />
            <br />
            {this.state.post.comments.map(comment => {
              return (
                <div key={comment.text}>
                  <Comment
                    text={comment.text}
                    author={comment.user.displayName}
                    imgsrc={comment.user.googleImg}
                    userid={comment.user._id}
                    currentuser={this.props.auth._id}
                    postid={this.state.post._id}
                    commentid={comment._id}
                  />
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }

  render() {
    return <div className="container"> {this.renderContent()} </div>;
  }
}

function mapStateToProps({ auth, profile }) {
  return {
    auth,
    profile,
  };
}

export default connect(
  mapStateToProps,
  actions
)(Post);
