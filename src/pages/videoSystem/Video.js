import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Player, ControlBar } from 'video-react';
import Loader from '../../components/videoSystem/Loader';
import Alert from '../../components/videoSystem/Alert';
import * as dateFns from 'date-fns';
import CreateIcon from '@material-ui/icons/Create';
import { firebase } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import accountLogo from '../../images/accountLogo.png';
import deleteRemove from '../../images/delete_remove.png';
import viewEyeVisible from '../../images/view_eye_visible.png';
import ReplayControl from 'video-react/lib/components/control-bar/ReplayControl';
import CurrentTimeDisplay from 'video-react/lib/components/time-controls/CurrentTimeDisplay';
import TimeDivider from 'video-react/lib/components/time-controls/TimeDivider';
import PlaybackRateMenuButton from 'video-react/lib/components/control-bar/PlaybackRateMenuButton';
import VolumeMenuButton from 'video-react/lib/components/control-bar/VolumeMenuButton';
import ForwardControl from 'video-react/lib/components/control-bar/ForwardControl';
import Authorized from 'layouts/Authorized';
import { Button } from 'react-bootstrap';

const Container = styled.div`
  width: 90%;
  margin: 2rem auto;
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
    margin-top: -10px;

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

const Eraser = styled.div`
  height: 40px;
  width: 120px;
  margin-left: 5px;
  background-color: green;
  cursor: pointer;
  position: relative;
  background-color: #ff4a4a;
  padding: 5px 10px;
  font-size: 18px;
  outline: none;
  color: white;
  border-radius: 5px;
  &:hover {
    background-color: #fff;
    box-shadow: 0px 15px 20px rgba(66, 66, 66, 0.4);
    color: #757575;
    transform: translateY(-3px);
  }
`;

const Video = () => {
  const darkMode = true;
  const getVideo = async (id) => {
    try {
      const video = await firebase
        .firestore()
        .collection('videos')
        .doc(id)
        .get();
      return {
        ...video.data(),
        postedOn: video.data().postedOn.toDate(),
        id: video.id,
      };
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

  function hist(ID) {
    history.push('/write-review/' + ID);
  }

  const appKeyPress = async (e) => {
    try {
      hist(video.vId);
      // history.push("/chat/" + chatID);
    } catch (error) {
      console.log(error.message);
      console.log('error');
      setError(error.message);
    }
  };

  console.log(currentUser.email);

  return !loading ? (
    <Container darkMode={darkMode} style={{ marginTop: '70px' }}>
      {alert && <Alert type={alert.type} text={alert.text} />}
      {video && !error ? (
        <>
          {/* <h1>{video && video.title}</h1> */}
          <Player
            src={video && video.source}
            type={'video/mp4'}
            fluid={false}
            height={720}
            width={'100%'}
          >
            <ControlBar>
              <ReplayControl seconds={10} order={1.1} />
              <ForwardControl seconds={10} order={1.2} />
              <CurrentTimeDisplay order={4.1} />
              <TimeDivider order={4.2} />
              <PlaybackRateMenuButton
                rates={[2, 1.75, 1.5, 1.25, 1.0, 0.5]}
                order={7.1}
              />
              <VolumeMenuButton disabled />
            </ControlBar>
          </Player>
          <div className="info">
            <div className="meta">
              <h2 style={{ display: 'flex' }}>
                {video && video.title}
                {video && video.userEmail !== currentUser.email && (
                  <Button
                    variant="dark"
                    className="text-center ml-2 mr-1 mb-1 bg-transprant rounded"
                    onClick={appKeyPress}
                    style={{ fontWeight: '700', width: '20px !important' }}
                  >
                    후기 작성
                    <CreateIcon style={{ marginLeft: '5px' }} />
                  </Button>
                )}
              </h2>

              <div>
                <h3 style={{ fontSize: '18px', color: 'black', opacity: 0.6 }}>
                  {video.username}({video.userEmail}){' | '}
                  {dateFns.format(video.postedOn, 'yyyy-MM-dd HH:MM')}
                </h3>
              </div>
              <h3>{video && video.description}</h3>
            </div>
            <div className="data" style={{ marginTop: '-15px' }}>
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
                      style={{ marginTop: '-20px' }}
                    />
                  </box>
                </div>
              )}
            </div>
          </div>

          <div>
            <Authorized videoId={video.id} vUser={video.userEmail} />
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
