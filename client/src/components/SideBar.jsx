import React from 'react';
import styled from 'styled-components';
import { Projects, Admin } from '../layout/index';
import useMediaQuery from '../hooks/useMediaQuery';

const BackgroundPortion = styled.div`
  height: 100vh;
  ${(props) =>
    props.isMobile &&
    `
        width: 100%;
        `}
  ${(props) =>
    props.isDesktop &&
    `
        width: 90%;
        `}
  background-color: #222222;
  position: absolute;
  right: 0;
`;

const SideBarWrapper = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #0b0909;
  position: absolute;
  transition: all 0.5s ease;
  ${(props) => props.active}
`;

const SidebarInnerWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  padding: 50px;
  align-items: center;
  left: 50%;
  height: 100vh;
  background-color: #0b0909;
  transform: translate(-50%, -50%);
`;

const AboutSection = styled.section`
  margin: auto;
  font-size: 1vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ContactSection = styled.section`
  margin: auto;
  font-size: 1vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SideBar = ({ page, active, isAdmin }) => {
  return (
    <BackgroundPortion
      isDesktop={useMediaQuery('(min-width: 1208px)')}
      isMobile={useMediaQuery('(max-width: 1208px)')}
    >
      <SideBarWrapper active={active ? 'right: 0;' : 'right: -100%;'}>
        <SidebarInnerWrapper>
          {page === 'about' && (
            <AboutSection>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              sagittis hendrerit eleifend. Donec tempor augue et mattis mollis.
              Integer et aliquet justo. In eleifend dapibus nibh eu elementum.
              Mauris nec cursus nisi, nec mattis lectus. Maecenas urna purus,
              volutpat suscipit diam et, scelerisque aliquet neque. Quisque
              venenatis vitae eros non maximus. Cras pharetra.
            </AboutSection>
          )}
          {page === 'projects' && <Projects />}
          {page === 'admin' && <Admin isAdmin={isAdmin} />}
          {page === 'contact' && <ContactSection>Contact</ContactSection>}
        </SidebarInnerWrapper>
      </SideBarWrapper>
    </BackgroundPortion>
  );
};

export default SideBar;

/*
 right ${props => props.active || '0'};
 */
