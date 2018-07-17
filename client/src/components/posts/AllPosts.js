import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from "react-router-dom";
import axios from 'axios';

import api from '../../api/apiKey'

class Posts extends Component {

    componentDidMount() {
        this.props.fetchPosts()
        this.fetchPreviews()
    }

    componentDidUpdate() {
        console.log(this.props.posts);
        console.log(this.state)
    }

    fetchPreviews() {
        if (this.props.posts === null || this.props.posts === undefined) {
            return null
        } else {
            this.props.posts.map((post) => {
                axios.get("https://pixabay.com/api/?key=" + api.key + "&q=" + post.title + "&image_type=photo").then((res) => {
                    this.setState({ [post.title]: res.data.hits[0].previewURL })
                })
            })

        }
    }

    renderPosts() {
        if (this.props.posts === null || this.props.posts === undefined) {
            return <h1>Loading</h1>
        } else {
            return (
                this.props.posts.map((post => {
                    return (
                        <div key={post._id}>
                            <div className="card bg-dark text-white text-center">
                                <h5 className="card-header">{post.title}</h5>
                                <div className="card-body">
                                    <h5 className="card-title">{post.location}</h5>
                                    <p className="card-text">{post.description}</p>
                                    {this.state ? <img className="mb-3" src={this.state[post.title]} /> : null}
                                    <br />
                                    <Link to={"/post/" + post._id} className="btn btn-primary">View Post</Link>
                                </div>
                                <div className="card-footer text-muted">
                                    Posted by: {post.user.displayName} <img className="rounded-circle" alt="a" src={post.user.googleImg} />
                                </div>
                            </div>
                            <br />
                        </div>
                    )
                }))
            )
        }
    }

    render() {
        this.fetchPreviews()
        return (
            <div className="container text-center">
                <h1>Posts</h1>
                <Link to="/addpost" className="btn btn-success my-2">
                    Add Post
                </Link>
                {this.renderPosts()}
            </div>
        )
    }
}

function mapStateToProps({ posts }) {
    return { posts }
}

export default connect(mapStateToProps, actions)(Posts);