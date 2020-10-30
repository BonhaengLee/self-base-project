import React from 'react';
import PropTypes from 'prop-types';
import Profile from '../components/Profile';

UpdateProfile.propTypes = {};

function UpdateProfile(props) {
  return (
    <div>
      <Profile title={props.title} />
    </div>
  );
}

export default UpdateProfile;
