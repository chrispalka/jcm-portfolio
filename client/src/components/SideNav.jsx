import React, { useState, useRef } from 'react';
import styles from '../assets/SideNav.module.css';
import ProfileImg from '../assets/images/jcmprofile.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faEnvelope } from '@fortawesome/free-solid-svg-icons';

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
          <FontAwesomeIcon icon={faXmark} id='hamburger' />
        ) : (
          <FontAwesomeIcon icon={faBars} id='hamburger' />
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
          <div>
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
          </div>
        </>
      </div>
    </>
  );
};

export default SideNav;
