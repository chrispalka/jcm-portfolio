import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { GlobalStyle, Layout, SideBar, SideNav } from '../layout/index';
const path = require('path');


const SectionWrapperInner = styled.div`
  margin-top: 0;
  margin-bottom: 0;
  margin: auto;
  height: 100vh;
  width: 90%;
`;

const SectionWrapperMain = styled.div`
  height: 100vh;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const NameContainer = styled.div`
  font-family: AkkuratLight !important;
  font-weight: 400;
  font-style: italic;
  font-size: 40px;
  top: 0;
  left: 0;
  text-transform: uppercase;
  position: absolute;
  z-index: 100;
`;

const App = () => {
  const [page, setPage] = useState('');
  const [active, setActive] = useState(false);
  const linkOnClick = (page) => {
    setActive(false);
    setTimeout(() => {
      setActive(true);
      setPage(page);
    }, 800);
  };

  useEffect(() => {
    console.log(path.join(__dirname, 'public'))
    setActive(true);
    setPage('projects');
  }, []);
  return (
    <>
      <GlobalStyle />
      <NameContainer>
        <span>JIM COOKE</span>
      </NameContainer>
      <SideBar page={page} active={active} />
      <Layout>
        <SideNav linkOnClick={linkOnClick} page={page} />
        <SectionWrapperMain>
          <SectionWrapperInner>
            {/* <IntroSection id="home">Jim Cooke</IntroSection> */}
          </SectionWrapperInner>
        </SectionWrapperMain>
      </Layout>
    </>
  );
};

export default App;
