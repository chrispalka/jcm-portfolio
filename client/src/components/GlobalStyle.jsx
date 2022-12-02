import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: 0;
    padding: 0;
    height: 100vh;
    background-color: #141414;
    font-family: Gotham, arial;
    font-weight: 100;
    color: #fff;
    overflow-y: hidden;
    input {
      font-family: arial;
    }
    div > button {
      font-family: arial !important;
    }
  }
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
`;

export default GlobalStyle;
