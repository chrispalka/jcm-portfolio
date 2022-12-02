import React, { useState } from 'react';
import styled from 'styled-components';

const NavContainer = styled.div`
  height: 100vh;
  display: flex;
  overflow: hidden;
  position: fixed;
  left: 20%;
  top: 0;
  width: 5%;
  min-width: 5%;
  border-right: 1px solid #1f1f1f;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #222222;
`;
const LinkContainer = styled.div`
  width: 100%;
`;

const LinkWrapper = styled.div`
    border-bottom: 1px solid #1f1f1f;
    :last-child {
        border: none;
    }
    text-align: center;
    padding: 1rem 0;
    width: 100%;
    cursor: pointer;
    :hover {
        span {
            color: #3772ff;
        }
    }
    }
    span {
        -webkit-transition: all ease 0.5s;
        -moz-transition: all ease 0.5s;
        transition: all ease 0.5s;
        font-size: 0.7vw;
        font-weight: 700;
        font-family: Gotham, arial;
        color: #fff;
        text-transform: uppercase;
    }
`;

const navLinks = [
  {
    name: 'projects',
  },
  {
    name: 'about',
  },
  {
    name: 'contact',
  },
];
const SideNav = ({ linkOnClick, isAdmin }) => {
  const [activeLink, setActiveLink] = useState('projects');

  const handleActiveLink = (activeLink) => {
    setActiveLink(activeLink);
  };
  return (
    <NavContainer>
      {navLinks.map((link, i) => (
        <LinkWrapper
          key={i}
          onClick={() => {
            linkOnClick(link.name);
            handleActiveLink(link.name);
          }}
          className={activeLink === link.name && 'active-link'}
        >
          <LinkContainer>
            <span>{link.name}</span>
          </LinkContainer>
        </LinkWrapper>
      ))}
      {isAdmin && (
        <LinkWrapper
          onClick={() => {
            linkOnClick('admin');
            handleActiveLink('admin');
          }}
          className={activeLink === 'admin' && 'active-link'}
        >
          <LinkContainer>
            <span>ADMIN</span>
          </LinkContainer>
        </LinkWrapper>
      )}
    </NavContainer>
  );
};

export default SideNav;
