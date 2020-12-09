import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './auth/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import styled from 'styled-components';
import HomeImage from './images/black-and-white-bamboo-surface-merge-for-background_7182-2053.jpg';

const UpdateProfilePage = lazy(() => import('./pages/UpdateProfile.page'));
const SignUpPage = lazy(() => import('./pages/Signup.page'));
const LoginPage = lazy(() => import('./pages/Login.page'));
const AddTeacher = lazy(() => import('./pages/AddTeacher'));
const AddStudent = lazy(() => import('./pages/AddStudent'));
const AddCourseMaterialsPage = lazy(() =>
  import('./pages/AddCourseMaterials.page'),
);
const ReadCourseMaterialsPage = lazy(() =>
  import('./pages/ReadCourseMaterials.page'),
);
const MyReadCourseMaterialsPage = lazy(() =>
  import('./pages/MyReadCourseMaterials.page'),
);
const MypagePage = lazy(() => import('./pages/Mypage.page'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPassword.page'));
const Upload = lazy(() => import('./pages/videoSystem/Upload'));
const Video = lazy(() => import('./pages/videoSystem/Video'));
const Landing = lazy(() => import('./pages/videoSystem/Landing'));
const MyLanding = lazy(() => import('./pages/videoSystem/MyLanding'));
const Nav = lazy(() => import('./components/Nav'));
const ReviewPage = lazy(() => import('./pages/Review.page'));
const writeReview = lazy(() => import('./components/ReviewSystem/Review'));

const Spinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  border: 3px solid ${'rgba(255, 255, 255, 0.3)'};
  border-top-color: ${'rgba(255, 255, 255, 1)'};
  animation: anim 0.7s infinite linear;

  @keyframes anim {
    to {
      transform: rotate(360deg);
    }
  }
`;

function App() {
  return (
    <Container>
      <Suspense fallback={<Spinner />}>
        <Nav
          style={{ backgroundColor: 'white', fontFamily: 'CookieRun Bold' }}
        />
        <div>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={MypagePage} />
              <PrivateRoute
                path="/update-profile"
                component={UpdateProfilePage}
              />
              <Route path="/signup" component={SignUpPage} />
              <Route path="/login" component={LoginPage} />
              <PrivateRoute path="/mypage" component={MypagePage} />
              <Route path="/forgot-password" component={ForgotPasswordPage} />
              <PrivateRoute path="/add" component={AddCourseMaterialsPage} />
              <PrivateRoute path="/add-teacher" component={AddTeacher} />
              <PrivateRoute path="/add-student" component={AddStudent} />
              <PrivateRoute path="/read" component={ReadCourseMaterialsPage} />
              <PrivateRoute
                path="/my-read"
                component={MyReadCourseMaterialsPage}
              />
              <PrivateRoute path="/upload" component={Upload} />
              <PrivateRoute path="/video/:id" component={Video} />
              <PrivateRoute path="/landing" component={Landing} />
              <PrivateRoute path="/my-landing" component={MyLanding} />
              <PrivateRoute path="/read-review" component={ReviewPage} />
              <PrivateRoute path="/write-review/:ID" component={writeReview} />
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
