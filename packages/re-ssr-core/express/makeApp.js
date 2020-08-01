const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const slashes = require('connect-slashes');

const makeApp = ({ name, version }) => {
  const app = express();

  // get client ip in req.ip
  app.set('trust proxy', true);

  // set headers for security
  app.use(helmet({ dnsPrefetchControl: false }));

  // increase data limits to 50mb
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // attach cookies in req.cookies
  app.use(cookieParser());

  // check if the browser supports ES module

  // health check
  app.use('/health', (req, res) =>
    res.send({
      name,
      version,
    }),
  );

  // force trailing slashes with a 301 redirect
  app.use(slashes(true));

  return app;
};

export default makeApp;
