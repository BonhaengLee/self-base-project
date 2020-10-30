import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

MyPageTemplate.propTypes = {};

function MyPageTemplate({ form, children}) {
  return (
    <MyPageTemp>
      <Title>
        {form}
      </Title>
      <ListsWrapper>{children}</ListsWrapper>
    </MyPageTemp>
  );
}

const MyPageTemp = styled.main`
  background: white;
  width: 1200px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); /* 그림자 */
  margin: 0 auto; /* 페이지 중앙 정렬 */
  margin-top: 1rem;
`;

const Title = styled.div`
  padding: 1rem;
  font-size: 1rem;
  text-align: left;
  font-weight: 100;
  background: #f85270;
  color: white;
`;

const FormWrapper = styled.section`
  padding: 1rem;
  border-bottom: 1px solid #f85270;
`;

const ListsWrapper = styled.section`
  min-height: 1rem;
`;

export default MyPageTemplate;
