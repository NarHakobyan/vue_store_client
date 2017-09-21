/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router';

import { PENDING_END, PENDING_START, PENDING_SUCCESS } from './types/pending.types';
import { LOGIN_SUCCESS, LOGOUT } from './types/auth.types';

Vue.use(Vuex);

const defaultState = {
  count: 0,
  isLoggedIn: !!localStorage.getItem('token'),
};

const mutations = {
  [PENDING_START](state) {
    state.pending = true;
  },
  [LOGIN_SUCCESS](state) {
    state.isLoggedIn = true;
  },
  [PENDING_SUCCESS](state) {
    state.pending = false;
  },
  [LOGOUT](state) {
    state.isLoggedIn = false;
  },
};

const actions = {
  incrementAsync({ commit }) {
    setTimeout(() => {
      commit('INCREMENT');
    }, 200);
  },
  login({ commit }, creds) {
    console.log(creds);
    commit(PENDING_START); // show spinner
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem('token', 'JWT');
        commit(LOGIN_SUCCESS);
        commit(PENDING_END);
        resolve();
      }, 1000);
    });
  },
  logout({ commit }) {
    localStorage.removeItem('token');
    commit(LOGOUT);
    router.push('/login');
    // dispatch('router/ROUTE_CHANGED', { path: '/' });
  },
  register({ commit }, creds) {
    console.log(creds);
    commit(PENDING_START); // show spinner
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem('token', 'JWT');
        commit(LOGIN_SUCCESS);
        resolve();
      }, 1000);
    });
  },
};
const getters = {
  isLoggedIn: state => state.isLoggedIn,
};

const store = new Vuex.Store({
  state: defaultState,
  mutations,
  actions,
  getters,
});

export default store;
