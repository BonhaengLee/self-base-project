// // import { Button, CircularProgress, FilledInput } from '@material-ui/core';
// // import { DataGrid } from '@material-ui/data-grid';
// // import React, { lazy, Suspense, useEffect, useState } from 'react';
// // import { firestore } from '../firebase';
// // import app from '../firebase';
// // import { useAuth } from 'contexts/AuthContext';

// // const columns = [
// //   { field: 'id', headerName: 'ID', width: 100 },
// //   { field: 'email', headerName: 'email', width: 230 },
// //   { field: 'subject', headerName: 'subject', width: 230 },
// //   { field: 'memo', headerName: 'memo', width: 300 },
// // ];

// // const rows = [
// //   { id: 1, email: 'tt@tt.com', subject: '캡스톤디자인', memo: '메모 1' },
// //   { id: 2, email: '123@123.com', subject: '자기주도프로젝트', memo: '메모 2' },
// //   { id: 3, email: '456@456.com', subject: '자기주도연구', memo: '메모 3' },
// // ];

// // export default function AddStudent() {
// //   const [teachers, setTeachers] = useState({});
// //   const [loading, setLoading] = useState(false);
// //   const [email, setEmail] = useState('');
// //   const [subject, setSubject] = useState('');
// //   const [memo, setMemo] = useState('');
// //   const { currentUser } = useAuth();

// //   const fetchTeachers = async () => {
// //     setLoading(true);
// //     const req = await firestore
// //       .collection('teachers')
// //       .orderBy('postedOn', 'desc')
// //       .get();
// //     const tempTeachers = req.docs.map((teacher) => ({
// //       ...teacher.data(),
// //       id: teacher.id,
// //       postedOn: teacher.data().postedOn.toDate(),
// //     }));
// //     setTeachers(tempTeachers);
// //     setLoading(false);
// //   };

// //   const postTeacher = async (email, subject, memo) => {
// //     await firestore.collection('teachers').doc().set(
// //       {
// //         email: email,
// //         subject: subject,
// //         memo: memo,
// //         studentId: currentUser.email,
// //         postedOn: app.firestore.FieldValue.serverTimestamp(),
// //       },
// //       { merge: true },
// //     );
// //     fetchTeachers();
// //   };

// //   const handleChangeEmail = (e) => {
// //     e.persist();
// //     setEmail(e.target.value);
// //   };

// //   const handleChangeSubject = (e) => {
// //     e.persist();
// //     setSubject(e.target.value);
// //   };

// //   const handleChangeMemo = (e) => {
// //     e.persist();
// //     setMemo(e.target.value);
// //   };

// //   const handleSubmit = async () => {
// //     setLoading(true);
// //     await postTeacher(email, subject, memo);
// //   };

// //   useEffect(() => {
// //     fetchTeachers();
// //   }, []);

// //   console.log(teachers);

// //   return (
// //     <>
// //       <box>
// //         <FilledInput
// //           style={{ marginLeft: '7px', height: '50px' }}
// //           onChange={handleChangeEmail}
// //           name="email"
// //           placeholder="Your teacher's email"
// //           disableUnderline
// //         />
// //       </box>
// //       <box>
// //         <FilledInput
// //           style={{ marginLeft: '7px', height: '50px' }}
// //           onChange={handleChangeSubject}
// //           name="subject"
// //           placeholder="Subject"
// //           disableUnderline
// //         />
// //       </box>
// //       <box>
// //         <FilledInput
// //           style={{
// //             marginLeft: '7px',
// //             height: '50px',
// //             width: '500px',
// //             marginBottom: '-10px',
// //           }}
// //           onChange={handleChangeMemo}
// //           name="memo"
// //           placeholder="Memo"
// //           disableUnderline
// //         />
// //       </box>
// //       <box>
// //         <Button
// //           variant="contained"
// //           color="secondary"
// //           style={{ marginBottom: '21px', marginLeft: '7px', height: '50px' }}
// //           onClick={handleSubmit}
// //         >
// //           {loading ? (
// //             <CircularProgress color="secondary" size={22} />
// //           ) : (
// //             '구독하기'
// //           )}
// //         </Button>
// //       </box>
// //       <div style={{ height: 600, width: '100%' }}>
// //         <DataGrid
// //           rows={rows}
// //           columns={columns}
// //           pageSize={8}
// //           checkboxSelection
// //         />
// //       </div>
// //     </>
// //   );
// // }

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import MUIDataTable from 'mui-datatables';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Box, Typography } from '@material-ui/core';

