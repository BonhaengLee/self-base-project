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
          <MyPageTemplate form={formC} children={childC}/>
        </Item>
        <Item>
          <MyPageTemplate
            form={formCn}
            children={childCn}
          />
        </Item>
        <Item>
          <MyPageTemplate
            form={formP}
            children={childP}
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
  font-weight: 900;
  text-align: center;
  padding-top: 100px;
  padding-bottom: 100px;
`;

export default Mp;
