import React, { useContext, useState } from 'react';
// import { MainContext } from '../contexts/MainContext';
// import { UserContext } from '../contexts/UserContext';
import styled from 'styled-components';
import { Redirect, useHistory } from 'react-router-dom';
import Button from '../../components/videoSystem/Button';
import Alert from '../../components/videoSystem/Alert';
import InlineLoader from '../../components/videoSystem/InlineLoader';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import firebase from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';

const Container = styled.div`
  width: 90%;
  margin: 3rem auto;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 1.5rem;

  h1 {
    font-family: 'Poppins';
    font-size: 40;
  }

  #section-header {
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    button {
      justify-self: flex-end;
      font-size: 40;
      padding: 0;
    }
  }

  #files {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;
    align-items: center;
    column-gap: 2rem;

    .file-upload {
      cursor: pointer;
      display: grid;
      justify-content: center;
      align-items: center;
      height: 15rem;
      border: 3px dashed rgba(7, 7, 10, 1);

      h2 {
        font-family: 'Poppins';
        font-size: 30;
        cursor: pointer;
      }
    }
  }

  #inputs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 1rem;
    justify-content: center;
    align-items: center;

    input {
      background: ${({ darkMode }) =>
        darkMode ? 'rgba(74, 82, 90, 0.5)' : 'rgba(255, 255, 255, 0.5)'};
      border: none;
      color: ${({ darkMode }) =>
        darkMode ? 'rgba(255, 255, 255, 1)' : 'rgba(7, 7, 10, 1)'};
      width: 100%;
      padding: 1rem 0.5rem;
      font-size: 1rem;
      font-weight: 400;

      &::placeholder {
        font-size: 1rem;
      }
    }
  }

  .error {
    color: #ff4a4a;
    font-size: 0.8rem;
    width: 35vw;
    overflow-wrap: break-word;
  }
`;

const Upload = () => {
  // const { user } = useContext(UserContext);
  const { currentUser } = useAuth();
  //   const { darkMode, addVideo } = useContext(MainContext);
  const darkMode = true;

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const history = useHistory();

  const addVideo = async (title, description, video, thumbnail) => {
    try {
      const videoRef = await firebase.firestore().collection('videos').add({
        title,
        description,
        live: false,
        userEmail: currentUser.email,
        views: 0,
      });
      const videoSnapshot = await firebase
        .storage()
        .ref(`videos/${videoRef.id}.mp4`)
        .put(video);
      const videoUrl = await videoSnapshot.ref.getDownloadURL();
      const thumbnailSnapshot = await firebase
        .storage()
        .ref(`thumbnails/${videoRef.id}.png`)
        .put(thumbnail);
      const thumbnailoUrl = await thumbnailSnapshot.ref.getDownloadURL();
      await videoRef.update({ source: videoUrl, thumbnail: thumbnailoUrl });
    } catch (err) {
      throw err;
    }
  };

  const videoUploadForm = useFormik({
    initialValues: {
      title: '',
      description: '',
      videoName: '',
      thumbnailName: '',
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      videoName: Yup.string().required('Video is required'),
      thumbnailName: Yup.string().required('Thumbnail is required'),
    }),
    onSubmit: async ({ title, description, video, thumbnail }) => {
      try {
        setLoading(true);
        await addVideo(title, description, video, thumbnail);
        setLoading(false);
        setAlert({ type: 'success', text: 'Video uploaded successfully' });
        setTimeout(() => setAlert(null), 5000);
      } catch (err) {
        setLoading(false);
        setAlert({ type: 'failure', text: 'Error occured! Try again later' });
        setTimeout(() => setAlert(null), 5000);
      } finally {
        videoUploadForm.resetForm();
      }
    },
  });

  return (
    <form onSubmit={videoUploadForm.handleSubmit}>
      {currentUser ? (
        <Container darkMode={darkMode}>
          <div id="section-header">
            <h1>강의 영상 업로드</h1>
            <button
              style={{
                paddingLeft: '5px',
                paddingRight: '5px',
                backgroundColor: '#FF4A4A',
                color: 'white',
                border: 'none',
              }}
              onClick={() => history.push('/')}
            >
              Cancel
            </button>
          </div>
          {alert && <Alert type={alert.type} text={alert.text} />}
          <div id="files">
            <label htmlFor="video">
              <div className="file-upload">
                <h2>{videoUploadForm.values.videoName || 'Upload video'}</h2>
                <input
                  type="file"
                  accept="video/*"
                  name="video"
                  id="video"
                  style={{ display: 'none' }}
                  onChange={(event) => {
                    if (event.target.files[0]) {
                      videoUploadForm.setFieldValue(
                        'video',
                        event.target.files[0],
                      );
                      videoUploadForm.setFieldValue(
                        'videoName',
                        event.target.files[0].name,
                      );
                    }
                  }}
                />
              </div>
            </label>
            {videoUploadForm.errors.videoName &&
              videoUploadForm.touched.videoName && (
                <p className="error">{videoUploadForm.errors.videoName}</p>
              )}
            <label htmlFor="thumbnail">
              <div className="file-upload">
                <h2>
                  {videoUploadForm.values.thumbnailName || 'Upload thumbnail'}
                </h2>
                <input
                  type="file"
                  accept="image/*"
                  name="thumbnail"
                  id="thumbnail"
                  style={{ display: 'none' }}
                  onChange={(event) => {
                    if (event.target.files[0]) {
                      videoUploadForm.setFieldValue(
                        'thumbnail',
                        event.target.files[0],
                      );
                      videoUploadForm.setFieldValue(
                        'thumbnailName',
                        event.target.files[0].name,
                      );
                    }
                  }}
                />
              </div>
            </label>
          </div>
          {videoUploadForm.errors.thumbnailName &&
            videoUploadForm.touched.thumbnailName && (
              <p className="error">{videoUploadForm.errors.thumbnailName}</p>
            )}
          <div id="inputs">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={videoUploadForm.values.title}
              onChange={videoUploadForm.handleChange}
              onBlur={videoUploadForm.handleBlur}
            />
            {videoUploadForm.errors.title && videoUploadForm.touched.title && (
              <p className="error">{videoUploadForm.errors.title}</p>
            )}
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={videoUploadForm.values.description}
              onChange={videoUploadForm.handleChange}
              onBlur={videoUploadForm.handleBlur}
            />
            {videoUploadForm.errors.description &&
              videoUploadForm.touched.description && (
                <p className="error">{videoUploadForm.errors.description}</p>
              )}
            <Button mode="form" text={loading ? <InlineLoader /> : 'Submit'} />
          </div>
        </Container>
      ) : (
        <Redirect to="/" />
      )}
    </form>
  );
};

export default Upload;
