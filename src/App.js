import React, { useState } from "react";
import MyPageTemplate from "./components/MyPageTemplate";
import Form from "./components/Form";
import MyPageItem from "./components/MyPageItem";
import MyPageItemList from "./components/MyPageItemList";
import Mp from "./components/Mp";

import { Route } from 'react-router-dom';
import { Home, MyPage, CreateCourse } from './pages/index';

function App() {
  return (    
    <div> 
        <Route exact path="/" component={Home}/>
        <Route path="/mypage" component={MyPage}/>
        <Route path="/createcourse" component={CreateCourse}/>
    </div>
  );
}

export default App;
