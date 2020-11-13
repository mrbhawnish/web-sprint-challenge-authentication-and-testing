const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(
    session({
      name: "monkey",
      secret: "keep it secret, keep it safe",
      cookie: {
        maxAge: 1000 * 60, //give cookie an expiration date
        secure: false, // true only in production (http is a must)
        httpOnly: true, // this means that the JS in the browser cannot read the cookie
      },
      resave: false, // we don't want to recreate sessions that haven't changed
      saveUninitialized: false, // we don't want to persist the session 'by default' against the GDPR laws
    })
  );
  



server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

module.exports = server;
