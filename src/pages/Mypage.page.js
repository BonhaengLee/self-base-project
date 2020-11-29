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

export default function MypagePage() {
  return (
    <Container
      fluid="lg"
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '600px' }}
    >
      <div class="wrapper">
        <div class="box a" style={{ backgroundColor: 'rgba(252, 81, 133, 1)' }}>
          강의 자료 <ImportContactsIcon />
        </div>
        <div
          class="box b"
          style={{ backgroundColor: 'rgba(102, 197, 175, 1)' }}
        >
          강의 영상 <VideoLibraryIcon />
        </div>

        <div class="box d" style={{ backgroundColor: 'rgba(252, 81, 133, 1)' }}>
          <div class="box e" style={{ backgroundColor: '#ECEFF1' }}>
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
          <div class="box e2" style={{ backgroundColor: '#ECEFF1' }}>
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
        <div
          class="box d2"
          style={{ backgroundColor: 'rgba(102, 197, 175, 1)' }}
        >
          <div class="box e" style={{ backgroundColor: '#ECEFF1' }}>
            <Button
              component={Link}
              to={'/upload'}
              fullWidth
              style={{
                fontSize: '65%',
                color: 'gray',
                fontFamily: 'CookieRun Bold',
              }}
            >
              추가하기 <QueuePlayNextIcon style={{ marginLeft: '5px' }} />
            </Button>
          </div>
          <div
            class="box e2"
            style={{
              backgroundColor: '#ECEFF1',
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
                color: 'gray',
                fontFamily: 'CookieRun Bold',
              }}
            >
              목록 보기 <ListAltIcon style={{ marginLeft: '5px' }} />
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
