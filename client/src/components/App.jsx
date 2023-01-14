import React, { useState, useEffect, lazy, Suspense, useRef } from 'react';
import { useDetectOutsideClick } from '../hooks/useDetectOutsideClick';
import styles from '../assets/App.module.css';
import { Layout, Projects, SideNav, Modal } from '../layout/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Login = lazy(() => import('./Login'));
const Register = lazy(() => import('./Register'));

const App = () => {
  const modalRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState({
    still: '',
    title: '',
    description: '',
  });
  const [showModal, setShowModal] = useDetectOutsideClick(modalRef);
  const [isHover, setIsHover] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isAdmin, setIsAdmin] = useState(false);
  const [isVideoClicked, setIsVideoClicked] = useState(false);

  // useEffect(() => {
  //   axios('/isLoggedIn')
  //     .then((response) => {
  //       if (response.data) {
  //         setIsLoggedIn(true);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  useEffect(() => {
    if (!showModal) {
      setIsVideoClicked(false);
    }
  }, [showModal]);

  // useEffect(() => {
  //   axios('/isAdmin')
  //     .then((response) => {
  //       if (response.data) {
  //         setIsAdmin(true);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

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
    setSelectedVideo({
      ...selectedVideo,
      still: cb.still,
      title: cb.title,
      description: cb.description,
    });
    setIsHover(false);
    setIsVideoClicked(true);
    setTimeout(() => {
      setShowModal(true);
    }, 900);
  };
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {/* <SideBar page={page} active={active} isAdmin={isAdmin} /> */}
        <SideNav />
        {/* {isLoggedIn && (
              <div className={styles.logout}>
              <a href='/logout' className='nav-link-custom'>
              Logout
              </a>
              </div>
            )} */}
        <div
          className={
            !showModal
              ? [styles.contentWrapper, styles.contentWrapperModal].join(' ')
              : styles.contentWrapper
          }
        >
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
          <div
            className={
              showModal
                ? [styles.mainContentModal, styles.mainContent].join(' ')
                : styles.mainContent
            }
            onMouseOverCapture={(e) => handleHover(e, true, isVideoClicked)}
            onMouseLeave={(e) => handleHover(e, false, isVideoClicked)}
          >
            {showModal && (
              <Modal
                ref={modalRef}
                video={selectedVideo}
                isVideoClicked={isVideoClicked}
              />
            )}
            <Projects
              handleVideoClick={(cb) => handleVideoClick(cb)}
              showModal={showModal}
            />
            <div
              className={
                isHover
                  ? [styles.borderLeftDiv, styles.activeBorderLeftDiv].join(' ')
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
                  ? [styles.borderRightDiv, styles.clickedBorderRightDiv].join(
                      ' '
                    )
                  : styles.borderRightDiv
              }
            ></div>
          </div>
          <div className={styles.descriptionContainer}>
            {showModal && (
              <div className={styles.descriptionFadeIn}>
                {selectedVideo.description}
              </div>
            )}
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default App;
