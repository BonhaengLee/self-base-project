import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import MyPageTemplate from "./MyPageTemplate";

Mp.propTypes = {};

function Mp({ formC, formCn, formP, childC, childCn, childP }) {
  return (
    <div>
      <Area>
        <Header>마이 페이지</Header>

        <Item>
          <MyPageTemplate form={formC} children={childC} title={"내 강의"} />
        </Item>
        <Item>
          <MyPageTemplate
            form={formCn}
            children={childCn}
            title={"강의 노트"}
          />
        </Item>
        <Item>
          <MyPageTemplate
            form={formP}
            children={childP}
            title={"프로필 설정"}
          />
        </Item>
      </Area>
    </div>
  );
}

const Area = styled.ul`
  display: table;
  margin: 0;
  margin-bottom: 80px;
  padding: 0;
  table-layout: fixed;
  width: 100%;
  text-align: center;
`;

// const Li = styled.li`
//   display: table-cell;
//   list-style: none;
// `;

const Item = styled.li`
  text-align: center;
  line-height: 30px;
`;

const Header = styled.header`
  font-size: 36px;
  text-align: center;
  padding-top: 100px;
  padding-bottom: 100px;
`;

export default Mp;
