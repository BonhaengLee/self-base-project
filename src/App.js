import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './App.css';

import SignupPage from './pages/Signup.page';
import DashBoardPage from './pages/Dashboard.page';
import LoginPage from './pages/Login.page';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import ForgotPasswordPage from './pages/ForgotPassword.page';
import UpdateProfilePage from './pages/UpdateProfile.page';
import MypagePage from './pages/Mypage.page';
import AddcoursePage from './pages/AddCourse.page';
import Logout from './components/Logout';

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-danger">
        <a href="/" className="navbar-brand">
          Edu meet
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={'/mypage'} className="nav-link">
              마이페이지
            </Link>
          </li>
          <li className="nav-item">
            <Link to={'/add'} className="nav-link">
              강의 등록
            </Link>
          </li>
        </div>
        <div className="navbar-nav ml-auto mb-2">
          <AuthProvider>
            <li className="nav-item">
              <Logout />
            </li>
          </AuthProvider>
        </div>
      </nav>

      <div className="container mt-3">
        {/* <h2>React Firebase Database CRUD</h2> */}
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={DashBoardPage} />
            <PrivateRoute
              path="/update-profile"
              component={UpdateProfilePage}
            />
            <Route path="/signup" component={SignupPage} />
            <Route path="/login" component={LoginPage} />
            {/* <Route path="/logout" /> */}
            <Route path="/add" component={AddcoursePage} />
            <Route path="/mypage" component={MypagePage} />
            <Route path="/forgot-password" component={ForgotPasswordPage} />
          </Switch>
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;
