import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../contexts/MainContext';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Loader from '../../components/videoSystem/Loader';
import accountLogo from '../../images/accountLogo.png';
import viewEyeVisible from '../../images/view_eye_visible.png';
import { firebase } from '../../firebase';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import LocalPharmacyIcon from '@material-ui/icons/LocalPharmacy';
import FunctionsIcon from '@material-ui/icons/Functions';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { InputAdornment, Paper, SvgIcon, TextField } from '@material-ui/core';
import * as dateFns from 'date-fns';
import { useAuth } from 'contexts/AuthContext';

const Container = styled.div`
  width: 90%;
  margin: 3rem auto;

  h1 {
    /* font-family: 'Poppins'; */
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
  const [tch, setTch] = useState([]);
  const { currentUser } = useAuth();

  const fetchTeachers = async () => {
    setLoading(true);
    const req = await firebase
      .firestore()
      .collection('teachers')
      .where('accept', '==', true)
      .get();
    const tempTeachers = req.docs.map((teacher, i) => ({
      ...teacher.data(),
    }));
    setTch(tempTeachers, { email: currentUser.email });

    setLoading(false);
  };

  const getVideos = async () => {
    try {
      const videosSnapshot = await firebase
        .firestore()
        .collection('videos')
        .orderBy('postedOn', 'desc')
        .get();
      const videosPayload = [];
      videosSnapshot.forEach((video) =>
        videosPayload.push({
          ...video.data(),
          postedOn: video.data().postedOn.toDate(),
          id: video.id,
        }),
      );
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
        await fetchTeachers();
        setLoading(false);

        setLoading(true);
        await getVideos();
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line
  }, []);

  function subj(subj) {
    if (subj === '캡스톤디자인') {
      return (
        <>
          <ImportantDevicesIcon style={{ marginRight: '8px' }} />
          {'   '}
          {subj}
        </>
      );
    } else if (subj === '자기주도프로젝트') {
      return (
        <>
          <ImportantDevicesIcon style={{ marginRight: '8px' }} /> {'   '}
          {subj}
        </>
      );
    } else if (subj === '자기주도연구') {
      return (
        <>
          <ImportantDevicesIcon style={{ marginRight: '8px' }} /> {'   '}
          {subj}
        </>
      );
    } else if (subj === '수학1') {
      return (
        <>
          <FunctionsIcon style={{ marginRight: '8px' }} /> {'   '}
          {subj}
        </>
      );
    } else if (subj === '약품분자생물학') {
      return (
        <>
          <LocalPharmacyIcon style={{ marginRight: '8px' }} /> {'   '}
          {subj}
        </>
      );
    } else if (subj === '국제금융론') {
      return (
        <>
          <MonetizationOnIcon style={{ marginRight: '8px' }} /> {'   '}
          {subj}
        </>
      );
    } else {
    }
  }

  function timeForToday(value) {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60,
    );
    if (betweenTime < 1) return '방금 전';
    if (betweenTime < 60) {
      return `${betweenTime}분 전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간 전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일 전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년 전`;
  }

  const [searchKeyword, setSearchKeyword] = useState('');

  function handleFilterTextChange(e) {
    e.preventDefault();
    setSearchKeyword(e.target.value);
  }

  const filteredComponents = (data) => {
    data = data.filter((c) => {
      return c.title.indexOf(searchKeyword) > -1;
    });
    return data.map((c, index) => {
      return (
        <div className="video" key={c.id}>
          {c.live ? (
            <div
              className="thumbnail"
              onClick={() => history.push(`live/${c.id}`)}
            >
              <h2 className="live">LIVE</h2>
            </div>
          ) : (
            <div
              className="thumbnail"
              onClick={() => history.push(`video/${c.id}`)}
            >
              {c.thumbnail ? (
                <img alt="thumbnail" src={c.thumbnail} />
              ) : (
                <h2 className="no-thumbnail">No Thumbnail</h2>
              )}
            </div>
          )}
          <div className="info">
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
              <img
                src={accountLogo}
                width="20"
                height="20"
                alt="testA"
                style={{ marginTop: '15px' }}
              />
            </div>
            <div className="meta">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3
                  onClick={() =>
                    c.live
                      ? history.push(`live/${c.id}`)
                      : history.push(`c/${c.id}`)
                  }
                  style={{
                    fontSize: '21px',
                    marginLeft: '-45px',
                  }}
                >
                  {c.title}
                </h3>
                <div style={{ display: 'flex', marginRight: '5px' }}>
                  <h3 style={{ fontSize: '18px', color: 'black' }}>
                    {/* {dateFns.format(c.postedOn, 'yyyy-MM-dd HH:MM')} */}
                    {timeForToday(c.postedOn)}
                  </h3>
                </div>
              </div>
              <h3
                style={{
                  fontSize: '18px',
                  marginLeft: '-48px',
                  color: '#1A237E',
                }}
              >
                {subj(c.subject)}
              </h3>
              <h5 style={{ fontSize: '18px', marginLeft: '-9px' }}>
                {c.userEmail}
              </h5>
              <div className="views">
                <img
                  src={viewEyeVisible}
                  width="30"
                  height="30"
                  alt="viewEyeVisible"
                  style={{ marginLeft: '-51px', marginTop: '-13px' }}
                />
                <p
                  style={{
                    color: 'black',
                    fontSize: '18px',
                    marginLeft: '-14px',
                  }}
                >
                  {c.views}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  console.log(tch);

  return !loading ? (
    <Container darkMode={darkMode}>
      {videos && videos.length > 0 ? (
        <>
          <h1 style={{ marginTop: '-20px' }}>강의 영상</h1>

          <Paper style={{ marginTop: '30px', width: '200px' }}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon color="primary">
                      <path
                        fill="currentColor"
                        d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                      />
                    </SvgIcon>
                  </InputAdornment>
                ),
              }}
              onChange={handleFilterTextChange}
            />
          </Paper>

          <div className="videos">{videos && filteredComponents(videos)}</div>
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
