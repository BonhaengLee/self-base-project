import React, { useState, useEffect, useContext } from 'react';
// import { MainContext } from '../../contexts/MainContext';
// import { UserContext } from '../../contexts/UserContext';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Player from '../../components/videoSystem/Player';
import Loader from '../../components/videoSystem/Loader';
import Alert from '../../components/videoSystem/Alert';

import firebase from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import accountLogo from '../../images/accountLogo.png';
import deleteRemove from '../../images/delete_remove.png';
import viewEyeVisible from '../../images/view_eye_visible.png';

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

  .info {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 1rem;

    .meta {
      grid-template-columns: 1fr;
      row-gap: 2rem;
    }

    .data {
      grid-template-columns: 1fr;
      row-gap: 2rem;

      .views {
        justify-self: flex-end;
        color: #ffffff;
        display: grid;
        grid-template-columns: repeat(2, auto);
        justify-content: flex-end;
        align-items: center;
        column-gap: 0.5rem;

        .eye {
          cursor: auto;
          width: 1.5rem;
          height: 1.5rem;
        }

        p {
          color: ${({ darkMode }) => (darkMode ? '#FFFFFF' : '#07070A')};
        }
      }

      .settings {
        margin-top: 1rem;
        justify-self: flex-end;
        display: grid;
        grid-template-columns: repeat(1, 1.5rem);
        justify-content: flex-end;
        align-items: center;
        column-gap: 1rem;
        cursor: auto;
      }
    }
  }

  .user {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    column-gap: 1rem;

    .profile {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      background: ${({ darkMode }) => (darkMode ? '#24272B' : '#F3F4F9')};
      display: grid;
      justify-items: center;
      align-items: center;

      .avatar {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
      }

      svg {
        width: 3rem;
        height: 3rem;
      }
    }
  }

  .error {
    height: 100vh;
    display: grid;
    grid-template-rows: auto;
    justify-content: center;
    align-items: center;

    h1 {
      font-family: 'Poppins';
      text-align: center;
    }
  }
`;

const Video = () => {
  // const { darkMode, getVideo, incrementVideoViews, deleteVideo } = useContext(
  //   MainContext,
  // );
  const darkMode = true;
  const getVideo = async (id) => {
    try {
      const video = await firebase
        .firestore()
        .collection('videos')
        .doc(id)
        .get();
      return { ...video.data(), id: video.id };
    } catch (err) {
      throw err;
    }
  };
  const incrementVideoViews = async (video) => {
    try {
      await firebase
        .firestore()
        .collection('videos')
        .doc(video.id)
        .update({
          views: video.views + 1,
        });
    } catch (err) {
      throw err;
    }
  };
  const deleteVideo = async (id) => {
    try {
      const video = await firebase
        .firestore()
        .collection('videos')
        .doc(id)
        .get();
      if (video.thumbnail)
        await firebase.storage().ref(`thumbnails/${id}.png`).delete();
      if (video.source)
        await firebase.storage().ref(`videos/${id}.mp4`).delete();
      await firebase.firestore().collection('videos').doc(id).delete();
    } catch (err) {
      throw err;
    }
  };

  // const { user } = useContext(UserContext);
  const { currentUser } = useAuth();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState(null);
  const [error, setError] = useState('');
  const [alert, setAlert] = useState(null);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const video = await getVideo(id);
        setVideo(video);
        await incrementVideoViews(video);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError('Error occured loading video! Try again later');
      }
    })();
    // eslint-disable-next-line
  }, []);

  return !loading ? (
    <Container darkMode={darkMode}>
      {alert && <Alert type={alert.type} text={alert.text} />}
      {video && !error ? (
        <>
          <h1>Video</h1>
          <Player
            autoplay={false}
            controls={true}
            sources={[
              {
                src: video && video.source,
                type: 'video/mp4',
              },
            ]}
          />
          <div className="info">
            <div className="meta">
              <h1>{video && video.title}</h1>
              <h3>{video && video.description}</h3>
            </div>
            <div className="data">
              <div className="views">
                <img
                  src={viewEyeVisible}
                  width="35"
                  height="35"
                  alt="viewEyeVisible"
                />
                <p
                  style={{
                    color: 'black',
                    marginTop: '14px',
                    marginLeft: '5px',
                  }}
                >
                  {video && video.views}
                </p>
              </div>
              {/* {video && video.user.email === user?.email && ( */}
              {video && video.userEmail === currentUser.email && (
                <div className="settings">
                  <box
                    style={{
                      cursor: 'pointer',
                      width: '25px',
                      height: '35px',
                    }}
                    onClick={async () => {
                      try {
                        await deleteVideo(video.id);
                        history.push('/');
                      } catch (err) {
                        setAlert({
                          type: 'failure',
                          text: 'Error deleting video! Try again later',
                        });
                        setTimeout(() => setAlert(null), 5000);
                      }
                    }}
                  >
                    <img
                      src={deleteRemove}
                      width="35"
                      height="35"
                      alt="deleteRemove"
                    />
                  </box>
                </div>
              )}
            </div>
          </div>
          <div className="user">
            <div
              style={{
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                display: 'flex',
                justifyItems: 'center',
                alignItems: 'center',
              }}
            >
              {/* {video.user.photoURL ? ( */}
              <img src={accountLogo} width="35" height="35" alt="testA" />
              <h3 style={{ marginLeft: '15px' }}>{video && video.userEmail}</h3>
            </div>
          </div>
        </>
      ) : (
        <div className="error">
          <h1>{error}</h1>
        </div>
      )}
    </Container>
  ) : (
    <Loader />
  );
};

export default Video;
