import React, { Component } from 'react';
import axios from 'axios';
import api from '../../../api/apiKey';

class PixabayGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  async componentDidMount() {
    const res = await axios.get(
      'https://pixabay.com/api/?key=' +
        api.key +
        '&q=' +
        this.props.title +
        '&image_type=photo'
    );
    const formattedData = res.data.hits.slice(1, 16);
    // console.log(res.data.hits[0].previewURL)
    // console.log(formattedData)
    this.setState({ formattedData });
  }

  renderCards() {
    return this.state.formattedData.map(pic => {
      return (
        <img
          style={{ maxHeight: '20rem' }}
          key={pic.largeImageURL}
          src={pic.largeImageURL}
          alt={pic.largeImageURL}
        />
      );
    });
  }

  render() {
    return (
      <div className="row">
        {this.state.formattedData ? this.renderCards() : <h1>Loading</h1>}
      </div>
    );
  }
}

export default PixabayGallery;
