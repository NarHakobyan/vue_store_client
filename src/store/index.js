import Vuex from 'vuex';
import AuthState from '@/store/auth.state';
import StoreState from '@/store/store.state';
import { PENDING_ERROR, PENDING_START, PENDING_SUCCESS } from '@/store/types/pending.types';


const defaultState = {
  pending: false,
  errors: null,
  isLoggedIn: !!localStorage.getItem('token'),
};

const mutations = {
  [PENDING_START](state) {
    state.pending = true;
    state.errors = null;
  },
  [PENDING_SUCCESS](state) {
    state.pending = false;
    state.errors = null;
  },
  [PENDING_ERROR](state, errors) {
    state.errors = errors;
  },
};

const actions = {
};
const getters = {
  hasError: state => state.errors !== null,
  pendingErrors: state => state.errors && state.errors.map(error => error.message).join(',\n'),
};

const store = new Vuex.Store({
  state: defaultState,
  mutations,
  actions,
  getters,
  modules: {
    auth: AuthState,
    store: StoreState,
  },
});

export default store;
