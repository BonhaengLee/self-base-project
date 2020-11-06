// import React, { useState } from 'react';
// import { firebaseApp } from '../firebaseInit';
// import db from '../firebaseInit';
// import { v4 as uuid } from 'uuid';

// export default function UploadFile(props) {
//   const [fileUrl, setFileUrl] = useState();
//   const readFiles = async (e) => {
//     const file = e.target.files[0];
//     const id = uuid();
//     const storageRef = fba.storage().ref('files').child(id);
//     const fileRef = db.collection('tutorials').doc(id);
//     await storageRef.put(file);
//     storageRef.getDownloadURL().then((url) => {
//       fileRef
//         .set({
//           url: url,
//           key: fileRef.id,
//         })
//         .then(function () {
//           console.log('Document successfully written!');
//           return true;
//         })
//         .catch(function (error) {
//           console.error('Error writing document: ', error);
//         });
//       setFileUrl(url);
//     });
//   };

//   return (
//     <div>
//       <h1>Upload Files</h1>
//       <input type="file" accept="file/*" onChange={readFiles} />
//       <img src={fileUrl} alt="" style={{ width: '100', height: '100' }} />
//     </div>
//   );
// }
