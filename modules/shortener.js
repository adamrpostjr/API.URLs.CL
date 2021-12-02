const { urls } = require('../lib/database');
const { nanoid } = require('nanoid');

/**
 *
 * @param {string} url
 * @returns {string|object} Error Message | Database Object
 */
const createUrl = async (url) => {
  if (url.toLowerCase().includes('urls.cl')) {
    return Promise.reject('Are you kidding me?');
  }

  let slug = nanoid(Math.floor(Math.random() * (7 - 3) + 3));
  let slugTest = await urls.findOne({ slug: slug });
  if (slugTest) {
    return createUrl(url);
  }

  let dbObj = {
    url: url,
    slug: slug,
    datetime: new Date().toLocaleString('en-US').replaceAll('/', '-'),
  };

  let urlTest = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(url);

  if (!urlTest) {
    return Promise.reject('Invalid URL');
  }

  try {
    await urls.insert(dbObj);
    return Promise.resolve(dbObj);
  } catch (error) {
    return Promise.reject('Error Occured While Creating URL');
  }
};

/**
 *
 * @param {string} slug
 * @returns {string} url matched to the slug
 */
const findUrl = async (slug) => {
  let url = '';
  let found = await urls.findOne({ slug: slug });
  if (found != null) {
    url = found.url;
  }

  return Promise.resolve(url);
};

module.exports = { createUrl, findUrl };
