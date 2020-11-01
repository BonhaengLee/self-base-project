import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './App.css';

import SignUpPage from './pages/Signup.page';
import DashBoardPage from './pages/Dashboard.page';
import LoginPage from './pages/Login.page';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import ForgotPasswordPage from './pages/ForgotPassword.page';
import UpdateProfilePage from './pages/UpdateProfile.page';
import MypagePage from './pages/Mypage.page';
import AddCourseMaterialsPage from './pages/AddCourseMaterials.page';
import ReadCourseMaterialsPage from './pages/ReadCourseMaterials.page';
import Logout from './components/Logout';

import logo from './components/images/edumeet_logo.PNG';
import UserIcon from './components/UserIcon';

function App() {
  return (
    <div style={{ height: '0px' }}>
      <nav className="navbar navbar-expand navbar-dark bg-danger">
        <a href="/" className="navbar-brand">
          <img src={logo} width="115" height="35" alt="testA" style={{}} />
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
        </div>
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
      </nav>

      <div className="container mt-1">
        {/* <h2>React Firebase Database CRUD</h2> */}
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={DashBoardPage} />
            <PrivateRoute
              path="/update-profile"
              component={UpdateProfilePage}
            />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/add" component={AddCourseMaterialsPage} />
            <Route path="/read" component={ReadCourseMaterialsPage} />
            <Route path="/mypage" component={MypagePage} />
            <Route path="/forgot-password" component={ForgotPasswordPage} />
          </Switch>
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;
