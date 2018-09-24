require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const pino = require('express-pino-logger')();
const Gists = require('gists');
const _ = require('lodash');

const Components = require('./components');
const { reply } = require('./utils');

const gists = new Gists({
  username: process.env.GITHUB_USER,
  password: process.env.GITHUB_PASSWORD
});

class App extends express {
  constructor(name) {
    super();
    (async () => {
      this.apiName = name;
      this.url = process.env.URL || 'localhost';

      // Response wrap
      this.reply = reply;
      // Gist Client
      this.gists = gists;
      // Lodash
      this._ = _;

      this.components = [];
      this.controllers = [];
      this.config = require('config');
      // Log
      if (process.env.NODE_ENV === 'production') {
        this.use(pino);
      }

      // JSON Format
      this.use(express.json());
      this.use(express.urlencoded({ extended: false }));
      // Security
      this.use(helmet.frameguard());
      this.use(helmet.xssFilter());
      this.use(helmet.noSniff());
      this.use(helmet.ieNoOpen());
      this.disable('x-powered-by');

      // Load Components
      this.components = new Components(this, '/components');

      // Log error
      this.use((err, req, res, next) => {
        if (process.env.NODE_ENV === 'production') {
          req.log.error(err.stack);
        }
        next(err);
      });

      // Respond to XHR 500s with the error in JSON format
      this.use((err, req, res, next) => {
        if (req.xhr) {
          res.status(500).json({ error: err.message || err.toString() });
        } else {
          next(err);
        }
      });

      // 404 Error
      this.use((req, res) => {
        res.status(404).json({
          url: req.originalUrl,
          error: 'Not Found'
        });
      });

      process.on('SIGINT', async () => {
        process.exit(0);
      });

      process.on('uncaughtException', async e => {
        // console.log(e.message);
        process.exit(0);
      });

      process.on('unhandledRejection', async e => {
        // console.log(e.message);
        process.exit(0);
      });
    })();
  }
}

module.exports = App;
