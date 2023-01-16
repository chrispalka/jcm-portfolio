import React from 'react';
import styles from '../assets/Modal.module.css';

const Modal = React.forwardRef(({ video, isVideoClicked }, ref) => (
  <div ref={ref} className={styles.modalWrapper}>
    <video
      className={
        isVideoClicked
          ? [styles.modalImageFadeIn, styles.modalImage].join(' ')
          : [styles.modalImageFadeOut, styles.modalImage].join(' ')
      }
      src={video.movie}
      controls
    />
  </div>
));

export default Modal;
