import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import styles from '../assets/App.module.css';
import { Layout, SideBar, SideNav } from '../layout/index';

const Login = lazy(() => import('./Login'));
const Register = lazy(() => import('./Register'));
const axios = require('axios');

const App = () => {
  const [page, setPage] = useState('');
  const [active, setActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    axios('/isLoggedIn')
      .then((response) => {
        if (response.data) {
          setIsLoggedIn(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios('/isAdmin')
      .then((response) => {
        if (response.data) {
          setIsAdmin(true);
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
      <Suspense fallback={<div>Loading...</div>}>
        <Layout>
          <div className={styles.sectionWrapperMain}>
            <div className={styles.sectionWrapperInner}>
              <Routes>
                <Route
                  path='/login'
                  element={isLoggedIn ? <Navigate to='/' replace /> : <Login />}
                />
                <Route
                  path='/register/:token'
                  element={<Register isAdmin={isAdmin} />}
                />
                <Route
                  path='/register/'
                  element={<Register isAdmin={isAdmin} />}
                />
                <Route
                  path='/'
                  element={
                    <>
                      <SideBar page={page} active={active} isAdmin={isAdmin} />
                      <SideNav
                        linkOnClick={linkOnClick}
                        page={page}
                        isAdmin={isAdmin}
                      />
                      {isLoggedIn && (
                        <div className={styles.logout}>
                          <a href='/logout' className='nav-link-custom'>
                            Logout
                          </a>
                        </div>
                      )}
                    </>
                  }
                />
              </Routes>
              {/* <IntroSection id="home">Jim Cooke</IntroSection> */}
            </div>
          </div>
        </Layout>
      </Suspense>
    </>
  );
};

export default App;
