import {
  Button,
  CircularProgress,
  Container,
  FilledInput,
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { firestore, firebaseApp } from '../firebase';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'Email', headerName: 'Email', width: 230 },
  { field: 'Subject', headerName: 'Subject', width: 230 },
  { field: 'Memo', headerName: 'Memo', width: 300 },
];

const rows = [
  { id: 1, Email: 'tt@tt.com', Subject: '캡스톤디자인', Memo: '메모 1' },
  { id: 2, Email: '123@123.com', Subject: '자기주도프로젝트', Memo: '메모 2' },
  { id: 3, Email: '456@456.com', Subject: '자기주도연구', Memo: '메모 3' },
];

export default function AddTeacher() {
  const [teachers, setTeachers] = useState({});
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const fetchTeachers = async () => {
    setLoading(true);
    const req = await firestore
      .collection('teachers')
      .orderBy('postedOn', 'desc')
      .get();
    const tempTeachers = req.docs.map((teacher) => ({
      ...teacher.data(),
      id: teacher.id,
      postedOn: teacher.data().postedOn.toDate(),
    }));
    setTeachers(tempTeachers);
    setLoading(false);
  };

  const postTeacher = async (email) => {
    await firestore.collection('teachers').doc().set(
      {
        email: email,
        postedOn: firebaseApp.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
    fetchTeachers();
  };

  const handleChange = (e) => {
    e.persist();
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    await postTeacher(email);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <Container
      style={{
        fontFamily: 'CookieRun Bold',
      }}
    >
      <box>
        <FilledInput
          style={{
            marginLeft: '7px',
            height: '50px',
            fontFamily: 'CookieRun Bold',
          }}
          onChange={handleChange}
          name="email"
          placeholder="Your teacher's email"
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
            '구독하기'
          )}
        </Button>
      </box>
      <div style={{ height: 600, width: '100%', fontFamily: 'CookieRun Bold' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={8}
          checkboxSelection
          style={{ fontFamily: 'CookieRun Bold', fontWeight: '600' }}
        />
      </div>
    </Container>
  );
}
