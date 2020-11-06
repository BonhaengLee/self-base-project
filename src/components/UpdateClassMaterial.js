import { Grid, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import TutorialDataService from '../services/classmaterial';

export default function UpdateClassMaterial({ tutorial, refreshList }) {
  const [currentTutorial, setCurrentTutorial] = useState();

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
    <div>
      {currentTutorial ? (
        <div className="edit-form">
          <form>
            <Grid
              className="form-group"
              style={{
                marginTop: '30px',
                marginBottom: '30px',
                marginRight: '10px',
              }}
            >
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={currentTutorial.title}
                onChange={onChangeTitle}
              />
            </Grid>
            <ul
              className="list-group"
              style={{
                marginTop: '30px',
                marginRight: '20px',
                marginBottom: '30px',
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

            <Grid
              style={{
                marginTop: '30px',
                marginBottom: '30px',
                marginRight: '10px',
              }}
            >
              <label htmlFor="name" style={{ marginRight: '10px' }}>
                작성자 :
              </label>
              {currentTutorial.name}
            </Grid>

            <Grid
              className="form-group"
              style={{
                marginTop: '30px',
                marginBottom: '30px',
                marginRight: '10px',
              }}
            >
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={currentTutorial.description}
                onChange={onChangeDescription}
              />
            </Grid>
          </form>
          <button className="badge badge-danger mr-2" onClick={deleteTutorial}>
            Delete
          </button>
          <button
            type="submit"
            className="badge badge-success"
            onClick={updateTutorial}
          >
            Update
          </button>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
}
