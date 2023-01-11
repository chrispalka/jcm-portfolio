import React from 'react';
import styles from '../assets/Projects.module.css';

const videos = [
  {
    name: 'https://via.placeholder.com/450x250',
    title: 'Movie',
  },

  {
    name: 'https://via.placeholder.com/450x250',
    title: 'Movie',
  },

  {
    name: 'https://via.placeholder.com/450x250',
    title: 'Movie',
  },

  {
    name: 'https://via.placeholder.com/450x250',
    title: 'Movie',
  }
];

// const videos = [1, 2, 3, 4]

const Projects = () => (
  <div className={styles.gridContainer}>
    {videos.map((video, i) => (
      <div className={styles.col} key={i}>
        <img src={video.name} key={i} alt=''></img>
      </div>
    ))}
  </div>
);

export default Projects;
