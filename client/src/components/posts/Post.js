import React, { Component } from 'react';
import axios from 'axios';

class Post extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    async componentDidMount() {
        const res = await axios.get("/api/posts/" + this.props.match.params.id)
        console.log(res.data);
        this.setState({ post: res.data })
    }

    componentDidUpdate() {
        console.log(this.state)
    }

    renderContent() {
        if (this.state.post === null || this.state.post === undefined) {
            return (
                <h1 className="text-center">Loading</h1>
            )
        } else {
            return (
                <div>
                    <div className="text-center">
                        <h3>{this.state.post.title}</h3>
                        <h5>{this.state.post.location}</h5>
                    </div>
                    <br />
                    <ul className="list-group">
                        {
                            this.state.post.keyfeatures.map((feature) => {
                                return (
                                    <li key={feature} style={{ marginLeft: "28vw" }}>
                                        {feature}
                                    </li>
                                )
                            })
                        }

                    </ul>
                    <p>{this.state.post.description}</p>
                    <div className="text-center">
                        Posted by: {this.state.post.user.displayName} <img className="rounded-circle" alt="a" src={this.state.post.user.googleImg} />
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="container">
                {this.renderContent()}
            </div>
        )
    }
}

export default Post;