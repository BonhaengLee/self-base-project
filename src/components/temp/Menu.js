import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Menu = () => {
  const activeStyle = {
    color: 'green',
    fontSize: '1.5rem',
  };

  return (
    <div>
      <Ul>
        <Li>
          <NavLink exact to="/" activeStyle={activeStyle}>
            Home
          </NavLink>
        </Li>
        <Li>
          <NavLink exact to="/mypage" activeStyle={activeStyle}>
            마이 페이지
          </NavLink>
        </Li>
        {/* 개발 편의상 임시 사용 */}
        <Li>
          <NavLink to="/createcourse" activeStyle={activeStyle}>
            Create Course
          </NavLink>
        </Li>
        <Li>
          <NavLink to="/admin" activeStyle={activeStyle}>
            Dash board
          </NavLink>
        </Li>
      </Ul>
      <hr />
    </div>
  );
};

const Ul = styled.ul`
  display: flex;
`;

const Li = styled.li`
  margin: 20px 20px 20px;
`;

export default Menu;
