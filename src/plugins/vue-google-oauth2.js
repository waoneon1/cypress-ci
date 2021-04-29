// plugins/vue-google-oauth2.js
// file name can be changed to whatever you want

import Vue from 'vue';
import GAuth from 'vue-google-oauth2';

const gauthOption = {
  clientId: process.env.RRS_GAUTH_CLIENTID,
  scope: 'profile email',
  prompt: 'consent',
};
Vue.use(GAuth, gauthOption);
