require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const api = express();
api.use(cors());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());

const shrt = require('./modules/shortener');

const server = api.listen(8085, function () {
  console.log('Server started at :8085');
});

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
    res.redirect(url);
  } else {
    res.status(404).json('404 Not Found');
  }
});

api.post('/slug/', async (req, res) => {
  let test = await shrt.createUrl(req.body.url);
  res.json(test);
});
