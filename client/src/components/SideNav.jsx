import React, { useState, useRef } from 'react';
import styles from '../assets/SideNav.module.css';
import ProfileImg from '../assets/images/jcmprofile.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const navLinks = [
  {
    name: 'projects',
  },
];
const SideNav = ({ linkOnClick, isAdmin }) => {
  const [activeLink, setActiveLink] = useState('projects');
  const [isMobileNavToggled, setMobileNavToggled] = useState(false);

  const handleActiveLink = (activeLink) => {
    setActiveLink(activeLink);
    setMobileNavToggled(!isMobileNavToggled);
  };

  const toggleMobileNav = () => {
    setMobileNavToggled(!isMobileNavToggled);
  };

  return (
    <>
      <div
        className={styles.mobile_btn}
        id='nav-click'
        onClick={toggleMobileNav}
      >
        {isMobileNavToggled ? (
          <FontAwesomeIcon icon={faXmark} id='hamburger' size='lg' />
        ) : (
          <FontAwesomeIcon icon={faBars} id='hamburger' size='lg' />
        )}
      </div>
      <div
        className={
          isMobileNavToggled
            ? [styles.navContainer, styles.active].join(' ')
            : styles.navContainer
        }
      >
        <>
          <div className={styles.nameContainer}>
            <a href={DOMAIN}>JIM COOKE</a>
            <div className={styles.imageContainer}>
              <img src={ProfileImg} />
            </div>
          </div>
          <div className={styles.contactContainer} id='contact-icons'>
            <a href='mailto: jimcookemedia@gmail.com'>
              <FontAwesomeIcon
                icon={faEnvelope}
                className={styles.contactIcons}
                size='2xl'
              />
            </a>
            <a
              href='https://www.linkedin.com/in/jim-cooke-2ba22135/'
              target='_blank'
            >
              <FontAwesomeIcon
                icon={faLinkedinIn}
                className={styles.contactIcons}
                size='2xl'
              />
            </a>
          </div>
          {isAdmin && (
            <div
              className={
                activeLink === 'admin'
                  ? [styles.linkWrapper, styles.activeLink].join(' ')
                  : styles.linkWrapper
              }
              onClick={() => {
                linkOnClick('admin');
                handleActiveLink('admin');
              }}
            >
              <div className={styles.linkContainer}>
                <span>ADMIN</span>
              </div>
            </div>
          )}
        </>
      </div>
    </>
  );
};

export default SideNav;
