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
    { path: '/stores', name: 'stores', component: () => import('@/views/Store'), meta: { requiresAuth: true } },
    { path: '/stores/create', name: 'createStore', component: () => import('@/views/CreateStore'), meta: { requiresAuth: true } },
    { path: '/stores/:storeId', name: 'singleStore', component: () => import('@/views/SingleStore'), meta: { requiresAuth: true } },
    { path: '/stores/:storeId/admin', name: 'storeAdmins', component: () => import('@/views/StoreAdmins'), meta: { requiresAuth: true } },
  ],
});
router.beforeEach((to, from, next) => {
  store.dispatch('clearPending');
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
