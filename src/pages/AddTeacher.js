import {
  Button,
  CircularProgress,
  Container,
  FilledInput,
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { firestore, firebaseApp, admin } from '../firebase';
import * as dateFns from 'date-fns';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import { useAuth } from 'contexts/AuthContext';

const Spinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  border: 3px solid ${'rgba(255, 255, 255, 0.3)'};
  border-top-color: ${'rgba(255, 255, 255, 1)'};
  animation: anim 0.7s infinite linear;

  @keyframes anim {
    to {
      transform: rotate(360deg);
    }
  }
`;

const columns = [
  { field: 'tId', headerName: 'ID', width: 100 },
  { field: 'email', headerName: 'Email', width: 230 },
  { field: 'memo', headerName: 'Memo', width: 730 },
  { field: 'accept', headerName: 'Accept', width: 110 },
  // { field: 'postedOn', headerName: 'PostedOn', width: 230 },
];

// const rows = [
//   { id: 1, Email: 'tt@tt.com', Subject: '캡스톤디자인', Memo: '메모 1' },
//   { id: 2, Email: '123@123.com', Subject: '자기주도프로젝트', Memo: '메모 2' },
//   { id: 3, Email: '456@456.com', Subject: '자기주도연구', Memo: '메모 3' },
// ];

export default function AddTeacher() {
  const { currentUser } = useAuth();
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [memo, setMemo] = useState('');

  // const fetchJobs = async () => {
  //   setCustomSearch(false);
  //   setLoading(true);
  //   const req = await firestore
  //     .collection('jobs')
  //     .orderBy('postedOn', 'desc')
  //     .get();
  //   const tempJobs = req.docs.map((job) => ({
  //     ...job.data(),
  //     id: job.id,
  //     postedOn: job.data().postedOn.toDate(),
  //   }));
  //   setJobs(tempJobs);
  //   setLoading(false);
  // };

  const fetchTeachers = async () => {
    setLoading(true);
    const req = await firestore
      .collection('teachers')
      .orderBy('id', 'desc')
      .get();
    const tempTeachers = req.docs.map((teacher, i) => ({
      ...teacher.data(),
      tId: i + 1,
      // postedOn: teacher.data().postedOn.toDate(),
    }));
    setTeachers(tempTeachers);
    setLoading(false);
  };

  const postTeacher = async (email) => {
    if (currentUser.email === email) {
      console.log('자신의 이메일');
    } else {
      console.log(email);
      const req = await firestore
        .collection('teachers')
        // .where('email', '==', email)
        .doc(email)
        .get()
        .then(function (doc) {
          if (doc.exists === false) {
            f();
            setLoading(false);
          } else {
          }
        })
        .catch(function (error) {
          console.log('Error getting document:', error);
        });
    }
    fetchTeachers();
  };

  const f = async () => {
    console.log('No such document!');
    const id = uuid();
    await firestore.collection('teachers').doc(email).set(
      {
        email: email,
        memo: memo,
        id: id,
        accept: 'X',
        sender: currentUser.email,
        // postedOn: firebaseApp.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
    setLoading(false);
  };

  const handleChangeEmail = (e) => {
    e.persist();
    setEmail(e.target.value);
  };

  const handleChangeMemo = (e) => {
    e.persist();
    setMemo(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    await postTeacher(email);
    setLoading(false);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // const remove = (rowId) => {
  //   // Array.prototype.filter returns new array
  //   // so we aren't mutating state here
  //   const arrayCopy = teacher.filter((row) => row.id !== rowId);
  //   setData(arrayCopy);
  // };
  const updateTeacher = async () => {
    teachers.map((item, i) => {
      firestore
        .collection('teachers')
        .doc(item.id)
        .set(
          {
            ...item,
          },
          { merge: true },
        );
    });
  };

  const [deletedRows, setDeletedRows] = useState([]);

  const handleRowSelection = (e) => {
    setDeletedRows([
      ...deletedRows,
      ...teachers.filter((r) => r.id === e.data.id),
    ]);
  };

  const handlePurge = () => {
    setTeachers(
      teachers.filter(
        (r) => deletedRows.filter((sr) => sr.id === r.id).length < 1,
      ),
    );
    updateTeacher();
  };

  console.log(teachers);

  return (
    <Container
      style={{
        fontFamily: 'CookieRun Bold',
      }}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div style={{ width: '1000px' }}>
            <box>
              <FilledInput
                style={{
                  marginLeft: '7px',
                  height: '50px',
                  fontFamily: 'CookieRun Bold',
                }}
                onChange={handleChangeEmail}
                name="email"
                placeholder="Your teacher's email"
                disableUnderline
              />
            </box>
            <box>
              <FilledInput
                style={{
                  marginLeft: '7px',
                  height: '50px',
                  fontFamily: 'CookieRun Bold',
                  width: '500px',
                }}
                onChange={handleChangeMemo}
                name="memo"
                placeholder="Memo"
                disableUnderline
              />
            </box>
            <box>
              <Button
                variant="contained"
                color="secondary"
                style={{
                  marginBottom: '21px',
                  marginLeft: '7px',
                  height: '50px',
                  fontFamily: 'CookieRun Bold',
                }}
                onClick={handleSubmit}
              >
                {loading ? (
                  <CircularProgress color="secondary" size={22} />
                ) : (
                  '수강신청'
                )}
              </Button>
            </box>
          </div>
          <div
            style={{ height: 500, width: '100%', fontFamily: 'CookieRun Bold' }}
          >
            <DataGrid
              rows={teachers}
              columns={columns}
              pageSize={8}
              checkboxSelection
              onRowSelected={handleRowSelection}
              style={{ fontFamily: 'CookieRun Bold', fontWeight: '600' }}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePurge}
            style={{ fontFamily: 'CookieRun Bold', marginTop: '5px' }}
          >
            삭제
          </Button>
        </>
      )}
    </Container>
  );
}
