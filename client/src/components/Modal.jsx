import React from 'react';
import styles from '../assets/Modal.module.css';
import movie1 from '../assets/images/movie1.jpeg';
import movie2 from '../assets/images/movie2.jpeg';
import movie3 from '../assets/images/movie3.jpeg';
import movie4 from '../assets/images/movie4.jpeg';

const Modal = React.forwardRef(({ video }, ref) => (
  <div ref={ref} className={styles.modalWrapper}>
    <img className={styles.modalImage} alt='' src={video.still} />
  </div>
));

export default Modal;
