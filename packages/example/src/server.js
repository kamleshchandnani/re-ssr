import http from 'http';
// import React from 'react';
import express, { makeApp } from 're-ssr/express';
import compression from 'compression';
import chalk from 'chalk';
// import { renderToString } from 'react-dom/server';
// import { StaticRouter } from 'react-router-dom';
// eslint-disable-next-line import/extensions
// import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { renderApp } from 're-ssr/renderApp';
import packageJson from '../package.json';
import Wrapper from './bootstrap/Wrapper/Wrapper';

const configJs = require('../config.js')[process.env.STAGE];

const app = makeApp({ name: packageJson.name, version: packageJson.version });
app.use(compression());

app.use(`/${packageJson.name}/build/client`, express.static('build/client'));

app.get('*', (req, res) => {
  const html = renderApp({ App: Wrapper, req });
  res.send(html);
});

const httpServer = http.createServer(app);

httpServer.listen(configJs.port, () => {
  console.log(chalk.green(`server is listening at http://localhost:${configJs.port}`));
});
