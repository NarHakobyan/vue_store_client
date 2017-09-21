import router from '@/router';
import { PENDING_ERROR, PENDING_START, PENDING_SUCCESS } from '@/store/types/pending.types';
import User from '@/resources/User';

import { LOGIN_SUCCESS, LOGOUT } from './types/auth.types';

const defaultState = {
  isLoggedIn: !!localStorage.getItem('token'),
};

const mutations = {
  [LOGIN_SUCCESS](state) {
    state.isLoggedIn = true;
  },
  [LOGOUT](state) {
    state.isLoggedIn = false;
  },
};


const actions = {
  login({ commit }, creds) {
    console.log(creds);
    commit(PENDING_START); // show spinner
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem('token', 'JWT');
        commit(LOGIN_SUCCESS);
        commit(PENDING_SUCCESS);
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
    return User.save(creds).then((...args) => {
      commit(PENDING_SUCCESS);
      return Promise.resolve(...args);
    }).catch((...args) => {
      commit(PENDING_ERROR, args[0]);
      return Promise.reject(...args);
    });
  },
};


const getters = {
  isLoggedIn: state => state.isLoggedIn,
};

export default {
  state: defaultState,
  mutations,
  actions,
  getters,
};