export default function AddStudent() {
  const [responsive, setResponsive] = useState('vertical');
  const [tableBodyHeight, setTableBodyHeight] = useState('400px');
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState('');

  const columns = ['Name', 'Title', 'Location'];

  const options = {
    filter: true,
    filterType: 'dropdown',
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
  };

  const data = [
    ['Gabby George', 'Business Analyst', 'Minneapolis'],
    [
      'Aiden Lloyd',
      "Business Consultant for an International Company and CEO of Tony's Burger Palace",
      'Dallas',
    ],
    ['Jaden Collins', 'Attorney', 'Santa Ana'],
    ['Franky Rees', 'Business Analyst', 'St. Petersburg'],
    ['Aaren Rose', null, 'Toledo'],
    ['Johnny Jones', 'Business Analyst', 'St. Petersburg'],
    ['Jimmy Johns', 'Business Analyst', 'Baltimore'],
    ['Jack Jackson', 'Business Analyst', 'El Paso'],
    ['Joe Jones', 'Computer Programmer', 'El Paso'],
    ['Jacky Jackson', 'Business Consultant', 'Baltimore'],
    ['Jo Jo', 'Software Developer', 'Washington DC'],
    ['Donna Marie', 'Business Manager', 'Annapolis'],
  ];

  //   const skills = [
  //     '판넬작업',
  //     '다이어그램',
  //     '도면작업',
  //     '심부름',
  //     '모형작업',
  //     '기타업무',
  //   ];

  //   const addRemoveSkill = (skill) => {
  //     jobDetails.skills.includes(skill)
  //       ? setJobDetails((oldState) => ({
  //           ...oldState,
  //           skills: oldState.skills.filter((s) => s !== skill),
  //         }))
  //       : setJobDetails((oldState) => ({
  //           ...oldState,
  //           skills: oldState.skills.concat(skill),
  //         }));
  //   };

  return (
    //     <Box ml={1} mt={2} mb={2}>
    //     <Typography>Todos*</Typography>
    //     <Box display="flex">
    //       {skills.map((skill) => (
    //         <Box
    //           onClick={() => addRemoveSkill(skill)}
    //           className={`${classes.skillChip} ${
    //             jobDetails.skills.includes(skill) && classes.included
    //           }`}
    //           key={skill}
    //         >
    //           {skill}
    //         </Box>
    //       ))}
    //     </Box>
    //   </Box>
    <React.Fragment>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Responsive Option</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={responsive}
          style={{ width: '200px', marginBottom: '10px', marginRight: 10 }}
          onChange={(e) => setResponsive(e.target.value)}
        >
          <MenuItem value={'vertical'}>vertical</MenuItem>
          <MenuItem value={'standard'}>standard</MenuItem>
          <MenuItem value={'simple'}>simple</MenuItem>

          <MenuItem value={'scroll'}>scroll (deprecated)</MenuItem>
          <MenuItem value={'scrollMaxHeight'}>
            scrollMaxHeight (deprecated)
          </MenuItem>
          <MenuItem value={'stacked'}>stacked (deprecated)</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Table Body Height</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={tableBodyHeight}
          style={{ width: '200px', marginBottom: '10px', marginRight: 10 }}
          onChange={(e) => setTableBodyHeight(e.target.value)}
        >
          <MenuItem value={''}>[blank]</MenuItem>
          <MenuItem value={'400px'}>400px</MenuItem>
          <MenuItem value={'800px'}>800px</MenuItem>
          <MenuItem value={'100%'}>100%</MenuItem>
        </Select>
      </FormControl>
      <MUIDataTable
        title={'ACME Employee list'}
        data={data}
        columns={columns}
        options={options}
      />
    </React.Fragment>
  );
}
