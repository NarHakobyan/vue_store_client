// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import '@/common/connect/modules';
import router from '@/router';
import store from '@/store';

import 'bootstrap/scss/bootstrap.scss';

import App from './App';

sync(store, router);

Vue.config.productionTip = false;

Vue.config.errorHandler = () => {
  console.log('Caught an error');
};

const app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});

export { app, router, store };
