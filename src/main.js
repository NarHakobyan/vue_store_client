// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import VeeValidate from 'vee-validate';
import BootstrapVue from 'bootstrap-vue';
import router from '@/router';
import store from '@/store';

import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import App from './App';

sync(store, router);

Vue.use(VeeValidate);
Vue.use(BootstrapVue);


Vue.config.productionTip = false;

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});

export { app, router, store };
