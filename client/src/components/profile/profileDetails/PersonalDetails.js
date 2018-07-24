import React from 'react';

const PersonalDetails = ({ from, current, description }) => {
  return (
    <div>
      From: {from}
      <br />
      Currently in: {current}
      <br />
      About: {description}
    </div>
  );
};

export default PersonalDetails;
