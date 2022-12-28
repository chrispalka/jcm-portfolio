import React from 'react';
import styled from 'styled-components';
import useMediaQuery from '../hooks/useMediaQuery';


const GridContainer = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  height: 100%;
  display: grid;
  padding: 100px;
  gap: 1rem;
  grid-template-columns: repeat(1, 1fr);
  .col {
    border: 2px solid yellow;
    padding: 2rem;
    height: 200px;
    margin: 0 auto;
    min-width: 350px;
    position: relative;
  }

  img {
    display: flex;
    justify-content: center;
    position: absolute;
    top: 50%;
    width: 100%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  ${(props) =>
    props.isDesktop &&
    `
  grid-template-columns: repeat(3, 1fr);
  max-height: 1000px;
  .col {
    height: 250px;
    width: 450px;
  }
  `}
  ${(props) =>
    props.isTablet &&
    `
  grid-template-columns: repeat(2, 1fr);
  .col {
    height: 250px;
    width: 450px;
  }
  `}
`;

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
  },

  {
    name: 'https://via.placeholder.com/450x250',
    title: 'Movie',
  },

  {
    name: 'https://via.placeholder.com/450x250',
    title: 'Movie',
  },
];

const Projects = () => (
  <GridContainer
    isDesktop={useMediaQuery('(min-width: 1208px)')}
    isTablet={useMediaQuery('(min-width: 600px)')}
  >
    {videos.map((video, i) => (
      <div className='col' key={i}>
        <img src={video.name} key={i} alt=''></img>
      </div>
    ))}
  </GridContainer>
);

export default Projects;
