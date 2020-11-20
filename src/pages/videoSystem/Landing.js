import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../contexts/MainContext';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Loader from '../../components/videoSystem/Loader';
import accountLogo from '../../images/accountLogo.png';
import viewEyeVisible from '../../images/view_eye_visible.png';
import firebase from '../../firebase';

const Container = styled.div`
  width: 90%;
  margin: 3rem auto;

  h1 {
    font-family: 'Poppins';
    font-size: 40;
  }

  .videos {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    justify-content: center;
    align-items: center;
    grid-gap: 2rem;

    .video {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr;
      justify-content: center;
      align-items: center;
      row-gap: 0.5rem;
      margin-left: -10;

      .thumbnail {
        height: 0;
        overflow: hidden;
        padding-top: calc(591.44 / 1127.34 * 100%);
        position: relative;

        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .live {
          position: absolute;
          display: grid;
          justify-content: center;
          align-items: center;
          border: 1px solid #ff4a4a;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          font-size: 2.5rem;
          color: #ff4a4a;
          text-align: center;
        }

        .no-thumbnail {
          position: absolute;
          display: grid;
          justify-content: center;
          align-items: center;
          border: 1px solid
            ${({ darkMode }) => (darkMode ? '#FFFFFF' : '#07070A')};
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          font-size: 2.5rem;
          color: ${({ darkMode }) => (darkMode ? '#FFFFFF' : '#07070A')};
          text-align: center;
        }
      }

      .info {
        display: grid;
        grid-template-columns: auto 1fr;
        justify-content: center;
        align-items: center;
        column-gap: 1rem;

        .profile {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          background: ${({ darkMode }) => (darkMode ? '#24272B' : '#F3F4F9')};
          display: grid;
          justify-items: center;
          align-items: center;

          .avatar {
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 50%;
          }

          svg {
            width: 1.25rem;
            height: 1.25rem;
          }
        }

        .meta {
          display: grid;
          grid-template-columns: 1fr;
          justify-content: center;
          align-items: center;
          row-gap: 0.1rem;

          h3 {
            cursor: pointer;
          }

          .views {
            color: #ffffff;
            display: grid;
            grid-template-columns: repeat(2, auto);
            justify-content: flex-start;
            align-items: center;
            column-gap: 0.5rem;

            .eye {
              width: 1rem;
              height: 1rem;
            }

            p {
              color: ${({ darkMode }) => (darkMode ? '#FFFFFF' : '#07070A')};
            }
          }
        }
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

var videos = [];

const Landing = () => {
  // const { videos, getVideos, darkMode } = useContext(MainContext);
  // const [videos, setVideos] = useState([]);

  const getVideos = async () => {
    try {
      const videosSnapshot = await firebase
        .firestore()
        .collection('videos')
        .orderBy('postedOn', 'desc')
        .get();
      const videosPayload = [];
      videosSnapshot.forEach((video) =>
        videosPayload.push({ ...video.data(), id: video.id }),
      );
      // dispatch({ type: GET_VIDEOS, payload: videosPayload });
      console.log('vP', videosPayload);

      videos = videosPayload;
      console.log('vi', videos);
    } catch (err) {
      throw err;
    }
  };
  const darkMode = true;

  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await getVideos();
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line
  }, []);

  return !loading ? (
    <Container darkMode={darkMode}>
      {videos && videos.length > 0 ? (
        <>
          <h1>강의 영상</h1>
          <div className="videos">
            {videos.map((video) => (
              <div className="video" key={video.id}>
                {video.live ? (
                  <div
                    className="thumbnail"
                    onClick={() => history.push(`live/${video.id}`)}
                  >
                    <h2 className="live">LIVE</h2>
                  </div>
                ) : (
                  <div
                    className="thumbnail"
                    onClick={() => history.push(`video/${video.id}`)}
                  >
                    {video.thumbnail ? (
                      <img alt="thumbnail" src={video.thumbnail} />
                    ) : (
                      <h2 className="no-thumbnail">No Thumbnail</h2>
                    )}
                  </div>
                )}
                <div className="info">
                  {/* <div className="profile"> */}
                  <div
                    style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: '50%',
                      display: 'grid',
                      justifyItems: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {/* {video.user.photoURL ? ( */}
                    <img
                      src={accountLogo}
                      width="35"
                      height="35"
                      alt="testA"
                      style={{ marginTop: '-10px' }}
                    />
                  </div>
                  <div className="meta">
                    <h3
                      onClick={() =>
                        video.live
                          ? history.push(`live/${video.id}`)
                          : history.push(`video/${video.id}`)
                      }
                    >
                      {video.title}
                    </h3>
                    <h5>{video.userEmail}</h5>
                    <div className="views">
                      <img
                        src={viewEyeVisible}
                        width="35"
                        height="35"
                        alt="viewEyeVisible"
                        style={{ marginLeft: '-53px' }}
                      />
                      <p style={{ color: 'black', marginTop: '10px' }}>
                        {video.views}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="error">
          <h1>No Videos Found</h1>
        </div>
      )}
    </Container>
  ) : (
    <Loader />
  );
};

export default Landing;
