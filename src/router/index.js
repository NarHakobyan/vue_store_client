import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import Login from '@/views/Login';
import Register from '@/views/Register';
import Store from '@/views/Store';
import SingleStore from '@/views/SingleStore';
import StoreAdmins from '@/views/StoreAdmins';

import store from '@/store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/stores', component: Store, meta: { requiresAuth: true } },
    { path: '/stores/:storeId', name: 'singleStore', component: SingleStore, meta: { requiresAuth: true } },
    { path: '/stores/:storeId/admin', name: 'storeAdmins', component: StoreAdmins, meta: { requiresAuth: true } },
  ],
});
router.beforeEach((to, from, next) => {
  store.dispatch('clearPendingErrors');
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      return next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    }
  }
  return next();
});
export default router;
