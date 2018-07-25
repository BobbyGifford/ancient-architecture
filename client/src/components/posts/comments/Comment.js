import React from 'react';

const Comment = props => {
  return (
    <div style={{ maxWidth: '30rem', marginLeft: '20rem' }}>
      <div className="card bg-dark text-white text-center">
        <div className="card-body">
          <p className="card-text">{props.text}</p>
          <div className="card-footer">
            By: {props.author}
            <br />
            <img className="rounded-circle" alt="profile" src={props.imgsrc} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
