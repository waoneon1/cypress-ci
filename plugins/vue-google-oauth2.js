// plugins/vue-google-oauth2.js
// file name can be changed to whatever you want

import Vue from 'vue';
import GAuth from 'vue-google-oauth2';

const gauthOption = {
  clientId: '683508409958-qqcru8m9d0bfvher3vk8ltc8gqe2fs4q.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'consent',
};
Vue.use(GAuth, gauthOption);
