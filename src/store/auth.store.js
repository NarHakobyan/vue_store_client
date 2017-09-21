import { PENDING_START, PENDING_SUCCESS } from '@/store/types/pending.types';
import User from '@/resources/User';
import Auth from '@/resources/Auth';

import { LOGIN_SUCCESS, LOGOUT } from './types/auth.types';

const defaultState = {
  isLoggedIn: !!localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user')) || null,
};

const mutations = {
  [LOGIN_SUCCESS](state, user) {
    state.isLoggedIn = true;
    state.user = user;
  },
  [LOGOUT](state) {
    state.isLoggedIn = false;
  },
};

const actions = {
  async login({ commit }, credentials) {
    commit(PENDING_START);
    const response = await Auth.login(credentials);
    const resObject = await response.json();
    localStorage.setItem('token', resObject.data.token);
    localStorage.setItem('user', JSON.stringify(resObject.data.user));
    commit(PENDING_SUCCESS);
    commit(LOGIN_SUCCESS, resObject.data.user);
    return response;
  },
  logout({ commit }) {
    localStorage.clear();
    commit(LOGOUT);
    return Promise.resolve();
  },
  register({ commit }, credentials) {
    commit(PENDING_START);
    return User.save(credentials).then((...args) => {
      commit(PENDING_SUCCESS);
      return Promise.resolve(...args);
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
