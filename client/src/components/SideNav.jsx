import React, { useState } from 'react';
import styled from 'styled-components';
import ProfileImg from '../assets/images/jcmprofile.jpeg';

const NavContainer = styled.div`
  height: 100vh;
  display: flex;
  overflow: hidden;
  position: fixed;
  left: 0%;
  top: 0;
  width: 10%;
  min-width: 10%;
  border-right: 1px solid #1f1f1f;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #44444c;
`;
const LinkContainer = styled.div`
  width: 100%;
`;

const NameContainer = styled.div`
  font-family: Gotham, arial;
  text-align: center;
  font-weight: 700;
  font-size: 20px;
  padding: 10px;
  top: 0;
  position: fixed;
  text-transform: uppercase;
  a {
    color: #d6d6d6;
    text-decoration: none;
    :hover {
      color: #8c8c8c;
    }
  }
`;

const ImageContainer = styled.div`
  margin-top: 1em;
  img {
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
    width: 200px;
    border-radius: 50%;
    cursor: pointer;
    :hover {
      -webkit-filter: grayscale(0%);
      filter: grayscale(0%);
    }
    -webkit-transition: all ease 0.5s;
    -moz-transition: all ease 0.5s;
    transition: all ease 0.5s;
  }
`;

const LinkWrapper = styled.div`
    border-bottom: 0.5px solid gray;
    :last-child {
        border: none;
    }
    text-align: center;
    padding: 1rem 0;
    width: 100%;
    cursor: pointer;
    :hover {
        span {
            color: #8C8C8C;
        }
    }
    }
    span {
        -webkit-transition: all ease 0.5s;
        -moz-transition: all ease 0.5s;
        transition: all ease 0.5s;
        font-size: 20px;
        font-weight: 700;
        font-family: Gotham, arial;
        color: #D6D6D6;
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
      <NameContainer>
        <a href={DOMAIN}>JIM COOKE</a>
        <ImageContainer>
          <img src={ProfileImg} />
        </ImageContainer>
      </NameContainer>
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
