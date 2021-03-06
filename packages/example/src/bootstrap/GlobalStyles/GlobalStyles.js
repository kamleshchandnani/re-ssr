import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
  }
  * {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent; /* For some Androids */
  }

  @import url('https://rsms.me/inter/inter.css');
  html {
    font-family: 'Inter', sans-serif;
  }
  @supports (font-variation-settings: normal) {
    html {
      font-family: 'Inter var', sans-serif;
    }
  }
`;

export default GlobalStyles;
