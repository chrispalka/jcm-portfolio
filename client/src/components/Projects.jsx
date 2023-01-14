import React from 'react';
import styles from '../assets/Projects.module.css';
import movie1 from '../assets/images/movie1.jpeg';
import movie2 from '../assets/images/movie2.jpeg';
import movie3 from '../assets/images/movie3.jpeg';
import movie4 from '../assets/images/movie4.jpeg';

const videos = [
  {
    still: movie1,
    title: 'Movie 01',
  },

  {
    still: movie2,
    title: 'Movie 02',
  },

  {
    still: movie3,
    title: 'Movie 03',
  },

  {
    still: movie4,
    title: 'Movie 04',
  },
];

const Projects = ({ handleVideoClick, showModal }) => (
  <div className={showModal ? styles.hideProjects : styles.gridContainer}>
    {videos.map((video, i) => (
      <div className={styles.col} key={i}>
        <img
          className={styles.video}
          src={video.still}
          key={i}
          alt=''
          onClick={() => handleVideoClick(video)}
        ></img>
      </div>
    ))}
  </div>
);

export default Projects;
