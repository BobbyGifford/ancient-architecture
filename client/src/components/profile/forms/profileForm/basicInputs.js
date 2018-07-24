import React from 'react';

const basicInputs = props => {
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        className="form-control"
        id={props.name}
        name={props.name}
        type={props.type}
        onChange={props.onChange}
      />
    </div>
  );
};

export default basicInputs;
