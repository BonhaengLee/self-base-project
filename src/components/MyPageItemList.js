import React from "react";
import PropTypes from "prop-types";

MyPageItemList.propTypes = {};

// MyPageItem 컴포넌트 여러개를 렌더링해주는 역할
// mypages: mypage의 객체들이 들어있는 배열
// onToggle: 체크박스를 키고 끄는 함수
// onRemove: 아이템을 삭제시키는 함수
function MyPageItemList(props) {
  const { mypages, onToggle, onRemove } = props;
  return <div></div>;
}

export default MyPageItemList;
