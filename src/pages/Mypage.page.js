import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReadAndSearchCourseMaterials from '../components/ReadAndSearchCourseMaterials';
import './mypage.css';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import { Link, NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import PostAddIcon from '@material-ui/icons/PostAdd';
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext';
import ListAltIcon from '@material-ui/icons/ListAlt';
import shadows from '@material-ui/core/styles/shadows';
import styled from 'styled-components';
import drawingImage from '../assets/drawing-pad.jpg';
import padImage from '../assets/pad.jpg';

export default function MypagePage() {
  return (
    <Container
      fluid="lg"
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '600px' }}
    >
      <div class="wrapper">
        <div
          class="box a"
          style={{ backgroundColor: 'white', fontWeight: '200' }}
        >
          강의 자료 <ImportContactsIcon />
        </div>
        <div class="box b" style={{ backgroundColor: 'white' }}>
          강의 영상 <VideoLibraryIcon />
        </div>

        <BOX>
          <div
            class="box d"
            // style={{ backgroundColor: 'rgba(252, 81, 133, 1)' }}
          >
            <div
              class="box e"
              style={{ backgroundColor: 'rgba(245,245,245, 0.6)' }}
            >
              <Button
                component={Link}
                to={'/add'}
                fullWidth
                style={{
                  fontSize: '65%',
                  color: 'gray',
                  fontFamily: 'CookieRun Bold',
                }}
              >
                추가하기 <PostAddIcon style={{ marginLeft: '5px' }} />
              </Button>
            </div>
            <div
              class="box es"
              style={{ backgroundColor: 'rgba(245,245,245, 0.6)' }}
            >
              <Button
                component={Link}
                to={'/my-read'}
                fullWidth
                style={{
                  fontSize: '65%',
                  color: 'gray',
                  fontFamily: 'CookieRun Bold',
                }}
              >
                내 자료
              </Button>
            </div>
            <div
              class="box e2"
              style={{ backgroundColor: 'rgba(245,245,245, 0.6)' }}
            >
              <Button
                component={Link}
                to={'/read'}
                fullWidth
                style={{
                  fontSize: '65%',
                  color: 'gray',
                  fontFamily: 'CookieRun Bold',
                }}
              >
                목록 보기 <ListAltIcon style={{ marginLeft: '5px' }} />
              </Button>
            </div>
          </div>
        </BOX>

        <BOX2>
          <div class="box d2" style={{ marginTop: '20px' }}>
            <div
              class="box e"
              style={{ backgroundColor: 'rgba(52, 52, 52, 0.6)' }}
            >
              <Button
                component={Link}
                to={'/upload'}
                fullWidth
                style={{
                  fontSize: '65%',
                  color: 'white',
                  fontFamily: 'CookieRun Bold',
                }}
              >
                추가하기 <QueuePlayNextIcon style={{ marginLeft: '5px' }} />
              </Button>
            </div>
            <div
              class="box es"
              style={{ backgroundColor: 'rgba(52, 52, 52, 0.6)' }}
            >
              <Button
                component={Link}
                to={'/my-landing'}
                fullWidth
                style={{
                  fontSize: '65%',
                  color: 'white',
                  fontFamily: 'CookieRun Bold',
                }}
              >
                내 영상
              </Button>
            </div>
            <div
              class="box e2"
              style={{
                backgroundColor: 'rgba(52, 52, 52, 0.6)',
                '&:hover': {
                  backgroundColor: '#C2185B',
                },
              }}
            >
              <Button
                component={Link}
                to={'/landing'}
                fullWidth
                style={{
                  fontSize: '65%',
                  color: 'white',
                  fontFamily: 'CookieRun Bold',
                }}
              >
                목록 보기 <ListAltIcon style={{ marginLeft: '5px' }} />
              </Button>
            </div>
          </div>
        </BOX2>
      </div>
    </Container>
  );
}

const BOX = styled.div`
  grid-column: col / span 2;
  grid-row: row 2;
  display: grid;
  grid-gap: 15px;
  width: '50%';
  height: '50%';
  /* grid-template-columns: 1fr 1fr; */
  background: url(${drawingImage});
  background-size: cover;
  font-family: 'CookieRun Bold';
`;

const BOX2 = styled.div`
  grid-column: col 3 / span 2;
  grid-row: row 2;
  /* display: grid; */
  /* grid-gap: 15px; */
  width: '90%';
  height: '90%';

  /* grid-template-columns: 1fr 1fr; */
  background: url(${padImage});
  background-size: cover;
  font-family: 'CookieRun Bold';
`;
