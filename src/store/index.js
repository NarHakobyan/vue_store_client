import Vue from 'vue';
import Vuex from 'vuex';
import AuthStore from '@/store/auth.store';
import { PENDING_ERROR, PENDING_START, PENDING_SUCCESS } from '@/store/types/pending.types';

Vue.use(Vuex);

const defaultState = {
  pending: false,
  error: null,
  isLoggedIn: !!localStorage.getItem('token'),
};

const mutations = {
  [PENDING_START](state) {
    state.pending = true;
  },
  [PENDING_SUCCESS](state) {
    state.pending = false;
    state.error = null;
  },
  [PENDING_ERROR](state, error) {
    state.error = error;
  },
};

const actions = {
};
const getters = {
};

const store = new Vuex.Store({
  state: defaultState,
  mutations,
  actions,
  getters,
  modules: {
    auth: AuthStore,
  },
});

export default store;
