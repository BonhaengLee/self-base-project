import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Col, Container, ProgressBar, Row } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import './mypage.css';
import ReviewGrid from '../components/ReviewSystem/ReviewGrid';

export default function ReviewPage() {
  const { currentUser } = useAuth();

  const now = 5;

  const progressInstance = (
    <ProgressBar
      variant={'YOU_PICK_A_NAME'}
      className="progress-custom"
      min={0}
      max={10}
      now={now}
      label={`${now}cm`}
      style={{
        height: '75px',
        fontColor: 'gray',
      }}
    />
  );

  return (
    <Container>
      <Container
        //   className="d-flex align-items-center justify-content-center"
        style={{ marginTop: '100px', width: '1000px' }} // 1150px
      >
        <Row>
          <Col xs="12">
            <Paper style={{ height: '280px' }}>
              <Container>
                <Row>
                  <Col xs="4">
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
                    xs="3"
                    style={{
                      lineHeight: '190px',
                      fontSize: '26px',
                      fontWeight: '700',
                    }}
                  >
                    {currentUser.displayName}
                  </Col>
                  <Col
                    xs="2"
                    style={{
                      marginLeft: '-30px',
                      lineHeight: '190px',
                      fontSize: '21px',
                      fontWeight: '400',
                      color: 'gray',
                      display: 'flex',
                    }}
                  >
                    <span>00</span>
                  </Col>
                  <Col
                    xs="3"
                    style={{
                      marginLeft: '20px',
                      lineHeight: '190px',
                      fontSize: '21px',
                      fontWeight: '400',
                      color: 'gray',
                    }}
                  >
                    <span>만족도</span>
                  </Col>
                </Row>
              </Container>
              <Container>
                <Row>
                  <Col xs="12">{progressInstance}</Col>
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
                <ReviewGrid />
              </div>
            </Grid>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
