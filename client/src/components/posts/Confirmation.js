import React from 'react';
import { Link } from 'react-router-dom';

const Confirmation = props => {
  return (
    <div className="text-center">
      <h1>Your comment was posted</h1>
      <Link className="btn btn-info" to="/posts/">
        Return to posts
      </Link>
      <br />
      <br />
      <Link className="btn btn-info" to={'/post/' + props.match.params.id}>
        Return to previous post
      </Link>
    </div>
  );
};

export default Confirmation;
