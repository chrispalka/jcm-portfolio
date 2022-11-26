import React from 'react'
import styled from 'styled-components'

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 16px;
    grid-row-gap: 24px;
    padding: 0 16px;
    div {
        cursor: pointer;
        :hover {
            div {
                transition: all 0.8s ease;
                color: white;
            }
        }
        div {
            transition: all 0.8s ease;
            display: flex;
            justify-content: flex-start;
            font-size: 12px;
            color: gray;
            width: 100%;
            padding: 15px;
        }
    }
    img {
        width: 12vw;
        text-align: center;
    }
`

const videos = [
    {
        name: 'https://via.placeholder.com/300',
        title: 'Movie',
    },

    {
        name: 'https://via.placeholder.com/300',
        title: 'Movie',
    },

    {
        name: 'https://via.placeholder.com/300',
        title: 'Movie',
    },

    {
        name: 'https://via.placeholder.com/300',
        title: 'Movie',
    },

    {
        name: 'https://via.placeholder.com/300',
        title: 'Movie',
    },

    {
        name: 'https://via.placeholder.com/300',
        title: 'Movie',
    },
]

const Projects = () => (
    <GridContainer>
        {videos.map((video, i) => (
            <div key={i}>
                <div style={{ paddingLeft: 0 }}>{`${video.title} Ø${
                    i === 0 ? 'Ø' : i
                }`}</div>
                <img src={video.name} key={i} alt=''></img>
            </div>
        ))}
    </GridContainer>
)

export default Projects
