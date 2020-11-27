import React, { useEffect, useState } from 'react';
import TutorialDataService from '../services/classmaterial';
import * as dateFns from 'date-fns';
import { useAuth } from 'contexts/AuthContext';

export default function UpdateClassMaterial({ tutorial, refreshList }) {
  const [currentTutorial, setCurrentTutorial] = useState();
  const { currentUser } = useAuth();

  useEffect(() => {
    setCurrentTutorial(tutorial);
  }, [tutorial]);

  const onChangeTitle = (e) => {
    const title = e.target.value;
    setCurrentTutorial(function (prevState) {
      return {
        ...prevState,
        title: title,
      };
    });
  };

  const onChangeDescription = (e) => {
    const description = e.target.value;
    setCurrentTutorial((prevState) => ({
      ...prevState,
      description: description,
    }));
  };

  const updateTutorial = () => {
    const data = currentTutorial;
    console.log('currentTutkey');
    console.log(currentTutorial.key);
    TutorialDataService.update(currentTutorial.key, data);
    refreshList();
  };

  const deleteTutorial = () => {
    TutorialDataService.delete(currentTutorial.key);
    refreshList();
  };

  console.log(currentTutorial);

  return (
    <div style={{ height: '600px' }}>
      {currentTutorial ? (
        currentTutorial.name === currentUser.email ? (
          <div className="edit-form">
            <form>
              <div
                style={{
                  marginTop: '10px',
                  marginBottom: '10px',
                  marginRight: '10px',
                }}
              >
                <label htmlFor="name" style={{ marginRight: '10px' }}>
                  작성자 :
                </label>
                {currentTutorial.name}
                <br />
                <label htmlFor="name" style={{ marginRight: '10px' }}>
                  작성일 :
                </label>
                {dateFns.format(currentTutorial.postedOn, 'yyyy-MM-dd HH:MM')}
              </div>
              <div
                className="form-group"
                style={{
                  marginTop: '10px',
                  marginBottom: '10px',
                  marginRight: '10px',
                }}
              >
                <div>
                  <label htmlFor="title">제목</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={currentTutorial.title}
                    onChange={onChangeTitle}
                    style={{ width: '480px' }}
                  />
                </div>

                <ul
                  className="list-group"
                  style={{
                    marginTop: '10px',
                    marginRight: '20px',
                    marginBottom: '10px',
                    listStyle: 'none',
                  }}
                >
                  {currentTutorial.fileurl.map((url, index) => (
                    <li>
                      {currentTutorial.fname[index]}
                      <a href={url} style={{ marginLeft: '10px' }} download>
                        Download
                      </a>
                    </li>
                  ))}
                </ul>

                <div
                  className="form-group"
                  style={{
                    marginTop: '10px',
                    marginBottom: '10px',
                    marginRight: '10px',
                  }}
                >
                  <label htmlFor="description">내용</label>
                  <textarea
                    cols="50"
                    rows="10"
                    type="textarea"
                    className="form-control"
                    id="description"
                    value={currentTutorial.description}
                    onChange={onChangeDescription}
                    style={{ width: '480px' }}
                  ></textarea>
                </div>
              </div>
            </form>
            <button
              className="badge badge-danger mr-2"
              onClick={deleteTutorial}
            >
              삭제
            </button>
            <button className="badge badge-success" onClick={updateTutorial}>
              수정
            </button>
          </div>
        ) : (
          <div className="edit-form">
            <div
              style={{
                marginTop: '10px',
                marginBottom: '10px',
                marginRight: '10px',
              }}
            >
              <label htmlFor="name" style={{ marginRight: '10px' }}>
                작성자 :
              </label>
              {currentTutorial.name}
              <br />
              <label htmlFor="name" style={{ marginRight: '10px' }}>
                작성일 :
              </label>
              {dateFns.format(currentTutorial.postedOn, 'yyyy-MM-dd HH:MM')}
            </div>
            <div
              className="form-group"
              style={{
                marginTop: '10px',
                marginBottom: '10px',
                marginRight: '10px',
              }}
            >
              <div style={{ width: '465px' }}>
                <label htmlFor="title">제목</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentTutorial.title}
                  style={{ width: '480px' }}
                />
              </div>

              <ul
                className="list-group"
                style={{
                  marginTop: '10px',
                  marginRight: '20px',
                  marginBottom: '10px',
                  listStyle: 'none',
                }}
              >
                {currentTutorial.fileurl.map((url, index) => (
                  <li>
                    {currentTutorial.fname[index]}
                    <a href={url} style={{ marginLeft: '10px' }} download>
                      Download
                    </a>
                  </li>
                ))}
              </ul>

              <div
                className="form-group"
                style={{
                  marginTop: '10px',
                  marginBottom: '10px',
                  marginRight: '10px',
                }}
              >
                <label htmlFor="description">내용</label>
                <textarea
                  cols="54"
                  rows="10"
                  type="textarea"
                  className="form-control"
                  id="description"
                  value={currentTutorial.description}
                  style={{ width: '480px' }}
                ></textarea>
              </div>
            </div>
          </div>
        )
      ) : (
        <div>
          <br />
          <p>강의 자료를 클릭하세요</p>
        </div>
      )}
    </div>
  );
}
