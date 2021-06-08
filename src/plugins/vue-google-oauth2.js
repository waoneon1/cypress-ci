// plugins/vue-google-oauth2.js
// file name can be changed to whatever you want

import Vue from 'vue';
import GAuth from 'vue-google-oauth2';

console.log(process.env.NUXT_ENV_RRS_GAUTH_CLIENTID, 'process.env.NUXT_ENV_RRS_GAUTH_CLIENTID')
const gauthOption = {
  clientId: process.env.NUXT_ENV_RRS_GAUTH_CLIENTID,
  scope: 'profile email',
  prompt: 'consent',
};
Vue.use(GAuth, gauthOption);
