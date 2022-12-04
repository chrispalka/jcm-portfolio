import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProfileImg from '../assets/images/jcmprofile.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import useMediaQuery from '../hooks/useMediaQuery';
import Media from 'react-media';

const NavContainer = styled.div`
  display: flex;
  overflow: hidden;
  position: fixed;
  left: 0;
  top: 0;
  min-width: 10%;
  border-right: 1px solid #1f1f1f;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #44444c;
  -webkit-transition: all ease 0.5s;
  -moz-transition: all ease 0.5s;
  transition: all ease 0.5s;

  ${(props) =>
    props.isMobile &&
    `
 height: 8vh;
 width: 100vw;
`};

  ${(props) =>
    props.isDesktop &&
    `
    height: 100vh;
    width: 10%;
  `}
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
  position: fixed;
  text-transform: uppercase;
  ${(props) =>
    props.isDesktop &&
    `
    top: 0;
  `};
  a {
    white-space: nowrap;
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
    width: 100%;
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

const NavDrawerContainer = styled.div`
  position: absolute;
  left: 0;
  color: #d6d6d6;
  margin-left: 1.2em;
  .svg-inline--fa {
    height: 30px;
    width: 30px;
  }
  .svg-inline--fa:hover {
    cursor: pointer;
    color: #8c8c8c;
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
      color: #8c8c8c;
    }
  }
  span {
    -webkit-transition: all ease 0.5s;
    -moz-transition: all ease 0.5s;
    transition: all ease 0.5s;
    font-size: 20px;
    font-weight: 700;
    font-family: Gotham, arial;
    color: #d6d6d6;
    text-transform: uppercase;
  }
`;

const DrawerLinksContainer = styled.div`
  width: 100%;
  height: auto;
  left: 0;
  position: absolute;
  top: -23%;
  background-color: #222222;
  -webkit-transition: all ease 0.5s;
  -moz-transition: all ease 0.5s;
  transition: all ease 0.5s;
  ${(props) => props.drawerOpen};
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
  const [drawerClicked, setDrawerClicked] = useState(false);

  const handleActiveLink = (activeLink) => {
    setActiveLink(activeLink);
    setDrawerClicked(!drawerClicked);
  };

  const handleDrawerClicked = () => {
    setDrawerClicked(!drawerClicked);
  };

  return (
    <>
      <Media
        query='(max-width: 1208px)'
        render={() => (
          <DrawerLinksContainer
            drawerOpen={drawerClicked ? 'top: 8%;' : 'top: -23%;'}
          >
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
          </DrawerLinksContainer>
        )}
      />
      <NavContainer
        isDesktop={useMediaQuery('(min-width: 1208px)')}
        isMobile={useMediaQuery('(max-width: 1208px)')}
        drawerClicked={drawerClicked}
      >
        <Media
          query='(max-width: 1208px)'
          render={() => (
            <NavDrawerContainer>
              <FontAwesomeIcon icon={faBars} onClick={handleDrawerClicked} />
            </NavDrawerContainer>
          )}
        />

        <NameContainer isDesktop={useMediaQuery('(min-width: 1208px)')}>
          <a href={DOMAIN}>JIM COOKE</a>
          <Media
            query='(min-width: 1208px)'
            render={() => (
              <ImageContainer>
                <img src={ProfileImg} />
              </ImageContainer>
            )}
          />
        </NameContainer>
        <Media
          query='(min-width: 1208px)'
          render={() => (
            <>
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
            </>
          )}
        />
      </NavContainer>
    </>
  );
};

export default SideNav;
