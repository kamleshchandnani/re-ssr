/* eslint-disable no-console */
import http from 'http';
import express, { makeApp } from 're-ssr/express';
import compression from 'compression';
import chalk from 'chalk';
import { renderApp } from 're-ssr/renderApp';
import { matchPath } from 'react-router-dom';
// eslint-disable-next-line import/extensions
import packageJson from '../package.json';
import Wrapper from './bootstrap/Wrapper/Wrapper';
import routes from './bootstrap/routes/routes';

const configJs = require('../config.js')[process.env.STAGE];

const app = makeApp({ name: packageJson.name, version: packageJson.version });
app.use(compression());

app.get('/service-worker.js', express.static('build/client'));

app.use(`/${packageJson.name}/build/client`, express.static('build/client'));

app.get('*', async (req, res) => {
  const activeRoute = routes.find((route) => matchPath(req.path, route)) || {};
  let initialData = {};

  if (activeRoute?.Component?.getInitialData) {
    initialData = await activeRoute.Component.getInitialData(req);
  }

  const html = renderApp({ App: Wrapper, req, initialData });
  res.send(html);
});

const httpServer = http.createServer(app);

httpServer.listen(configJs.port, () => {
  console.log(chalk.green(`server is listening at http://localhost:${configJs.port}`));
});
