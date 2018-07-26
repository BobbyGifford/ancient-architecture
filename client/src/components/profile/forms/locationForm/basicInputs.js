import React from 'react';

const BasicInputs = ({ id, label, name, type, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        className="form-control"
        id={id}
        name={name}
        type={type}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default BasicInputs;
