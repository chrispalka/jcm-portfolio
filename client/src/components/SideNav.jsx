import React, { useState, useRef } from 'react';
import styles from '../assets/SideNav.module.css';
import ProfileImg from '../assets/images/jcmprofile.jpeg';
import { useDetectOutsideClick } from '../hooks/useDetectOutsideClick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import Media from 'react-media';

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
  const dropdownRef = useRef(null);
  const [drawerClicked, setDrawerClicked] = useDetectOutsideClick(dropdownRef);

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
          <div
            ref={dropdownRef}
            className={
              drawerClicked
                ? [styles.drawerContainer, styles.drawerActive].join(' ')
                : styles.drawerContainer
            }
          >
            {navLinks.map((link, i) => (
              <div
                className={
                  activeLink === link.name
                    ? [styles.linkWrapper, styles.activeLink].join(' ')
                    : styles.linkWrapper
                }
                key={i}
                onClick={() => {
                  linkOnClick(link.name);
                  handleActiveLink(link.name);
                }}
              >
                <div className={styles.linkContainer}>
                  <span>{link.name}</span>
                </div>
              </div>
            ))}
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
        )}
      />
      <div className={styles.navContainer}>
        <Media
          query='(max-width: 1208px)'
          render={() => (
            <div
              className={styles.navDrawerContainer}
              id='nav-click'
              onClick={handleDrawerClicked}
            >
              {drawerClicked ? (
                <FontAwesomeIcon icon={faXmark} id='hamburger' />
              ) : (
                <FontAwesomeIcon icon={faBars} id='hamburger' />
              )}
            </div>
          )}
        />

        <div className={styles.nameContainer}>
          <a href={DOMAIN}>JIM COOKE</a>
          <Media
            query='(min-width: 1208px)'
            render={() => (
              <div className={styles.imageContainer}>
                <img src={ProfileImg} />
              </div>
            )}
          />
        </div>
        <Media
          query='(min-width: 1208px)'
          render={() => (
            <>
              {navLinks.map((link, i) => (
                <div
                  className={
                    activeLink === link.name
                      ? [styles.linkWrapper, styles.activeLink].join(' ')
                      : styles.linkWrapper
                  }
                  key={i}
                  onClick={() => {
                    linkOnClick(link.name);
                    handleActiveLink(link.name);
                  }}
                >
                  <div className={styles.linkContainer}>
                    <span>{link.name}</span>
                  </div>
                </div>
              ))}
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
          )}
        />
      </div>
    </>
  );
};

export default SideNav;
