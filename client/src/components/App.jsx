import React, { useState, useEffect, lazy, Suspense, useRef } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDetectOutsideClick } from '../hooks/useDetectOutsideClick';
import styles from '../assets/App.module.css';
import { Layout, Projects, SideNav, Modal } from '../layout/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Login = lazy(() => import('./Login'));
const Register = lazy(() => import('./Register'));
const axios = require('axios');

const App = () => {
  const [page, setPage] = useState('');
  const modalRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState('');
  const [showModal, setShowModal] = useDetectOutsideClick(modalRef);
  const [isHover, setIsHover] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isVideoClicked, setIsVideoClicked] = useState(false);

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
    if (!showModal) {
      setIsVideoClicked(false);
    }
  }, [showModal]);
  useEffect(() => {
    axios('/isAdmin')
      .then((response) => {
        if (response.data) {
          setIsAdmin(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleHover = (e, isHover, stop = false) => {
    if (
      isHover &&
      !stop &&
      e.target.id !== 'contact-icons' &&
      e.target.tagName !== 'svg' &&
      e.target.tagName !== 'path'
    ) {
      setIsHover(true);
    } else {
      setIsHover(false);
    }
  };

  const handleVideoClick = (cb) => {
    setSelectedVideo(cb.still);
    setIsVideoClicked(true);
    setIsHover(false);
    setTimeout(() => {
      setShowModal(true);
    }, 1500);
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
          <SideNav isAdmin={isAdmin} />
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
              onMouseOverCapture={(e) => handleHover(e, true, showModal)}
              onMouseLeave={(e) => handleHover(e, false, showModal)}
            >
              {showModal && <Modal ref={modalRef} video={selectedVideo} />}
              <Projects
                handleVideoClick={(cb) => handleVideoClick(cb)}
                showModal={showModal}
              />
              <div
                className={
                  isHover
                    ? [styles.borderLeftDiv, styles.activeBorderLeftDiv].join(
                        ' '
                      )
                    : isVideoClicked
                    ? [styles.borderLeftDiv, styles.clickedBorderLeftDiv].join(
                        ' '
                      )
                    : styles.borderLeftDiv
                }
              ></div>
              <div
                className={
                  isHover
                    ? [styles.borderRightDiv, styles.activeBorderRightDiv].join(
                        ' '
                      )
                    : isVideoClicked
                    ? [
                        styles.borderRightDiv,
                        styles.clickedBorderRightDiv,
                      ].join(' ')
                    : styles.borderRightDiv
                }
              ></div>
              <div className={styles.contactContainer} id='contact-icons'>
                <a href='mailto: jimcookemedia@gmail.com'>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className={styles.contactIcons}
                    size='lg'
                  />
                </a>
                <a
                  href='https://www.linkedin.com/in/jim-cooke-2ba22135/'
                  target='_blank'
                >
                  <FontAwesomeIcon
                    icon={faLinkedinIn}
                    className={styles.contactIcons}
                    size='lg'
                  />
                </a>
              </div>
            </div>
          </div>
        </Layout>
      </Suspense>
    </>
  );
};

export default App;
