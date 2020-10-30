import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import MyPageTemplate from "./MyPageTemplate";

MyPageItem.propTypes = {};

// text: todo 내용
// checked: 체크박스 상태
// id: todo 의 고유 아이디
// onToggle: 체크박스를 키고 끄는 함수
// onRemove: 아이템을 삭제시키는 함수
function MyPageItem(props) {
  const { text, checked, id, onToggle, onRemove } = props;
  console.log(id);

  return (
    <MyPageIt onClick={() => onToggle(id)}>
      <Remove
        onClick={(e) => {
          e.stopPropagation(); // onToggle이 실행되지 않도록 함
          onRemove(id);
        }}
      >
        &times;
      </Remove>
      <MyPageText checked={checked}>
        <div>{text}</div>
      </MyPageText>
      {checked && <CheckMark>✓</CheckMark>}
    </MyPageIt>
  );
}

const Remove = styled.div`
  margin-right: 1rem;
  color: #e64980;
  font-weight: 600;
  opacity: 0;
`;

const MyPageIt = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center; /* 세로 가운데 정렬 */
  cursor: pointer;
  transition: all 0.15s;
  user-select: none;
  text-align: left;

  height: 8px;

  &:hover {
    background: #e3fafc;
    /* todo-item 에 마우스가 있을때만 .remove 보이기 */
    ${Remove} {
      opacity: 1;
    }
  }

  /* todo-item 사이에 윗 테두리 */
  & + & {
    border-top: 1px solid #f1f3f5;
  }
`;

const MyPageText = styled.div`
  flex: 1; /* 체크, 엑스를 제외한 공간 다 채우기 */
  word-break: break-all;

  ${(props) =>
    props.checked &&
    `
  text-decoration: line-through;
  color: #adb5bd;
  `}
`;

const CheckMark = styled.div`
  font-size: 1rem;
  line-height: 1rem;
  margin-left: 1rem;
  color: #3bc9db;
  font-weight: 800;
`;

export default MyPageItem;
