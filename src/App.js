import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './auth/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import { CircularProgress } from '@material-ui/core';

const DashBoardPage = lazy(() => import('./pages/Dashboard.page'));
const UpdateProfilePage = lazy(() => import('./pages/UpdateProfile.page'));
const SignUpPage = lazy(() => import('./pages/Signup.page'));
const LoginPage = lazy(() => import('./pages/Login.page'));
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
    <div style={{ flex: 1, flexDirection: 'flex-start' }}>
      <Suspense
        fallback={
          <div>
            <CircularProgress />
          </div>
        }
      >
        <Nav />
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
              <PrivateRoute path="/read" component={ReadCourseMaterialsPage} />
              <PrivateRoute path="/upload" component={Upload} />
              <PrivateRoute path="/video/:id" component={Video} />
              <PrivateRoute path="/landing" component={Landing} />
            </Switch>
          </AuthProvider>
        </div>
      </Suspense>
    </div>
  );
}

export default App;
