import React from 'react';
import { Link } from 'react-router-dom';

const Comment = props => {
  return (
    <div style={{ maxWidth: '30rem', marginLeft: '20rem' }}>
      <div className="card bg-dark text-white text-center">
        <div className="card-body">
          <p className="card-text">{props.text}</p>
          <div className="card-footer">
            <Link to={'/profileother/' + props.userid}>By: {props.author}</Link>
            <br />
            <img className="rounded-circle" alt="profile" src={props.imgsrc} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
