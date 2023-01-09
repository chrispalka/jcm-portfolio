import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import styles from '../assets/App.module.css';
import { Layout, SideBar, SideNav } from '../layout/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Login = lazy(() => import('./Login'));
const Register = lazy(() => import('./Register'));
const axios = require('axios');

const App = () => {
  const [page, setPage] = useState('');
  const [active, setActive] = useState(false);
  const [isHover, setIsHover] = useState(false);
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

  const handleHover = (isHover) => {
    if (isHover) {
      setIsHover(true);
    } else {
      setIsHover(false);
    }
    console.log(isHover);
  };
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Layout>
          <Routes>
            <Route
              path='/login'
              element={isLoggedIn ? <Navigate to='/' replace /> : <Login />}
            />
            <Route
              path='/register/:token'
              element={<Register isAdmin={isAdmin} />}
            />
            <Route path='/register/' element={<Register isAdmin={isAdmin} />} />
          </Routes>
          {/* <SideBar page={page} active={active} isAdmin={isAdmin} /> */}
          <SideNav linkOnClick={linkOnClick} page={page} isAdmin={isAdmin} />
          {/* {isLoggedIn && (
              <div className={styles.logout}>
              <a href='/logout' className='nav-link-custom'>
              Logout
              </a>
              </div>
            )} */}

          <div className={styles.contentWrapper}>
            <div
              className={styles.mainContent}
              onMouseOverCapture={() => handleHover(true)}
              onMouseLeave={() => handleHover(false)}
            >
              <div className={
                isHover ?
                [styles.borderLeftDiv, styles.activeBorderLeftDiv].join(' ') : styles.borderLeftDiv
                }></div>
              <div className={
                isHover ?
                [styles.borderRightDiv, styles.activeBorderRightDiv].join(' ') : styles.borderRightDiv
                }></div>
              <div className={styles.contactContainer}>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className={styles.contactIcons}
                  size='lg'
                />
                <FontAwesomeIcon
                  icon={faLinkedinIn}
                  className={styles.contactIcons}
                  size='lg'
                />
              </div>
            </div>
          </div>
        </Layout>
      </Suspense>
    </>
  );
};

export default App;
