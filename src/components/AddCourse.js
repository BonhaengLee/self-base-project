import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TutorialDataService from '../services/tutorial';

AddCourse.propTypes = {};

export default function AddCourse(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [published, setPublished] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const saveTutorial = () => {
    TutorialDataService.create({
      title: title,
      description: description,
      published: false,
      key: 0,
    });
  };

  const newTutorial = () => {
    setTitle('');
    setDescription('');
    setPublished(false);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>글 작성이 완료되었습니다!</h4>
          <button className="btn btn-success" onClick={newTutorial}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">제목</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={title}
              onChange={onChangeTitle}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">내용</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={description}
              onChange={onChangeDescription}
              name="description"
            />
          </div>

          <button onClick={saveTutorial} className="btn btn-success">
            작성하기
          </button>
        </div>
      )}
    </div>
  );
}
