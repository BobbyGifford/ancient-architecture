import React, { Component } from "react";
import history from "../../history";
import axios from "axios";
import * as actions from "../../actions";
import { connect } from "react-redux";

class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    axios.post("/api/posts/comment/" + this.props.match.params.id, this.state);
    this.props.fetchPosts();
    history.push("/confirmation");
  }

  render() {
    return (
      <div className="container text-center">
        <h3>Add your comment</h3>
        <form onSubmit={this.handleSubmit}>
          <textarea
            className="form-control"
            name="text"
            onChange={this.handleInputChange}
          />
          <br />
          <input className="btn btn-success" type="submit" />
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(AddComment);
