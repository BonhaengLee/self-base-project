import { makeStyles, Typography } from '@material-ui/core';
import React, { Suspense, lazy, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import logo from '../images/edumeet_logo.PNG';

const UserIcon = lazy(() => import('../auth/UserIcon'));
const Logout = lazy(() => import('../auth/Logout'));

const useStyles = makeStyles((theme) => ({
  typo1: {
    color: 'white',
    fontWeight: '400',
    fontSize: '20px',
    fontFamily: 'CookieRun Bold',
    '&:hover': {
      color: '#C2185B',
    },
  },
  contents: {
    color: 'black',
  },
}));

export default function Nav() {
  const classes = useStyles();
  const [openM, setOpenM] = useState(false);
  const [openV, setOpenV] = useState(false);
  const anchorRefM = useRef(null);
  const anchorRefV = useRef(null);
  const { currentUser } = useAuth();

  const handleToggleM = () => {
    setOpenM((prevOpenM) => !prevOpenM);
  };

  const handleToggleV = () => {
    setOpenV((prevOpenV) => !prevOpenV);
  };

  const handleCloseM = (event) => {
    if (anchorRefM.current && anchorRefM.current.contains(event.target)) {
      return;
    }

    setOpenM(false);
  };

  const handleCloseV = (event) => {
    if (anchorRefV.current && anchorRefV.current.contains(event.target)) {
      return;
    }

    setOpenV(false);
  };

  function handleListKeyDownM(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenM(false);
    }
  }

  function handleListKeyDownV(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenV(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpenM = useRef(openM);
  const prevOpenV = useRef(openV);
  useEffect(() => {
    if (prevOpenM.current === true && openM === false) {
      anchorRefM.current.focus();
    }
    if (
      !(prevOpenM.current === true && openM === false) &&
      prevOpenV.current === true &&
      openV === false
    ) {
      anchorRefV.current.focus();
    }

    prevOpenM.current = openM;
    prevOpenV.current = openV;
  }, [openM, openV]);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark ">
        <a href="/mypage" className="navbar-brand">
          <img src={logo} width="115" height="35" alt="testA" />
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item mr-2" style={{ marginTop: '-2px' }}>
            <Link to={'/mypage'} className="nav-link">
              <Typography className={classes.typo1}>MyPage</Typography>
            </Link>
          </li>
          {/* <li className="nav-item mr-1" style={{ marginTop: '-2px' }}>
            <Link to={'/add-class'} className="nav-link">
              <Typography className={classes.typo1}>강의 추가</Typography>
            </Link>
          </li> */}
          <li className="nav-item mr-2" style={{ marginTop: '-2px' }}>
            <Link to={'/add-teacher'} className="nav-link">
              <Typography className={classes.typo1}>Teachers</Typography>
            </Link>
          </li>
          <li className="nav-item mr-2" style={{ marginTop: '-2px' }}>
            <Link to={'/add-teacher'} className="nav-link">
              <Typography className={classes.typo1}>Students</Typography>
            </Link>
          </li>
        </div>

        {currentUser ? (
          <nav className="navbar-nav ml-auto">
            <AuthProvider>
              <div className="nav-item">
                <UserIcon />
              </div>
              <div className="nav-item">
                <Logout />
              </div>
            </AuthProvider>
          </nav>
        ) : null}
      </nav>
    </div>
  );
}
