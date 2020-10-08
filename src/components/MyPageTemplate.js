import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

MyPageTemplate.propTypes = {};

function MyPageTemplate({ form, children }) {
  return (
    <MyPageTemp>
      <Title>마이 페이지</Title>
      <FormWrapper>{form}</FormWrapper>
      <ListsWrapper>{children}</ListsWrapper>
    </MyPageTemp>
  );
}

const MyPageTemp = styled.main`
    background: white;
    width: 512px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23); /* 그림자 */ 
    margin: 0 auto; /* 페이지 중앙 정렬 */
    margin-top: 4rem;
  `;

const Title = styled.div`
  padding: 2rem;
  font-size: 2.5rem;
  text-align: center;
  font-weight: 100;
  background: #F85270;
  color: white;
`;

const FormWrapper = styled.section`
  padding: 1rem;
  border-bottom: 1px solid #22b8cf;
`;

const ListsWrapper = styled.section`
  min-height: 5rem;
`;

export default MyPageTemplate;
