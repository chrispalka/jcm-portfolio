import React from 'react';
import styles from '../assets/Modal.module.css';

const Modal = React.forwardRef(({ video, isVideoClicked }, ref) => (
  <div ref={ref} className={styles.modalWrapper}>
    <img
      className={
        isVideoClicked
          ? [styles.modalImageFadeIn, styles.modalImage].join(' ')
          : [styles.modalImageFadeOut, styles.modalImage].join(' ')
      }
      alt=''
      src={video.still}
    />
  </div>
));

export default Modal;
