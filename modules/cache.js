const { approvedApps } = require('../lib/database');

const aa = [];

const cacheApps = async () => {
  let apps = await approvedApps.find({});
  aa.push(apps[0]);
};
cacheApps();

/**
 *
 * @param {string} AppKey
 * @returns {boolean} true | false
 */
const _approvedApp = async (AppKey) => {
  let applocator = aa.find((obj) => obj.AppKey == AppKey);
  if (applocator) {
    return true;
  }
  return false;
};

module.exports = { _approvedApp };
