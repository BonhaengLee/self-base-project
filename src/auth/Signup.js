import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { styled } from '@material-ui/core/styles';
import imageUrl from '../assets/ac.jpg';
import { firebase } from '../firebase';

const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #a1c4fd 30%, #c2e9fb 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 2px 4px 1px #667eea',
  color: 'white',
  height: 48,
  padding: '0 30px',
});

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const nameRef = useRef();
  const {
    signup,
    updateDisplayName,
    addUserToDB,
    updateDisplayPhoto,
  } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [file, setFile] = useState(null);

  const inputRef = useRef();
  const [fileUrl, setFileUrl] = useState(imageUrl);
  const previewRef = useRef();
  const fileTypes = [
    'image/apng',
    'image/pjpeg',
    'image/png',
    'image/svg+xml',
    'image/tiff',
    'image/webp',
    'image/x-icon',
    'image/bmp',
    'image/cgm',
    'image/vnd.djvu',
    'image/gif',
    'image/x-icon',
    'text/calendar',
    'image/ief',
    'image/jp2',
    'image/jpeg',
    'image/x-macpaint',
    'image/x-portable-bitmap',
    'image/pict',
    'image/x-portable-anymap',
    'image/x-macpaint',
    'image/x-portable-pixmap',
    'image/x-quicktime',
    'image/x-cmu-raster',
    'image/x-rgb',
    'image/tiff',
    'image/vnd.wap.wbmp',
    'image/x-xbitmap',
    'image/x-xpixmap',
    'image/x-xwindowdump',
  ];

  function validFileType(file) {
    return fileTypes.includes(file.type);
  }

  const handleFileChange = async (e) => {
    e.persist();
    const filed = e.target.files[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(filed.name);
    await fileRef.put(filed);
    setFileUrl(await fileRef.getDownloadURL());

    const newFile = e.target.files[0];
    newFile['id'] = Math.random();
    setFile(newFile);
    console.log(newFile);

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
        const listItem = document.createElement('div');
        const para = document.createElement('p');

        if (validFileType(file)) {
          para.style.color = 'black';
          para.textContent = `${file.name}`;
          const image = document.createElement('img');
          image.style.height = '400px';
          image.style.width = '400px';
          image.src = URL.createObjectURL(file);

          listItem.appendChild(image);
          listItem.appendChild(para);
        } else {
          para.textContent = `${file.name}: Not a valid file type. Update your selection.`;
          para.style.color = 'red';
          listItem.appendChild(para);
        }

        list.appendChild(listItem);
      }
    }
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  console.log(file);
  console.log(fileUrl);

  // async function handleSubmit(e) {
  //   e.preventDefault();

  //   if (passwordRef.current.value !== passwordConfirmRef.current.value) {
  //     return setError('비밀번호가 일치하지 않습니다.');
  //   }
  //   try {
  //     setError('');
  //     setLoading(true);
  //     await signup(emailRef.current.value, passwordRef.current.value);
  //     await updateDisplayName(nameRef.current.value);
  //     await addUserToDB();
  //     history.push('/');
  //   } catch {
  //     setError('회원가입에 실패했습니다.');
  //   }

  //   setLoading(false);
  // }

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('비밀번호가 일치하지 않습니다.');
    }
    try {
      setError('');
      setLoading(true);
      // console.log('em', emailRef2.current.value);
      // console.log('pw', passwordRef2.current.value);
      // console.log('nm', nameRef.current.value);
      await signup(emailRef.current.value, passwordRef.current.value);
      await updateDisplayName(nameRef.current.value);
      await updateDisplayPhoto(fileUrl);
      await addUserToDB();

      // history.push("/");
      window.location.replace('/'); // 새로고침 효과
    } catch {
      setError('회원가입에 실패했습니다.');
    }

    setLoading(false);
  }

  return (
    <div className="w-100" style={{ maxWidth: '400px' }}>
      <>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">회원가입</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>이메일</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>비밀번호 확인</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  required
                />
              </Form.Group>
              <Form.Group id="name">
                <Form.Label>이름</Form.Label>
                <Form.Control type="text" ref={nameRef} required />
              </Form.Group>
              <div
                style={{
                  position: 'relative',
                  lineHeight: '1em',
                  textAlign: 'center',
                }}
              >
                <img
                  src={fileUrl}
                  alt="profile"
                  style={{
                    width: '140px',
                    height: '140px',
                    left: '50%',
                    marginBottom: '10px',
                  }}
                  ref={previewRef}
                />

                <input
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '100%',
                    marginTop: '-0.5em',
                    marginLeft: '-50%',
                    textAlign: 'center',
                  }}
                  id="imageInput"
                  type="file"
                  ref={inputRef}
                  hidden="hidden"
                  onChange={(e) => handleFileChange(e)}
                  required
                />
                <div className="button-box">
                  <button
                    style={{
                      width: '145px',
                      backgroundColor: 'lightgray',
                      color: 'white',
                    }}
                    onClick={() => handleClick()}
                  >
                    사진 등록
                  </button>
                </div>
              </div>
              <MyButton disabled={loading} className="w-100" type="submit">
                가입하기
              </MyButton>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          이미 계정이 있으신가요?{' '}
          <Button variant="light">
            <Link to="/login" style={{ color: 'black' }}>
              로그인
            </Link>
          </Button>
        </div>
      </>
    </div>
  );
}
