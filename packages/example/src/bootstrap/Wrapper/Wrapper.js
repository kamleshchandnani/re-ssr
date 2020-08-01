import React from 'react';
import { ThemeProvider } from 'react-ui';
import { tokens, components } from 'react-ui/themes/light';

const Wrapper = () => (
  <ThemeProvider tokens={tokens} components={components}>
    <div>Starting point</div>
  </ThemeProvider>
);

export default Wrapper;
