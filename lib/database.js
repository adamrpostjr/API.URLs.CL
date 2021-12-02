const db = require('monk')(process.env.MONGOURI);
var urls = db.get('urls');
var approvedApps = db.get('Applications');

module.exports = { urls, approvedApps };
