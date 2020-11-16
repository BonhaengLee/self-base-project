import {
  InputAdornment,
  Paper,
  SvgIcon,
  TextField,
  Grid,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import TutorialDataService from '../services/classmaterial';
import UpdateClassMaterial from './UpdateClassMaterial';

export default function ReadCourseMaterialsList() {
  const [tutorials, setTutorials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  // 검색
  const [searchKeyword, setSearchKeyword] = useState('');

  const loadTutorialData = () => {
    TutorialDataService.getAll().then((snapshot) => {
      setTutorials(snapshot.docs.map((item) => ({ ...item.data() })));
    });
  };

  useEffect(() => {
    loadTutorialData();
  }, []);

  const refreshList = () => {
    loadTutorialData();
    setCurrentIndex(-1);
  };

  function handleFilterTextChange(e) {
    e.preventDefault();
    setSearchKeyword(e.target.value);
  }

  const filteredComponents = (data) => {
    data = data.filter((c) => {
      return c.title.indexOf(searchKeyword) > -1;
    });
    return data.map((c, index) => {
      return (
        <li
          className={
            'list-group-item ' + (index === currentIndex ? 'active' : '')
          }
          onClick={() => setCurrentIndex(index)}
          key={index}
        >
          {c.title}
        </li>
      );
    });
  };

  return (
    <>
      <Col
        style={{
          top: '-50px',
          
        }}
        xs="6"
      >
        <header style={{ fontSize: '20px' }}>강의 자료</header>
        <Paper
          style={{ marginTop: '10px', marginBottom: '10px', width: '200px' }}
        >
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SvgIcon color="primary">
                    <path
                      fill="currentColor"
                      d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                    />
                  </SvgIcon>
                </InputAdornment>
              ),
            }}
            onChange={handleFilterTextChange}
          />
        </Paper>

        <ul className="list-group">
          {tutorials && filteredComponents(tutorials)}
        </ul>
      </Col>
      <Col
        // style={{
        //   position: 'absolute',
        //   left: '700px',
        //   top: '100px',
        //   width: '600px',
        // }}
        xs="6"
      >
        <Paper style={{ margin: '10px 10px', padding: '10px' }}>
          {currentIndex >= 0 ? (
            <UpdateClassMaterial
              tutorial={tutorials[currentIndex]}
              refreshList={refreshList}
            />
          ) : (
            <div>
              <br />
              <p>Please click on a posts...</p>
            </div>
          )}
        </Paper>
      </Col>
    </>
  );
}
