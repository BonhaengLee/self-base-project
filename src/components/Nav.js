import { CircularProgress } from '@material-ui/core';
import React, { Suspense, lazy } from 'react';
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import logo from '../images/edumeet_logo.PNG';

const UserIcon = lazy(() => import('../auth/UserIcon'));
const Logout = lazy(() => import('../auth/Logout'));

export default function Nav() {
  const { currentUser } = useAuth();
  const history = useHistory();
  const darkMode = true;

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-danger">
        <a href="/" className="navbar-brand">
          <img src={logo} width="115" height="35" alt="testA" />
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item mr-1">
            <Link to={'/mypage'} className="nav-link">
              마이페이지
            </Link>
          </li>
          <li className="nav-item mr-1">
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
            {/* <Link to={'/video/:id'} className="nav-link"> */}
            <Link to={'/landing'} className="nav-link">
              강의영상열람
            </Link>
          </li>
        </div>

        {currentUser ? (
          <nav className="navbar-nav ml-auto">
            <Suspense
              fallback={
                <div>
                  <CircularProgress />
                </div>
              }
            >
              <AuthProvider>
                <div className="nav-item">
                  <UserIcon />
                </div>
                <div className="nav-item">
                  <Logout />
                </div>
              </AuthProvider>
            </Suspense>
          </nav>
        ) : null}
      </nav>
    </div>
  );
}
