import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './auth/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import { CircularProgress } from '@material-ui/core';
import styled from 'styled-components';
import HomeImage from './images/black-and-white-bamboo-surface-merge-for-background_7182-2053.jpg';

const DashBoardPage = lazy(() => import('./pages/Dashboard.page'));
const UpdateProfilePage = lazy(() => import('./pages/UpdateProfile.page'));
const SignUpPage = lazy(() => import('./pages/Signup.page'));
const LoginPage = lazy(() => import('./pages/Login.page'));

const AddClass = lazy(() => import('./pages/AddClass'));
const AddTeacher = lazy(() => import('./pages/AddTeacher'));

const AddCourseMaterialsPage = lazy(() =>
  import('./pages/AddCourseMaterials.page'),
);
const ReadCourseMaterialsPage = lazy(() =>
  import('./pages/ReadCourseMaterials.page'),
);
const MypagePage = lazy(() => import('./pages/Mypage.page'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPassword.page'));

const Upload = lazy(() => import('./pages/videoSystem/Upload'));
const Video = lazy(() => import('./pages/videoSystem/Video'));
const Landing = lazy(() => import('./pages/videoSystem/Landing'));
const Nav = lazy(() => import('./components/Nav'));

function App() {
  return (
    <Container>
      <Suspense
        fallback={
          <>
            <CircularProgress
              style={{
                marginLeft: '750px',
                marginTop: '300px',
                height: '65px',
                width: '65px',
              }}
            />
          </>
        }
      >
        <Nav
          style={{ backgroundColor: 'white', fontFamily: 'CookieRun Bold' }}
        />
        <div>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={DashBoardPage} />
              <PrivateRoute
                path="/update-profile"
                component={UpdateProfilePage}
              />
              <Route path="/signup" component={SignUpPage} />
              <Route path="/login" component={LoginPage} />
              <PrivateRoute path="/mypage" component={MypagePage} />
              <Route path="/forgot-password" component={ForgotPasswordPage} />
              <PrivateRoute path="/add" component={AddCourseMaterialsPage} />
              <PrivateRoute path="/add-class" component={AddClass} />
              <PrivateRoute path="/add-teacher" component={AddTeacher} />
              <PrivateRoute path="/read" component={ReadCourseMaterialsPage} />
              <PrivateRoute path="/upload" component={Upload} />
              <PrivateRoute path="/video/:id" component={Video} />
              <PrivateRoute path="/landing" component={Landing} />
            </Switch>
          </AuthProvider>
        </div>
      </Suspense>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
      to right,
      rgba(20, 20, 20, 0.1) 10%,
      rgba(20, 20, 20, 0.25) 25%,
      rgba(20, 20, 20, 0.4) 50%,
      rgba(20, 20, 20, 0.6) 80%
    ),
    url(${HomeImage});
  background-size: cover;
  font-family: 'CookieRun Bold';
`;

export default App;
