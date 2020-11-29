import React, { useEffect, useState } from 'react';

import { Button, Container, IconButton } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { firestore } from '../firebase';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import * as dateFns from 'date-fns';
import styled from 'styled-components';
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
  { field: 'accept', headerName: 'Accept', width: 110 },
  { field: 'memo', headerName: 'Memo', width: 230 },
  { field: 'postedOn', headerName: 'PostedOn', width: 230 },
];

export default function AddStudent() {
  const [studs, setStuds] = useState([]);
  const [accs, setAccs] = useState([]);
  // const [acc, setAcc] = useState(false);
  // const [update, setUpdate] = useState('');
  // const [toUpdateId, setToUpdateId] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  const fetchStudents = async () => {
    setLoading(true);
    const req = await firestore
      .collection('teachers')
      .orderBy('id', 'desc')
      .where('email', '==', currentUser.email)
      .where('accept', '==', false)
      .get();
    const tempStudents = req.docs.map((student, i) => ({
      ...student.data(),
      accept: student.data().accept === false ? 'X' : 'O',
      tId: i + 1,
      postedOn: dateFns.format(student.data().postedOn.toDate(), 'yyyy-MM-dd'),
    }));
    setStuds(tempStudents);
    setLoading(false);
  };

  const fetchAcc = async () => {
    setLoading(true);
    const req = await firestore
      .collection('teachers')
      .orderBy('id', 'desc')
      .where('email', '==', currentUser.email)
      .where('accept', '==', true)
      .get();
    const tempAccs = req.docs.map((student, i) => ({
      ...student.data(),
      accept: student.data().accept === false ? 'X' : 'O',
      tId: i + 1,
      postedOn: dateFns.format(student.data().postedOn.toDate(), 'yyyy-MM-dd'),
    }));
    setAccs(tempAccs);
    setLoading(false);
  };

  useEffect(() => {
    console.log('useEffect Hook!!!');
    fetchStudents();
    fetchAcc();
  }, []);

  const [deletedRows, setDeletedRows] = useState([]);

  const handleRowSelection = (e) => {
    setDeletedRows([
      ...deletedRows,
      ...studs.filter((r) => r.id === e.data.id),
    ]);
    setAcceptedRows([
      ...acceptedRows,
      ...studs.filter((r) => r.id === e.data.id),
    ]);
  };

  const handlePurge = () => {
    setStuds(
      studs.filter(
        (r) => deletedRows.filter((sr) => sr.id === r.id).length < 1,
      ),
    );
    deleteStuds();
  };

  const deleteStuds = async () => {
    studs.map((item, i) => {
      firestore
        .collection('teachers')
        .doc(item.sender + item.email)
        .delete()
        .then(() => console.log('Document deleted')) // Document deleted
        .catch((error) => console.error('Error deleting document', error));
    });
    setDeletedRows([...studs]);
    setAcceptedRows([...studs]);
  };

  const [acceptedRows, setAcceptedRows] = useState([]);

  const handleAccept = () => {
    setStuds(
      studs.filter(
        (r) => acceptedRows.filter((sr) => sr.id === r.id).length < 1,
      ),
    );
    acceptStuds();
  };

  const acceptStuds = async () => {
    studs.map((item, i) => {
      firestore
        .collection('teachers')
        .doc(item.sender + item.email)
        .set(
          {
            accept: true,
          },
          { merge: true },
        )
        .then(() => console.log('Document accepted')) // Document deleted
        .catch((error) => console.error('Error accepting document', error));
    });
    setLoading(false);
  };

  console.log(studs);

  return (
    <Container
      style={{
        fontFamily: 'CookieRun Bold',
        marginBottom: '20px',
        paddingBottom: '20px',
      }}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div style={{ width: '1000px', marginBottom: '10px' }}>
            <h2>학생 목록</h2>
          </div>
          <div
            style={{ height: 300, width: '100%', fontFamily: 'CookieRun Bold' }}
          >
            <DataGrid
              rows={studs}
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
          <Button
            variant="contained"
            color="secondary"
            onClick={handleAccept}
            style={{
              fontFamily: 'CookieRun Bold',
              marginTop: '5px',
              marginLeft: '5px',
            }}
          >
            수락
          </Button>

          <div
            style={{ width: '1000px', marginTop: '20px', marginBottom: '10px' }}
          >
            <h2>수강 인원</h2>
          </div>
          <div
            style={{
              height: 300,
              width: '100%',
              fontFamily: 'CookieRun Bold',
            }}
          >
            <DataGrid
              rows={accs}
              columns={columns}
              pageSize={8}
              style={{
                fontFamily: 'CookieRun Bold',
                fontWeight: '600',
              }}
            />
          </div>
        </>
      )}
    </Container>
  );
}
