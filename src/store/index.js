import Vuex from 'vuex';
import AuthState from '@/store/auth.state';
import StoreState from '@/store/store.state';
import ModalState from '@/store/modal.state';
import { CLEAR_PENDING, PENDING_ERROR, PENDING_START, PENDING_SUCCESS } from '@/store/types/pending.types';

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
  [CLEAR_PENDING](state) {
    state.errors = null;
    state.pending = false;
  },
};

const actions = {
  clearPending({ commit }) {
    commit(CLEAR_PENDING);
  },
};
const getters = {
  hasError: state => state.errors !== null,
  pendingErrors: state => state.errors && state.errors.map(error => error.message).join(',\n'),
  isPending: state => state.pending,
};

const store = new Vuex.Store({
  state: defaultState,
  mutations,
  actions,
  getters,
  modules: {
    auth: AuthState,
    store: StoreState,
    modal: ModalState,
  },
});

export default store;
