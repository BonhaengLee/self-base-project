import { InputAdornment, Paper, SvgIcon, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import TutorialDataService from '../services/classmaterial';
import UpdateClassMaterial from './UpdateClassMaterial';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import LocalPharmacyIcon from '@material-ui/icons/LocalPharmacy';
import FunctionsIcon from '@material-ui/icons/Functions';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import * as dateFns from 'date-fns';
import { firebase } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

export default function MyReadCourseMaterialsList() {
  const [tutorials, setTutorials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  // 검색
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [tch, setTch] = useState([]);
  const { currentUser } = useAuth();

  var arr = [];

  const fetchTeachers = async () => {
    const req = await firebase
      .firestore()
      .collection('teachers')
      .where('sender', '==', currentUser.email)
      .where('accept', '==', true)
      .get();
    const tempTeachers = req.docs.map((teacher, i) => ({
      // ...teacher.data(),
      email: teacher.data().email,
    }));
    console.log(tempTeachers);
    tempTeachers.map((t, i) => {
      arr.push(Object.values(t));
    });
    console.log(arr);
    setTch(tempTeachers);
  };

  var ar = [];
  //db.collection('classMaterials').orderBy('postedOn', 'desc').get()
  const loadTutorialData = async () => {
    ar.push(currentUser.email);

    TutorialDataService.getAll(ar).then((snapshot) => {
      setTutorials(
        snapshot.docs.map((item) => ({
          ...item.data(),
          postedOn: item.data().postedOn.toDate(),
        })),
      );
    });
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await fetchTeachers();
        setLoading(false);

        setLoading(true);
        await loadTutorialData();
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    })();
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
          style={{ fontSize: '18px' }}
        >
          <div
            style={{
              fontSize: '17px',
              color: '#1A237E',
            }}
          >
            {subj(c.class, c.postedOn, c.name)}
          </div>
          {c.title}
        </li>
      );
    });
  };

  function subj(subj, pst, name) {
    if (subj === '캡스톤디자인') {
      return (
        <div style={{ color: '#0D47A1', display: 'flex' }}>
          <p style={{ color: 'black' }}>{name} | </p>
          <ImportantDevicesIcon
            style={{ marginLeft: '4px', marginRight: '8px' }}
          />
          {'   '}
          {subj}
          {' | '}
          <div style={{ opacity: 0.6, display: 'flex', marginLeft: '5px' }}>
            {dateFns.format(pst, 'yyyy-MM-dd HH:MM')}
          </div>
        </div>
      );
    } else if (subj === '자기주도프로젝트') {
      return (
        <div style={{ color: '#311B92', display: 'flex' }}>
          <p style={{ color: 'black' }}>{name} | </p>
          <ImportantDevicesIcon
            style={{ marginLeft: '4px', marginRight: '8px' }}
          />{' '}
          {'   '}
          {subj}
          {' | '}
          <div style={{ opacity: 0.6, display: 'flex', marginLeft: '5px' }}>
            {dateFns.format(pst, 'yyyy-MM-dd HH:MM')}
          </div>
        </div>
      );
    } else if (subj === '자기주도연구') {
      return (
        <div style={{ color: '#880E4F', display: 'flex' }}>
          <p style={{ color: 'black' }}>{name} | </p>
          <ImportantDevicesIcon
            style={{ marginLeft: '4px', marginRight: '8px' }}
          />{' '}
          {'   '}
          {subj}
          {' | '}
          <div style={{ opacity: 0.6, display: 'flex', marginLeft: '5px' }}>
            {dateFns.format(pst, 'yyyy-MM-dd HH:MM')}
          </div>
        </div>
      );
    } else if (subj === '수학1') {
      return (
        <div style={{ color: '#263238', display: 'flex' }}>
          <p style={{ color: 'black' }}>{name} | </p>
          <FunctionsIcon
            style={{ marginLeft: '4px', marginRight: '8px' }}
          />{' '}
          {'   '}
          {subj}
          {' | '}
          <div style={{ opacity: 0.6, display: 'flex', marginLeft: '5px' }}>
            {dateFns.format(pst, 'yyyy-MM-dd HH:MM')}
          </div>
        </div>
      );
    } else if (subj === '약품분자생물학') {
      return (
        <div style={{ color: '#BF360C', display: 'flex' }}>
          <p style={{ color: 'black' }}>{name} | </p>
          <LocalPharmacyIcon
            style={{ marginLeft: '4px', marginRight: '2px' }}
          />{' '}
          {'   '}
          {subj}
          {' | '}
          <div style={{ opacity: 0.6, display: 'flex', marginLeft: '5px' }}>
            {dateFns.format(pst, 'yyyy-MM-dd HH:MM')}
          </div>
        </div>
      );
    } else if (subj === '국제금융론') {
      return (
        <div style={{ color: '#1B5E20', display: 'flex' }}>
          <p style={{ color: 'black' }}>{name} | </p>
          <MonetizationOnIcon
            style={{ marginLeft: '4px', marginRight: '8px' }}
          />{' '}
          {'   '}
          {subj}
          {' | '}
          <div style={{ opacity: 0.6, display: 'flex', marginLeft: '5px' }}>
            {dateFns.format(pst, 'yyyy-MM-dd HH:MM')}
          </div>
        </div>
      );
    } else {
    }
  }

  return (
    <>
      <Col
        style={{
          marginLeft: '-15px',
          marginBottom: '40px',
        }}
        xs="6"
        elevation={3}
      >
        <h1
          style={{
            marginBottom: '40px',
            marginTop: '50px',
          }}
        >
          내 강의 자료
        </h1>
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
      <Col xs="6">
        <Paper
          style={{
            margin: '10px 10px',
            padding: '10px',
            backgroundColor: 'rgb(238,238,238)',
          }}
          elevation={3}
        >
          {currentIndex >= 0 ? (
            <UpdateClassMaterial
              tutorial={tutorials[currentIndex]}
              refreshList={refreshList}
            />
          ) : (
            <div>
              <br />
              <p>강의 자료를 클릭하세요</p>
            </div>
          )}
        </Paper>
      </Col>
    </>
  );
}
