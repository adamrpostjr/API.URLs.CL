const db = require('monk')(process.env.MONGOURI);
var urls = db.get('urls');

module.exports = { urls };
