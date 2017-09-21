import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import Login from '@/views/Login';
import Register from '@/views/Register';
import Store from '@/views/Store';

import store from '../store';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/stores',
      component: Store,
      beforeEnter(to, from, next) {
        if (store.getters.isLoggedIn) {
          next();
        }
      },
    },
  ],
});
