import React from 'react';
import { ThemeProvider } from 'react-ui';
import { tokens, components } from 'react-ui/themes/light';
import { Switch, Route } from 'react-router-dom';
import GlobalStyles from '../GlobalStyles/GlobalStyles';
import routes from '../routes/routes';

const Wrapper = () => (
  <ThemeProvider tokens={tokens} components={components}>
    <GlobalStyles />
    <Switch>
      {routes.map(({ path, exact, Component }) => (
        <Route key={path} path={path} exact={exact}>
          <Component />
        </Route>
      ))}
    </Switch>
  </ThemeProvider>
);

export default Wrapper;
