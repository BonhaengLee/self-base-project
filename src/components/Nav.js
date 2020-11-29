import { Button, makeStyles, Typography } from '@material-ui/core';
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

    '&:focus': {
      bordor: 0,
      outline: 0,
    },

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

  const [cl1, setCl1] = useState('white');
  const [cl2, setCl2] = useState('white');
  const [cl3, setCl3] = useState('white');

  function handleColor1() {
    setCl1('#C2185B');
    setCl2('white');
    setCl3('white');
  }

  function handleColor2() {
    setCl1('white');
    setCl2('#C2185B');
    setCl3('white');
  }

  function handleColor3() {
    setCl1('white');
    setCl2('white');
    setCl3('#C2185B');
  }

  return (
    <div style={{ marginTop: '5px' }}>
      <nav className="navbar navbar-expand navbar-dark ">
        <a href="/mypage" className="navbar-brand">
          <img src={logo} width="115" height="35" alt="testA" />
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item mr-2" style={{ marginTop: '-2px' }}>
            <Link to={'/mypage'} className="nav-link ">
              <Button
                onClick={handleColor1}
                style={{ color: cl1 }}
                className={classes.typo1}
              >
                Online-Courses
              </Button>
            </Link>
          </li>
          <li className="nav-item mr-2" style={{ marginTop: '-2px' }}>
            <Link to={'/add-teacher'} className="nav-link">
              <Button
                onClick={handleColor2}
                style={{ color: cl2 }}
                className={classes.typo1}
              >
                Teachers
              </Button>
            </Link>
          </li>
          <li className="nav-item mr-2" style={{ marginTop: '-2px' }}>
            <Link to={'/add-student'} className="nav-link">
              <Button
                onClick={handleColor3}
                style={{ color: cl3 }}
                className={classes.typo1}
              >
                Students
              </Button>
            </Link>
          </li>
        </div>

        {currentUser ? (
          <nav className="navbar-nav ml-auto" style={{ marginTop: '-9px' }}>
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
