import React from "react";
import PropTypes from "prop-types";
import MyPageItem from "./MyPageItem";

MyPageItemList.propTypes = {};

// MyPageItem 컴포넌트 여러개를 렌더링해주는 역할
// mypages: mypage의 객체들이 들어있는 배열
// onToggle: 체크박스를 키고 끄는 함수
// onRemove: 아이템을 삭제시키는 함수
function MyPageItemList(props) {
  const {
    mypages,
    onToggle,
    onRemove,
  } = props;
  //   객체 배열을 컴포넌트 배열로 변환
  const mypageCourseList = mypages.map(({ id, text, checked }) => (
    <MyPageItem
      id={id}
      text={text}
      checked={checked}
      // (mypage) = > ( <MyPageItem {...mypage} ,,,/>)와 같다.
      onToggle={onToggle}
      onRemove={onRemove}
      key={id}
      // 배열을 렌더링할 때에는 key 값이 꼭 있어야 함. 없으면 map 함수의 두번째 param index(비권장)
    />
  ));

  // const mypagesCourseNoteList = mypagesCourseNote.map(
  //   ({ id, text, checked }) => (
  //     <MyPageItem
  //       id={id}
  //       text={text}
  //       checked={checked}
  //       // (mypage) = > ( <MyPageItem {...mypage} ,,,/>)와 같다.
  //       onToggle={onToggle}
  //       onRemove={onRemove}
  //       key={id}
  //       // 배열을 렌더링할 때에는 key 값이 꼭 있어야 함. 없으면 map 함수의 두번째 param index(비권장)
  //     />
  //   )
  // );

  // const mypagesProfileList = mypagesProfile.map(({ id, text, checked }) => (
  //   <MyPageItem
  //     id={id}
  //     text={text}
  //     checked={checked}
  //     // (mypage) = > ( <MyPageItem {...mypage} ,,,/>)와 같다.
  //     onToggle={onToggle}
  //     onRemove={onRemove}
  //     key={id}
  //     // 배열을 렌더링할 때에는 key 값이 꼭 있어야 함. 없으면 map 함수의 두번째 param index(비권장)
  //   />
  // ));

  // var list = null;
  // if (mypagesCourse) {
  //   list = { mypagesCourse };
  // } else if (mypagesCourseNote) {
  //   list = { mypagesCourseNote };
  // } else if (mypagesProfile) {
  //   list = { mypagesProfile };
  // }

  return <div>{mypageCourseList}</div>;
}

export default MyPageItemList;
