// import { Button, CircularProgress, FilledInput } from '@material-ui/core';
// import { DataGrid } from '@material-ui/data-grid';
// import React, { lazy, Suspense, useEffect, useState } from 'react';
// import { firestore } from '../firebase';
// import app from '../firebase';
// import { useAuth } from 'contexts/AuthContext';

// const columns = [
//   { field: 'id', headerName: 'ID', width: 100 },
//   { field: 'email', headerName: 'email', width: 230 },
//   { field: 'subject', headerName: 'subject', width: 230 },
//   { field: 'memo', headerName: 'memo', width: 300 },
// ];

// const rows = [
//   { id: 1, email: 'tt@tt.com', subject: '캡스톤디자인', memo: '메모 1' },
//   { id: 2, email: '123@123.com', subject: '자기주도프로젝트', memo: '메모 2' },
//   { id: 3, email: '456@456.com', subject: '자기주도연구', memo: '메모 3' },
// ];

// export default function AddStudent() {
//   const [teachers, setTeachers] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [email, setEmail] = useState('');
//   const [subject, setSubject] = useState('');
//   const [memo, setMemo] = useState('');
//   const { currentUser } = useAuth();

//   const fetchTeachers = async () => {
//     setLoading(true);
//     const req = await firestore
//       .collection('teachers')
//       .orderBy('postedOn', 'desc')
//       .get();
//     const tempTeachers = req.docs.map((teacher) => ({
//       ...teacher.data(),
//       id: teacher.id,
//       postedOn: teacher.data().postedOn.toDate(),
//     }));
//     setTeachers(tempTeachers);
//     setLoading(false);
//   };

//   const postTeacher = async (email, subject, memo) => {
//     await firestore.collection('teachers').doc().set(
//       {
//         email: email,
//         subject: subject,
//         memo: memo,
//         studentId: currentUser.email,
//         postedOn: app.firestore.FieldValue.serverTimestamp(),
//       },
//       { merge: true },
//     );
//     fetchTeachers();
//   };

//   const handleChangeEmail = (e) => {
//     e.persist();
//     setEmail(e.target.value);
//   };

//   const handleChangeSubject = (e) => {
//     e.persist();
//     setSubject(e.target.value);
//   };

//   const handleChangeMemo = (e) => {
//     e.persist();
//     setMemo(e.target.value);
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     await postTeacher(email, subject, memo);
//   };

//   useEffect(() => {
//     fetchTeachers();
//   }, []);

//   console.log(teachers);

//   return (
//     <>
//       <box>
//         <FilledInput
//           style={{ marginLeft: '7px', height: '50px' }}
//           onChange={handleChangeEmail}
//           name="email"
//           placeholder="Your teacher's email"
//           disableUnderline
//         />
//       </box>
//       <box>
//         <FilledInput
//           style={{ marginLeft: '7px', height: '50px' }}
//           onChange={handleChangeSubject}
//           name="subject"
//           placeholder="Subject"
//           disableUnderline
//         />
//       </box>
//       <box>
//         <FilledInput
//           style={{
//             marginLeft: '7px',
//             height: '50px',
//             width: '500px',
//             marginBottom: '-10px',
//           }}
//           onChange={handleChangeMemo}
//           name="memo"
//           placeholder="Memo"
//           disableUnderline
//         />
//       </box>
//       <box>
//         <Button
//           variant="contained"
//           color="secondary"
//           style={{ marginBottom: '21px', marginLeft: '7px', height: '50px' }}
//           onClick={handleSubmit}
//         >
//           {loading ? (
//             <CircularProgress color="secondary" size={22} />
//           ) : (
//             '구독하기'
//           )}
//         </Button>
//       </box>
//       <div style={{ height: 600, width: '100%' }}>
//         <DataGrid
//           rows={rows}
//           columns={columns}
//           pageSize={8}
//           checkboxSelection
//         />
//       </div>
//     </>
//   );
// }
