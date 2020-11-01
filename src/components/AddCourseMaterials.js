import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ClassMaterialDataService from '../services/classmaterial';
import { Alert, Form, FormControl, InputGroup } from 'react-bootstrap';

AddCourseMaterials.propTypes = {};

export default function AddCourseMaterials(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fileUpload, setFileUpload] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeFileUpload = (e) => {
    setFileUpload(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const saveClassMaterials = () => {
    if (
      ClassMaterialDataService.create({
        title: title,
        description: description,
        key: 0,
      })
    ) {
      setSubmitted(true);
    }
  };

  const newClassMaterials = () => {
    setTitle('');
    setDescription('');
    setSubmitted(false);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setSubmitted('');
      await ClassMaterialDataService.create({
        title: title,
        description: description,
        published: false,
        key: 0,
      });
      setSubmitted('글 작성이 완료되었습니다!');
    } catch {}
  }

  return (
    <div
      className="submit-form"
      style={{ maxWidth: '5500px', minHeight: '300px' }}
    >
      {submitted ? (
        <div>
          <h4>글 작성이 완료되었습니다!</h4>
          <button className="btn btn-success mt-1" onClick={newClassMaterials}>
            글 작성하기
          </button>
        </div>
      ) : (
        <div>
          <Form.Group controlId="formGridTitle">
            <Form.Control
              as="textarea"
              placeholder="제목"
              aria-label="With textarea"
              aria-describedby="basic-addon1"
              className="form-control"
              id="title"
              required
              value={title}
              onChange={onChangeTitle}
              name="title"
            />
          </Form.Group>
          <Form.Group controlId="formGridFileUpload">
            <Form.File id="formcheck-api-custom" custom>
              <Form.File.Input />
              <Form.File.Label data-browse="파일 선택"></Form.File.Label>
            </Form.File>
          </Form.Group>

          <Form.Group
            controlId="formGridContents"
            style={{ marginBottom: '15px' }}
          >
            <Form.Control
              as="textarea"
              rows="15"
              placeholder="본문을 입력하세요"
              aria-label="With textarea"
              aria-describedby="inputGroup-sizing-lg"
              className="form-control"
              id="description"
              required
              value={description}
              onChange={onChangeDescription}
              name="description"
            />
          </Form.Group>

          <button onClick={handleSubmit} className="btn btn-success">
            작성하기
          </button>
        </div>
      )}
    </div>
  );
}
