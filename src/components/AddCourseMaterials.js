import React, { useRef, useState } from 'react';
import { firebaseApp } from '../firebase';
import firebase from '../firebase';
import { v4 as uuid } from 'uuid';
import { useAuth } from '../contexts/AuthContext';
import { Button, Form } from 'react-bootstrap';
import uploadIcon from '../images/uploadFilesIcon.png';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';

const db = firebaseApp.firestore();

export default function AddCourseMaterials(props) {
  const menuItemClass = ['캡스톤디자인', '자기주도프로젝트', '자기주도연구'];

  const { currentUser } = useAuth();
  const [files, setFiles] = useState([]);
  const inputRef = useRef();
  const previewRef = useRef();
  const [username, setUserName] = useState(currentUser.email);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fileUrl, setFileUrl] = useState([]);
  const [classes, setClasses] = useState(menuItemClass[0]);
  const [submitted, setSubmitted] = useState(false);

  const fileTypes = [
    'image/apng',
    'image/bmp',
    'image/gif',
    'image/jpeg',
    'image/pjpeg',
    'image/png',
    'image/svg+xml',
    'image/tiff',
    'image/webp',
    'image/x-icon',
    'application/postscript',
    'audio/x-aiff',
    'audio/x-aiff',
    'audio/x-aiff',
    'text/plain',
    'application/atom+xml',
    'audio/basic',
    'video/x-msvideo',
    'application/x-bcpio',
    'application/octet-stream',
    'image/bmp',
    'application/x-netcdf',
    'image/cgm',
    'application/octet-stream',
    'application/x-cpio',
    'application/mac-compactpro',
    'application/x-csh',
    'text/css',
    'application/x-director',
    'video/x-dv',
    'application/x-director',
    'image/vnd.djvu',
    'image/vnd.djvu',
    'application/octet-stream',
    'application/octet-stream',
    'application/octet-stream',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
    'application/vnd.ms-word.document.macroEnabled.12',
    'application/vnd.ms-word.template.macroEnabled.12',
    'application/xml-dtd',
    'video/x-dv',
    'application/x-dvi',
    'application/x-director',
    'application/postscript',
    'text/x-setext',
    'application/octet-stream',
    'application/andrew-inset',
    'image/gif',
    'application/srgs',
    'application/srgs+xml',
    'application/x-gtar',
    'application/x-hdf',
    'application/mac-binhex40',
    'text/x-component',
    'text/html',
    'text/html',
    'x-conference/x-cooltalk',
    'image/x-icon',
    'text/calendar',
    'image/ief',
    'text/calendar',
    'model/iges',
    'model/iges',
    'application/x-java-jnlp-file',
    'image/jp2',
    'image/jpeg',
    'application/x-javascript',
    'audio/midi',
    'application/x-latex',
    'application/octet-stream',
    'application/octet-stream',
    'audio/x-mpegurl',
    'audio/mp4a-latm',
    'video/vnd.mpegurl',
    'video/x-m4v',
    'image/x-macpaint',
    'application/x-troff-man',
    'application/mathml+xml',
    'application/x-troff-me',
    'model/mesh',
    'audio/midi',
    'audio/midi',
    'application/vnd.mif',
    'video/quicktime',
    'video/x-sgi-movie',
    'audio/mpeg',
    'video/mp4',
    'video/mpeg',
    'audio/mpeg',
    'application/x-troff-ms',
    'model/mesh',
    'video/vnd.mpegurl',
    'application/x-netcdf',
    'application/oda',
    'application/ogg',
    'image/x-portable-bitmap',
    'image/pict',
    'chemical/x-pdb',
    'application/pdf',
    'image/x-portable-graymap',
    'application/x-chess-pgn',
    'image/pict',
    'image/png',
    'image/x-portable-anymap',
    'image/x-macpaint',
    'image/x-macpaint',
    'image/x-portable-pixmap',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.openxmlformats-officedocument.presentationml.template',
    'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
    'application/vnd.ms-powerpoint.addin.macroEnabled.12',
    'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
    'application/vnd.ms-powerpoint.template.macroEnabled.12',
    'application/vnd.ms-powerpoint.slideshow.macroEnabled.12',
    'application/postscript',
    'video/quicktime',
    'image/x-quicktime',
    'image/x-quicktime',
    'audio/x-pn-realaudio',
    'audio/x-pn-realaudio',
    'image/x-cmu-raster',
    'application/rdf+xml',
    'image/x-rgb',
    'application/vnd.rn-realmedia',
    'application/x-troff',
    'text/rtf',
    'text/richtext',
    'text/sgml',
    'text/sgml',
    'application/x-sh',
    'application/x-shar',
    'model/mesh',
    'application/x-stuffit',
    'application/x-koan',
    'application/x-koan',
    'application/x-koan',
    'application/x-koan',
    'application/smil',
    'application/smil',
    'audio/basic',
    'application/octet-stream',
    'application/x-futuresplash',
    'application/x-wais-source',
    'application/x-sv4cpio',
    'application/x-sv4crc',
    'image/svg+xml',
    'application/x-shockwave-flash',
    'application/x-troff',
    'application/x-tar',
    'application/x-tcl',
    'application/x-tex',
    'application/x-texinfo',
    'application/x-texinfo',
    'image/tiff',
    'image/tiff',
    'application/x-troff',
    'text/tab-separated-values',
    'text/plain',
    'application/x-ustar',
    'application/x-cdlink',
    'model/vrml',
    'application/voicexml+xml',
    'audio/x-wav',
    'image/vnd.wap.wbmp',
    'application/vnd.wap.wbxml',
    'text/vnd.wap.wml',
    'application/vnd.wap.wmlc',
    'text/vnd.wap.wmlscript',
    'application/vnd.wap.wmlscriptc',
    'model/vrml',
    'image/x-xbitmap',
    'application/xhtml+xml',
    'application/xhtml+xml',
    'application/vnd.ms-excel',
    'application/xml',
    'image/x-xpixmap',
    'application/xml',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
    'application/vnd.ms-excel.sheet.macroEnabled.12',
    'application/vnd.ms-excel.template.macroEnabled.12',
    'application/vnd.ms-excel.addin.macroEnabled.12',
    'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
    'application/xslt+xml',
    'application/vnd.mozilla.xul+xml',
    'image/x-xwindowdump',
    'chemical/x-xyz',
    'application/zip',
  ];

  const onChangeClass = (e) => {
    setClasses(e.target.value);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  function validFileType(file) {
    return fileTypes.includes(file.type);
  }

  function returnFileSize(number) {
    if (number < 1024) {
      return number + 'bytes';
    } else if (number >= 1024 && number < 1048576) {
      return (number / 1024).toFixed(1) + 'KB';
    } else if (number >= 1048576) {
      return (number / 1048576).toFixed(1) + 'MB';
    }
  }

  // const saveClassMaterials = () => {
  //   if (
  //     ClassMaterialDataService.create({
  //       title: title,
  //       description: description,
  //       key: 0,
  //     })
  //   ) {
  //     setSubmitted(true);
  //   }
  // };

  // update한 file의 이름과 사이즈를 출력해줌
  function updateImageDisplay(e) {
    // onFileChange
    for (let i = 0; i < e.target.files.length; i++) {
      const newFile = e.target.files[i];
      newFile['id'] = Math.random();
      // add an "id" property to each File object
      setFiles((prevState) => [...prevState, newFile]);
      console.log(newFile);
      console.log(files);
    }

    while (previewRef.current.firstChild) {
      previewRef.current.removeChild(previewRef.current.firstChild);
    }

    const curFiles = inputRef.current.files;
    if (curFiles.length === 0) {
      const para = document.createElement('p');
      para.textContent = 'No files currently selected for upload';
      previewRef.current.appendChild(para);
    } else {
      const list = document.createElement('ol');
      previewRef.current.appendChild(list);

      for (const file of curFiles) {
        const listItem = document.createElement('li');
        const para = document.createElement('p');

        if (validFileType(file)) {
          para.textContent = `${file.name},  ${returnFileSize(file.size)}.`;
          // const image = document.createElement("img");
          // image.src = URL.createObjectURL(file);

          // listItem.appendChild(image);
          listItem.appendChild(para);
        } else {
          para.textContent = `${file.name}: Not a valid file type. Update your selection.`;
          listItem.appendChild(para);
        }

        list.appendChild(listItem);
      }
    }
  }

  var url = [];
  var fname = [];

  const onUploadSubmission = (e) => {
    e.preventDefault(); // prevent page refreshing
    const promises = [];
    const id = uuid();

    if (files.length === 0) {
      const fileRef = db.collection('classMaterials').doc(id);
      fileRef.set(
        {
          key: fileRef.id,
          name: username,
          title: title,
          description: description,
          fileurl: url,
          fname: fname,
          class: classes,
          postedOn: firebase.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true },
      );
      // fetchJobs();
    } else {
      files.forEach((file) => {
        fname.push(file.name);

        const uploadTask = firebaseApp
          .storage()
          .ref()
          .child(`your/file/path/${file.name}`)
          .put(file);

        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          function (snapshot) {
            var percent =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(percent + '% done');
          },
          (error) => console.log(error.code),
          () => {
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(function (downloadURL) {
                console.log(downloadURL);

                url.push(downloadURL);

                const fileRef = db.collection('classMaterials').doc(id);
                fileRef.set(
                  {
                    //db.collection("users").doc(username).set({
                    key: fileRef.id,
                    name: username,
                    title: title,
                    description: description,
                    fileurl: url,
                    fname: fname,
                    class: classes,
                    postedOn: firebase.firestore.FieldValue.serverTimestamp(),
                  },
                  { merge: true },
                );
              });
          },
        );
      });
    }

    return Promise.all(promises)
      .then(() => alert('All files uploaded'), console.log(files), setFiles([]))
      .catch((err) => console.log(err.code));
  };

  const newClassMaterials = () => {
    setTitle('');
    setDescription('');
    setSubmitted(false);
  };

  function handleSubmit(e) {
    e.preventDefault();

    try {
      setSubmitted('');
      onUploadSubmission();
      setSubmitted('글 작성이 완료되었습니다!');
    } catch {}
  }

  return (
    <form
      className="submit-form"
      style={{ maxWidth: '5500px', minHeight: '280px' }}
      onSubmit={onUploadSubmission}
      encType="multipart/form-data"
    >
      <h1
        style={{
          fontFamily: 'Poppins',
          fontSize: 40,
        }}
      >
        강의 자료 등록
      </h1>

      <div style={{ marginTop: '40px' }}>
        {/* <InputLabel htmlFor="outlined-age-native-simple">강의</InputLabel> */}
        <Select
          onChange={onChangeClass}
          name="class"
          value={classes}
          disableUnderline
          variant="outlined"
          style={{ marginBottom: '15px' }}
        >
          {menuItemClass.map((item, i) => {
            return <MenuItem value={item}>{item}</MenuItem>;
          })}
        </Select>
        <Form.Group controlId="formGridTitle">
          {/* <InputLabel htmlFor="outlined-age-native-simple">제목</InputLabel> */}
          <Form.Control
            type="text"
            placeholder="제목"
            aria-label="With text"
            aria-describedby="basic-addon1"
            className="form-control"
            id="title"
            required
            value={title}
            onChange={onChangeTitle}
            name="title"
          />
        </Form.Group>

        <Form.Group
          controlId="formGridContents"
          style={{ marginBottom: '15px' }}
        >
          {/* <InputLabel htmlFor="outlined-age-native-simple">내용</InputLabel> */}
          <Form.Control
            as="textarea"
            rows="12"
            placeholder="본문을 입력하세요"
            aria-label="With textarea"
            aria-describedby="inputGroup-sizing-lg"
            className="form-control"
            id="description"
            required
            value={description}
            onChange={onChangeDescription}
            name="description"
          />
        </Form.Group>

        <div>
          <label htmlFor="file_uploads">
            <img src={uploadIcon} width="35" height="35" alt="testA" />
          </label>
          <input
            type="file"
            id="file_uploads"
            name="file_uploads"
            multiple
            onChange={updateImageDisplay}
            style={{ opacity: 0, width: '1px', height: '1px' }}
            ref={inputRef}
          />
        </div>
        <div className="preview" ref={previewRef}>
          <p>No files currently selected for upload</p>
        </div>
        <div>
          <Button className="w-20" type="submit">
            등록
          </Button>
        </div>
      </div>
    </form>
  );
}
