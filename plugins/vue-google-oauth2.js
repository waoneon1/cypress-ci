// plugins/vue-google-oauth2.js
// file name can be changed to whatever you want

import Vue from 'vue';
import GAuth from 'vue-google-oauth2';

const gauthOption = {
  clientId: '656822214458-ct0abbuvl48f2l1qocdrhjk6lgn2p37h.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'consent',
};
Vue.use(GAuth, gauthOption);
