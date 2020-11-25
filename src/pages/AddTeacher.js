import { Button, CircularProgress, FilledInput } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { firestore, firebaseApp } from '../firebase';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'email', headerName: 'email', width: 230 },
  { field: 'subject', headerName: 'subject', width: 230 },
  { field: 'memo', headerName: 'memo', width: 300 },
];

const rows = [
  { id: 1, email: 'tt@tt.com', subject: '캡스톤디자인', memo: '메모 1' },
  { id: 2, email: '123@123.com', subject: '자기주도프로젝트', memo: '메모 2' },
  { id: 3, email: '456@456.com', subject: '자기주도연구', memo: '메모 3' },
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
    <>
      <box>
        <FilledInput
          style={{ marginLeft: '7px', height: '50px' }}
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
          style={{ marginBottom: '21px', marginLeft: '7px', height: '50px' }}
          onClick={handleSubmit}
        >
          {loading ? (
            <CircularProgress color="secondary" size={22} />
          ) : (
            '구독하기'
          )}
        </Button>
      </box>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={8}
          checkboxSelection
        />
      </div>
    </>
  );
}
