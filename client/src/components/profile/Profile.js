import React, { Component } from 'react';

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fromWhere: "",
            livingWhere: "",
            description: "",
            social: {
                twitter: "",
                facebook: "",
                linkedin: "",
                instagram: ""
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSocialInputChange = this.handleSocialInputChange.bind(this)
    }

    componentDidUpdate() {
        console.log(this.state);

    }

    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name]: value });
    }

    handleSocialInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        let social = this.state.social;

        social[name] = value
        this.setState({ social })
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <form>
                    <label>
                        Where are you from?
                    </label>
                    <input
                        name="fromWhere"
                        type="text"
                        onChange={this.handleInputChange} />
                    <label>
                        Where are you currently?
                    </label>
                    <input
                        name="livingWhere"
                        type="text"
                        onChange={this.handleInputChange} />
                    <label>
                        Describe a bit about yourself
                    </label>

                    <input
                        name="description"
                        type="text"
                        onChange={this.handleInputChange} />
                    <label>
                        Twitter
                    </label>
                    <input
                        name="twitter"
                        type="url"
                        onChange={this.handleSocialInputChange} />

                </form>
            </div>
        )
    }
}

export default Profile