require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const api = express();
api.use(cors());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());

const shrt = require('./modules/shortener');
const cache = require('./modules/cache');
var appAuth = async (req, res, next) => {
  let check = await cache._approvedApp(req.headers.appkey);
  if (!check) {
    return res.status(401).json('unauthorized');
  }
  next();
};

/**
 * API Information
 */
api.get('/', (req, res) => {
  // until I can come up with a page this is what we get.
  res.redirect('https://urls.cl');
});

/**
 * URL Shortening Section
 */
api.get('/slug/:slug', async (req, res) => {
  let url = await shrt.findUrl(req.params.slug);
  if (url) {
    res.json(url);
  } else {
    res.status(404).json('404 Not Found');
  }
});

api.post('/slug/', appAuth, async (req, res) => {
  let test = await shrt.createUrl(req.body.url);
  res.json(test);
});

const server = api.listen(8085, function () {
  console.log('Server started at :8085');
});
