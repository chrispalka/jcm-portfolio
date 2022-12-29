import React from 'react';
import styles from '../assets/Sidebar.module.css';
import { Projects, Admin } from '../layout/index';

const SideBar = ({ page, active, isAdmin }) => {
  return (
    <div className={styles.background}>
      <div
        className={
          active
            ? [styles.sidebarWrapper, styles.sidebarActive].join(' ')
            : styles.sidebarWrapper
        }
      >
        <div className={styles.sidebarInnerWrapper}>
          {page === 'about' && (
            <div className={styles.aboutSection}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              sagittis hendrerit eleifend. Donec tempor augue et mattis mollis.
              Integer et aliquet justo. In eleifend dapibus nibh eu elementum.
              Mauris nec cursus nisi, nec mattis lectus. Maecenas urna purus,
              volutpat suscipit diam et, scelerisque aliquet neque. Quisque
              venenatis vitae eros non maximus. Cras pharetra.
            </div>
          )}
          {page === 'projects' && <Projects />}
          {page === 'admin' && <Admin isAdmin={isAdmin} />}
          {page === 'contact' && (
            <div className={styles.contactSection}>Contact</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
