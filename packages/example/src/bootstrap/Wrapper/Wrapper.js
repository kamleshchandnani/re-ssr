import React from 'react';
import { ThemeProvider } from 'react-ui';
import { tokens, components } from 'react-ui/themes/light';
import { Switch, Route } from 'react-router-dom';
import Home from '../../search/Home/Home';
import Listing from '../../search/Listing/Listing';
import GlobalStyles from '../GlobalStyles/GlobalStyles';

const Wrapper = () => (
  <ThemeProvider tokens={tokens} components={components}>
    <GlobalStyles />
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/photos">
        <Listing />
      </Route>
    </Switch>
  </ThemeProvider>
);

export default Wrapper;
