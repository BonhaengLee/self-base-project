import React, { useEffect, useState } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Col, Container, ProgressBar, Row } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import './mypage.css';
import ReviewGrid from '../components/ReviewSystem/ReviewGrid';
import { firebase } from '../firebase';

export default function ReviewPage() {
  const { currentUser } = useAuth();
  const [subj_title, setSubj_title] = useState([]);

  const nowu = 50;
  const nows = 50;

  const progressInstanceU = (
    <ProgressBar
      variant={'YOU_PICK_A_NAME'}
      className="progress-custom"
      min={0}
      max={100}
      now={nowu}
      label={`${nowu}%`}
      style={{
        height: '32.5px',
      }}
    />
  );

  const progressInstanceS = (
    <ProgressBar
      variant={'YOU_PICK_A_NAME2'}
      className="progress-custom2"
      min={0}
      max={100}
      now={nows}
      label={`${nows}%`}
      style={{
        height: '32.5px',
      }}
    />
  );

  var ar = [];
  // var subj_title = [];

  const getVideos = async () => {
    try {
      ar.push(currentUser.email);
      const videosSnapshot = await firebase
        .firestore()
        .collection('videos')
        .orderBy('postedOn', 'desc')
        .where('userEmail', 'in', ar)
        .get();
      const videosPayload = [];
      videosSnapshot.forEach((video) =>
        videosPayload.push({
          ...video.data(),
          postedOn: video.data().postedOn.toDate(),
          id: video.id,
        }),
      );
      console.log(videosPayload);

      setSubj_title(videosPayload);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await getVideos();
      } catch (err) {}
    })();
  }, []);

  console.log(subj_title);

  return (
    <Container>
      <Container
        style={{ marginTop: '100px', width: '1000px' }} // 1150px
      >
        <Row>
          <Col xs="12">
            <Paper style={{ height: '280px' }}>
              <Container>
                <Row>
                  <Col xs="3">
                    <img
                      src={currentUser.photoURL}
                      height="150px"
                      width="150px"
                      alt="profileImage"
                      style={{
                        borderRadius: 10,
                        marginLeft: '50px',
                        marginTop: '20px',
                      }}
                    />
                  </Col>
                  <Col
                    xs="2"
                    style={{
                      lineHeight: '190px',
                      fontSize: '26px',
                      fontWeight: '700',
                    }}
                  >
                    {currentUser.displayName}
                  </Col>
                  <Col
                    xs="3"
                    style={{
                      marginLeft: '40px',
                      lineHeight: '190px',
                      fontSize: '21px',
                      fontWeight: '400',
                      color: '#81c784',
                    }}
                  >
                    <span>학생 이해도 : {nowu}%</span>
                  </Col>
                  <Col
                    xs="3"
                    style={{
                      lineHeight: '190px',
                      fontSize: '21px',
                      fontWeight: '400',
                      color: '#e57373',
                    }}
                  >
                    <span>학생 만족도 : {nows}%</span>
                  </Col>
                </Row>
              </Container>
              <Container>
                <Row>
                  <Col xs="12">{progressInstanceU}</Col>
                  <Col xs="12">{progressInstanceS}</Col>
                </Row>
              </Container>
            </Paper>
          </Col>
        </Row>
        <Link to="/update-profile">
          <Button
            variant="dark"
            disableElevation
            style={{ color: 'white', textDecoration: 'none' }}
          >
            프로필 편집
          </Button>
        </Link>
      </Container>

      <Container
        style={{ marginTop: '30px', width: '850px' }} // 1150px
      >
        <Row>
          <Col xs="12">
            <Grid style={{ height: '500px' }}>
              <div
                style={{
                  fontSize: '23px',
                  fontWeight: '700',
                  marginBottom: '20px',
                }}
              >
                강의 후기
              </div>
              <div>
                <ReviewGrid st={subj_title} />
              </div>
            </Grid>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
