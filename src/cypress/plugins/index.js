const { startDevServer } = require('@cypress/webpack-dev-server')
const { getWebpackConfig } = require('nuxt')

dotenv.config() 

module.exports = (on, config) => {
  on('dev-server:start', async (options) => {
    const webpackConfig = await getWebpackConfig()

    config.env.googleClientId = process.env.NUXT_ENV_RRS_GAUTH_CLIENTID
    
    return startDevServer({
      options,
      webpackConfig,
      config
    })
  })
}
