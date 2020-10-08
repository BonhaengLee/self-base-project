import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

Form.propTypes = {};

// value: 인풋의 내용
// onCreate: 버튼이 클릭 될 때 실행 될 함수
// onChange: 인풋 내용이 변경 될 때 실행되는 함수
// onKeyPress: 인풋에서 키를 입력 할 때 실행되는 함수.
// 이 함수는 나중에 Enter 가 눌렸을 때 onCreate를 한 것과 동일한 작업을 하기 위해서 사용합니다.

function Form({ value, onChange, onCreate, onKeyPress }) {
  return (
    <Fm>
      <FormInput value={value} onChange={onChange} onKeyPress={onKeyPress} />
      <CreateButton onClick={onCreate}>추가</CreateButton>
    </Fm>
  );
}

const Fm = styled.div`
  display: flex;
`;

const FormInput = styled.input`
  flex: 1; /* 버튼을 뺀 빈 공간을 모두 채워줍니다 */
  font-size: 1rem;
  outline: none;
  border: none;
  border-bottom: 1px solid #f85270;
`;

const CreateButton = styled.div`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-left: 1rem;
  background: #f85270;
  border-radius: 3px;
  color: white;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    /* 마우스 클릭 전 커서를 갖다댄 오버 상태 */
    background: #3bc9db;
  }
`;

export default Form;
