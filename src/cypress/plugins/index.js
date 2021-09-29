const { startDevServer } = require('@cypress/webpack-dev-server');
const { getWebpackConfig } = require('nuxt');
require('dotenv').config();

module.exports = (on, config) => {

  config.env.title = process.env.NUXT_ENV_RRS_APP_TITLE;
  config.env.NUXT_ENV_CYPRESS_TOKEN = process.env.NUXT_ENV_CYPRESS_TOKEN;
  config.env.BASEURL = process.env.BASEURL;

  on('dev-server:start', async (options) => {
    const webpackConfig = await getWebpackConfig();

    return startDevServer({
      options,
      webpackConfig,
      config,
    });
  });
};