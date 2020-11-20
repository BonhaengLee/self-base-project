import {
  Button,
  CircularProgress,
  Popper,
  Grow,
  Paper,
  MenuItem,
  MenuList,
  ClickAwayListener,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { Suspense, lazy, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import logo from '../images/edumeet_logo.PNG';

const UserIcon = lazy(() => import('../auth/UserIcon'));
const Logout = lazy(() => import('../auth/Logout'));

const useStyles = makeStyles((theme) => ({
  // root: {
  //   display: 'flex',
  // },
  // paper: {
  //   marginRight: theme.spacing(2),
  // },
  typo1: {
    color: 'white',
    fontWeight: '100',
  },
  typo2: { color: 'white', fontWeight: '100' },
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
      <nav className="navbar navbar-expand navbar-dark bg-danger">
        <a href="/" className="navbar-brand">
          <img src={logo} width="115" height="35" alt="testA" />
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item mr-1" style={{ marginTop: '-2px' }}>
            <Link to={'/mypage'} className="nav-link">
              <Typography className={classes.typo1}>마이페이지</Typography>
            </Link>
          </li>
          {/* <li className="nav-item mr-1">
            <Link to={'/add'} className="nav-link">
              강의자료등록
            </Link>
          </li>
          <li className="nav-item mr-1">
            <Link to={'/read'} className="nav-link">
              강의자료열람
            </Link>
          </li>
          <li className="nav-item mr-1">
            <Link to={'/upload'} className="nav-link">
              강의영상등록
            </Link>
          </li>
          <li className="nav-item mr-1">
            <Link to={'/landing'} className="nav-link">
              강의영상열람
            </Link>
          </li> */}

          <li className="nav-item mr-1">
            <Button
              ref={anchorRefM}
              aria-controls={openM ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggleM}
            >
              <Typography className={classes.typo1}>강의 자료</Typography>
            </Button>
            <Popper
              open={openM}
              anchorEl={anchorRefM.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom' ? 'center top' : 'center bottom',
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleCloseM}>
                      <MenuList
                        autoFocusItem={openM}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDownM}
                      >
                        <Link
                          to={'/add'}
                          className="nav-link"
                          className={classes.contents}
                        >
                          <MenuItem onClick={handleCloseM}>등록하기</MenuItem>
                        </Link>

                        <Link
                          to={'/read'}
                          className="nav-link"
                          className={classes.contents}
                        >
                          <MenuItem onClick={handleCloseM}>목록</MenuItem>
                        </Link>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </li>

          <li className="nav-item mr-1">
            <Button
              ref={anchorRefV}
              aria-controls={openV ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggleV}
            >
              <Typography className={classes.typo2}>강의 영상</Typography>
            </Button>
            <Popper
              open={openV}
              anchorEl={anchorRefV.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom' ? 'center top' : 'center bottom',
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleCloseV}>
                      <MenuList
                        autoFocusItem={openV}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDownV}
                      >
                        <Link
                          to={'/upload'}
                          className="nav-link"
                          className={classes.contents}
                        >
                          <MenuItem onClick={handleCloseV}>등록하기</MenuItem>
                        </Link>
                        <Link
                          to={'/landing'}
                          className="nav-link"
                          className={classes.contents}
                        >
                          <MenuItem onClick={handleCloseV}>목록</MenuItem>
                        </Link>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
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
