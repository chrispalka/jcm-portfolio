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
    description:
      'Reprehenderit do voluptate fugiat commodo ex duis deserunt do excepteur eu. Proident cillum anim voluptate et nulla aute ex voluptate cillum cupidatat pariatur. Nostrud in nostrud quis anim dolore. Reprehenderit exercitation aliqua sint et ex irure aliquip.',
  },

  {
    still: movie2,
    title: 'Movie 02',
    description:
      'Id sit ut culpa ipsum irure do do. Deserunt magna minim duis excepteur nulla ea dolor officia officia quis deserunt veniam ipsum cupidatat. Laboris cillum labore duis est nostrud anim laborum occaecat duis. Aute magna elit mollit excepteur exercitation ea aliquip Lorem enim culpa aute pariatur est cupidatat. Cillum aliqua dolor nisi eiusmod sunt reprehenderit aliqua enim laboris culpa eiusmod eiusmod laborum velit. Ullamco occaecat tempor nostrud aliqua adipisicing sint laboris duis commodo. Non aute nostrud cupidatat non ex duis sint pariatur proident.',
  },

  {
    still: movie3,
    title: 'Movie 03',
    description:
      'Occaecat nostrud ea est cillum mollit nisi esse enim amet magna eu id. Dolor in commodo enim mollit mollit nisi nostrud labore qui. Adipisicing fugiat ea enim cupidatat deserunt aliqua anim.',
  },

  {
    still: movie4,
    title: 'Movie 04',
    description:
      'Laboris labore magna reprehenderit incididunt labore voluptate elit dolore fugiat et dolor ut mollit fugiat. Veniam magna aliqua elit ea. Eu duis dolore consequat consequat culpa magna consectetur quis deserunt labore. Pariatur exercitation ipsum do quis cupidatat deserunt cillum non et nostrud. Nisi aliquip quis eu irure ipsum incididunt laboris fugiat enim cupidatat pariatur in. Deserunt commodo enim id exercitation qui ad labore. Nisi eiusmod amet do sint magna proident.',
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
