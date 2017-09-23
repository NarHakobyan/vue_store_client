import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';

import store from '@/store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: () => import('@/views/Login') },
    { path: '/register', component: () => import('@/views/Register') },
    {
      path: '/stores',
      component: () => import('@/views/StoreHome'),
      children: [
        { path: '', name: 'stores', component: () => import('@/views/Store') },
        { path: 'create', name: 'createStore', component: () => import('@/views/CreateStore') },
        { path: ':storeId', name: 'singleStore', component: () => import('@/views/SingleStore') },
        { path: ':storeId/admin', name: 'storeAdmins', component: () => import('@/views/StoreAdmins') },
      ],
      meta: { auth: true },
    },
  ],
});
router.beforeEach((to, from, next) => {
  store.dispatch('clearPending');
  console.log(to);
  window.to = to;
  if (to.matched.some(record => record.meta.auth)) {
    if (!store.getters.isLoggedIn) {
      return next({ path: '/login', query: { redirect: to.fullPath } });
    }
  }
  return next();
});
export default router;
