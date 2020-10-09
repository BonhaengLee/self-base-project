import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

Form.propTypes = {};

// value: 인풋의 내용
// onCreate: 버튼이 클릭 될 때 실행 될 함수
// onChange: 인풋 내용이 변경 될 때 실행되는 함수
// onKeyPress: 인풋에서 키를 입력 할 때 실행되는 함수.
// 이 함수는 나중에 Enter 가 눌렸을 때 onCreate를 한 것과 동일한 작업을 하기 위해서 사용합니다.

function Form({ title, value, onChange, onCreate, onKeyPress }) {
  return (
    <Fm>
      {/* <FormInput value={value} onChange={onChange} onKeyPress={onKeyPress} /> */}
      <Title>{title}</Title>
      <CreateButton onClick={onCreate}>추가</CreateButton>
    </Fm>
  );
}

const Fm = styled.div`
  display: flex;
`;

const Title = styled.div`
  font-weight: 900;
  text-align: center;
  font-size: 20px;
  padding: 5px 5px 5px 5px;
`;

const FormInput = styled.input`
  flex: 1; /* 버튼을 뺀 빈 공간을 모두 채워줍니다 */
  font-size: 1rem;
  outline: none;
  border: none;
  border-bottom: 1px solid #f85270;
`;

const CreateButton = styled.div`
  font-size: 100px
  text-align : center;
  margin-left: 1rem;
  margin-top: 7px;
  padding: 0px 10px 0px 7px;
  background: white;
  border-radius: 3px;
  color: #f85270;
  font-weight: 900;
  cursor: pointer;
  height: 25px;
  line-height: 25px;

  

  &:hover {
    /* 마우스 클릭 전 커서를 갖다댄 오버 상태 */
    color: white;
    background: #3bc9db;
  }
`;

export default Form;
