import React, { Component } from 'react';
import axios from 'axios';
import history from '../../../history';
import * as actions from '../../../actions'
import { connect } from 'react-redux';


class LocationList extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    async handleDelete(id) {
        const result = await axios.delete("/api/profile/locationofinterest/" + id)
        this.props.fetchProfile()
        history.push("/")
    }

    renderContent() {
        if (this.props.locationList === null || this.props.locationList === undefined || this.props.locationList.length === 0) {
            return null
        } else {
            return (
                this.props.locationList.map((location) => {
                    return (
                        <div className="mt-3" key={location.name}>
                            {location.name}
                            <br />
                            {location.location}
                            <br />
                            {location.description}
                            <br />
                            {/* Implement delete function */}
                            <button className="btn btn-danger" onClick={() => this.handleDelete(location._id)}>Delete</button>
                        </div>
                    )
                })
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
}

export default connect(null, actions)(LocationList);