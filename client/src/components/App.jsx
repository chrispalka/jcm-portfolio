import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { GlobalStyle, Layout, SideBar, SideNav } from '../layout/index';
const Login = lazy(() => import('./Login'));
const axios = require('axios');

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios('/isLoggedIn')
      .then((response) => {
        if (response.data) {
          setIsLoggedIn(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const linkOnClick = (page) => {
    setActive(false);
    setTimeout(() => {
      setActive(true);
      setPage(page);
    }, 800);
  };

  useEffect(() => {
    setActive(true);
    setPage('projects');
  }, []);
  return (
    <>
      <GlobalStyle />
      <NameContainer>
        <span>JIM COOKE</span>
      </NameContainer>
      <SideNav linkOnClick={linkOnClick} page={page} />
      <Suspense fallback={<div>Loading...</div>}>
        <Layout>
          <SectionWrapperMain>
            <SectionWrapperInner>
              <Routes>
                <Route
                  path='/login'
                  element={isLoggedIn ? <Navigate to='/' replace /> : <Login />}
                />
                <Route
                  path='/'
                  element={<SideBar page={page} active={active} />}
                />
              </Routes>
              {/* <IntroSection id="home">Jim Cooke</IntroSection> */}
            </SectionWrapperInner>
          </SectionWrapperMain>
        </Layout>
      </Suspense>
    </>
  );
};

export default App;
