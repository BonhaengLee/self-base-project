import React from 'react';
import PropTypes from 'prop-types';
import Profile from '../components/Profile';

CreateCourseNote.propTypes = {};

function CreateCourseNote(props) {
  return (
    <div>
      <Profile title={props.title} />
    </div>
  );
}

export default CreateCourseNote;
