// plugins/vue-google-oauth2.js
// file name can be changed to whatever you want

import Vue from 'vue';
import GAuth from 'vue-google-oauth2';

const gauthOption = {
  clientId: '646531528446-136mfhgvkfp4bpdem8n8cririv4oqm60.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'consent',
};
Vue.use(GAuth, gauthOption);
