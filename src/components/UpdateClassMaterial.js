import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TutorialDataService from '../services/classmaterial';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';

Material.propTypes = {};

export default function Material(props) {
  const [currentClassMaterial, setCurrentClassMaterial] = useState({
    key: null,
    title: '',
    description: '',
  });
  //   const [currentTutorial, setCurrentTutorial] = useState(props.tutorial);
  const [message, setMessage] = useState('');

  // ComponentDidMount
  useEffect(() => {
    setCurrentClassMaterial(props.tutorial);
    console.log(props.tutorial);
  }, [props.tutorial.title, props.tutorial.description]);

  const onChangeTitle = (e) => {
    const title = e.target.value;
    setCurrentClassMaterial(function (prevState) {
      return {
        ...prevState,
        title: title,
      };
    });
  };

  const onChangeDescription = (e) => {
    const description = e.target.value;
    setCurrentClassMaterial((prevState) => ({
      ...prevState,
      description: description,
    }));
  };

  const updatePublished = (status) => {
    console.log('status 변경중p');
    console.log(status);
    setCurrentClassMaterial({ ...currentClassMaterial, published: status });
    const data = currentClassMaterial;
    console.log('tut 변경중p');
    console.log(currentClassMaterial.published);
    TutorialDataService.update(currentClassMaterial.key, { published: status });
  };

  const updateTutorial = () => {
    const data = currentClassMaterial;
    console.log('currentTutkey');
    console.log(currentClassMaterial.key);
    TutorialDataService.update(currentClassMaterial.key, data);
    props.refreshList();
  };

  const deleteTutorial = () => {
    // if (TutorialDataService.delete(currentTutorial.key)) {
    TutorialDataService.delete(currentClassMaterial.key);
    props.refreshList();
    // }
  };

  console.log('tut 변경중');
  console.log(currentClassMaterial);

  return (
    <div>
      {currentClassMaterial ? (
        <div className="edit-form mt-4">
          <h5>글 수정하기</h5>
          <form>
            <div className="form-group">
              <Form.Group controlId="formGridTitle">
                <Form.Control
                  as="textarea"
                  placeholder="제목"
                  aria-label="With textarea"
                  aria-describedby="basic-addon1"
                  className="form-control"
                  id="title"
                  required
                  value={currentClassMaterial.title}
                  onChange={onChangeTitle}
                  name="title"
                />
              </Form.Group>
            </div>
            <div className="form-group">
              <Form.Group
                controlId="formGridContents"
                style={{ marginBottom: '15px' }}
              >
                <Form.Control
                  as="textarea"
                  rows="15"
                  placeholder="내용 없음"
                  aria-label="With textarea"
                  aria-describedby="inputGroup-sizing-lg"
                  className="form-control"
                  id="description"
                  required
                  value={currentClassMaterial.description}
                  onChange={onChangeDescription}
                  name="description"
                />
              </Form.Group>
            </div>
          </form>
          <button className="badge badge-danger mr-2" onClick={deleteTutorial}>
            삭제
          </button>
          <button
            type="submit"
            className="badge badge-success"
            onClick={updateTutorial}
          >
            수정
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Course...</p>
        </div>
      )}
    </div>
  );
}
