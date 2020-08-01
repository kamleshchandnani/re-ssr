import http from 'http';
import React from 'react';
import express, { makeApp } from 're-ssr/express';
import compression from 'compression';
import chalk from 'chalk';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
// eslint-disable-next-line import/extensions
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import packageJson from '../package.json';
import Wrapper from './bootstrap/Wrapper/Wrapper';

const configJs = require('../config.js')[process.env.STAGE];

const app = makeApp({ name: packageJson.name, version: packageJson.version });
app.use(compression());

app.use(`/${packageJson.name}/build/client`, express.static('build/client'));

app.get('*', (req, res) => {
  const sheet = new ServerStyleSheet();
  const markup = renderToString(
    <StyleSheetManager sheet={sheet.instance}>
      <StaticRouter location={req.url}>
        <Wrapper />
      </StaticRouter>
    </StyleSheetManager>,
  );
  const styles = sheet.getStyleTags();
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
      ${styles}
        <title>Resplash</title>
      </head>
      <body>
        <div id="app">${markup}</div>
      </body>
      <script src="${configJs.assetsUrl}/${packageJson.name}/build/client/js/main.js" defer></script>
    </html>
`);
});

const httpServer = http.createServer(app);

httpServer.listen(configJs.port, () => {
  console.log(chalk.green(`server is listening at http://localhost:${configJs.port}`));
});
