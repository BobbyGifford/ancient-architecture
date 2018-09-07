import React, { Component } from 'react';
import axios from 'axios';

import './PixabayGallery.css';
import api from '../../../api/apiKey';

class PixabayGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSingleImg: true,
    };

    this.handleToggle = this.handleToggle.bind(this);
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
    return (
      <div>
        {this.state.formattedData.map(pic => {
          return (
            <img
              style={{ maxHeight: '20rem' }}
              key={pic.largeImageURL}
              src={pic.largeImageURL}
              alt={pic.largeImageURL}
            />
          );
        })}
        <div>
          <button className="btn btn-show btn-info" onClick={this.handleToggle}>
            Toggle gallery
          </button>
        </div>
      </div>
    );
  }

  renderSingleCard() {
    if (this.state.formattedData[0] !== undefined) {
      return (
        <div>
          <img
            className="single_feature"
            src={this.state.formattedData[0].largeImageURL}
            alt="pic"
          />
          <button className="btn btn-show btn-info" onClick={this.handleToggle}>
            Toggle gallery
          </button>
        </div>
      );
    } else {
      return (
        <div className="col offset-6">
          <h1>Pixabay Returned 0 results</h1>
        </div>
      );
    }
  }

  handleToggle() {
    console.log('toggle');
    this.setState({ showSingleImg: !this.state.showSingleImg });
  }

  render() {
    return (
      <div className="row">
        {this.state.formattedData !== undefined ? (
          <div className="text-center">
            {this.state.showSingleImg ? (
              <div className="text-center">{this.renderSingleCard()}</div>
            ) : (
              <div className="text-center">{this.renderCards()}</div>
            )}
            <div />
          </div>
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    );
  }
}

export default PixabayGallery;
