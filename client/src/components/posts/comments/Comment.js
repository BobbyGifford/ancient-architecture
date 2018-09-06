import React from 'react';
import { Link } from 'react-router-dom';
import * as actions from '../../../actions/index';
import history from '../../../history';

import './Comment.css';

const handleDelete = (postid, commentid) => {
  console.log('Current post', postid);
  console.log('Current comment', commentid);
  actions.deleteComment(postid, commentid);
  history.push('/posts');
};

const Comment = props => {
  return (
    <div style={{ maxWidth: '30rem', marginLeft: '20rem' }}>
      <div className="card bg-light text-center">
        <div className="card-body">
          <p className="card-text">
            {props.text}
            {props.userid === props.currentuser ? (
              <i
                onClick={() => handleDelete(props.postid, props.commentid)}
                className="material-icons comment_icon"
              >
                delete
              </i>
            ) : null}
          </p>
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
