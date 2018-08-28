import React from 'react';
import { Link } from 'react-router-dom';

const postedBy = props => {
  return (
    <div>
      <p className="text-center">
        <Link to={'/profileother/' + props.id}>
          Posted by: {props.displayName}
        </Link>
        <img
          className="rounded-circle"
          style={{ marginLeft: '.75rem' }}
          alt="a"
          src={props.googleImg}
        />
      </p>
    </div>
  );
};

export default postedBy;
