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
        <div class="box a" style={{ backgroundColor: '#E65100' }}>
          강의 자료 <ImportContactsIcon />
        </div>
        <div class="box b" style={{ backgroundColor: '#004D40' }}>
          강의 영상 <VideoLibraryIcon />
        </div>

        <div class="box d" style={{ backgroundColor: '#E65100' }}>
          <div class="box e" style={{ backgroundColor: '#ECEFF1' }}>
            <Button
              component={Link}
              to={'/add'}
              fullWidth
              style={{ fontSize: '65%', color: 'gray' }}
            >
              추가하기 <PostAddIcon />
            </Button>
          </div>
          <div class="box e2" style={{ backgroundColor: '#ECEFF1' }}>
            <Button
              component={Link}
              to={'/read'}
              fullWidth
              style={{ fontSize: '65%', color: 'gray' }}
            >
              목록 보기 <ListAltIcon />
            </Button>
          </div>
        </div>
        <div class="box d2" style={{ backgroundColor: '#004D40' }}>
          <div class="box e" style={{ backgroundColor: '#ECEFF1' }}>
            <Button
              component={Link}
              to={'/upload'}
              fullWidth
              style={{ fontSize: '65%', color: 'gray' }}
            >
              추가하기 <QueuePlayNextIcon />
            </Button>
          </div>
          <div class="box e2" style={{ backgroundColor: '#ECEFF1' }}>
            <Button
              component={Link}
              to={'/landing'}
              fullWidth
              style={{ fontSize: '65%', color: 'gray' }}
            >
              목록 보기 <ListAltIcon />
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
