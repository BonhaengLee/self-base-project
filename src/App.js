import React from "react";
import MyPageTemplate from "./components/MyPageTemplate";
import Form from "./components/Form";

function App() {
  return <MyPageTemplate form={<Form />}>템플릿 완성</MyPageTemplate>;
}

export default App;
