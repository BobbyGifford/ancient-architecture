import React, { Component } from 'react';
import BasicInputs from './basicInputs';
import axios from 'axios';
import * as actions from "../../../actions"
import { connect } from 'react-redux';
import history from '../../../history';

class AddPost extends Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.fetchPosts()
    }

    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name]: value });
    }

    async handleSubmit(event) {
        event.preventDefault()
        console.log(this.state)

        const res = await axios.post("/api/posts/", this.state)
        console.log(res.data)
        history.push("/posts")
    }


    render() {
        return (
            <div className="container">
                <h3>Add A New Location</h3>
                <form onSubmit={this.handleSubmit} >
                    <BasicInputs area={false} label="What is this place called?" name="title" id="title" type="text" onChange={this.handleInputChange} />
                    <BasicInputs area={false} label="Location" name="location" id="location" type="text" onChange={this.handleInputChange} />
                    <BasicInputs area={true} label="Key Features (seperated with , )" name="keyfeatures" id="keyfeatures" type="text" onChange={this.handleInputChange} />
                    <BasicInputs area={true} label="Give a quick description of this place" name="description" id="description" type="text" onChange={this.handleInputChange} />
                    <input className="btn btn-success" type="submit" />
                </form>
            </div>
        )
    }
}

function mapStateToProps({ posts }) {
    return { posts }
}

export default connect(mapStateToProps, actions)(AddPost);