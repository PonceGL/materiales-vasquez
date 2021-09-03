import { createGlobalStyle } from "styled-components";
//import kreditTTF from "../public/fonts/kredit/kredit.ttf";

export const GlobalStyles = createGlobalStyle`
  @font-face {
      font-family: 'kredit';
      src: url('./fonts/kredit.ttf');
      font-weight: 400;
      font-style: normal;
  }
    
    :root {
    --background: #E6E6E6;
    --blue: #00144C;
    --red: #912126;
    --text: #00144C;
    --yellow: #FFC947;
    --white: #ffffff;
    }

    html {
        font-size: 62.5%;
    }

    * {
        margin: 0;
        padding: 0;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }

    a {
        text-decoration: none;
        cursor: pointer;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    li,
    ol,
    p {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: 'Roboto', sans-serif;
        font-size: 1.4rem;
        font-weight: 400;
        color: var(--text);
        background-color: var(--background);

        transition: ease-in-out 0.3s all;
        scrollbar-width: none;
        ::-webkit-scrollbar {
          display: none;
        }
    }
`;

export const theme = {
  colors: {
    primary: "#E7E7E7",
  },
};