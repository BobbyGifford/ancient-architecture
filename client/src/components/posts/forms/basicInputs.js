import React from 'react';

const basicInputs = props => {
  if (props.area === true) {
    return (
      <div className="form-group">
        <label htmlFor={props.name}>{props.label}</label>
        <textarea
          className="form-control"
          id={props.name}
          name={props.name}
          type={props.type}
          required
          onChange={props.onChange}
        />
      </div>
    );
  } else {
    return (
      <div className="form-group">
        <label htmlFor={props.name}>{props.label}</label>
        <input
          className="form-control"
          id={props.name}
          name={props.name}
          type={props.type}
          required
          onChange={props.onChange}
        />
      </div>
    );
  }
};

export default basicInputs;
