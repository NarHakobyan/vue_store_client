import pick from 'lodash/pick';

import { CLEAR_MODAL_CONFIG, SET_MODAL_CONFIG, SET_MODAL_CONFIRM, SET_MODAL_CONFIRM_ACTION, SET_MODAL_FAIL_ACTION, SET_MODAL_ICON, SET_MODAL_REF } from '@/store/types/modal.types';

const defaultState = {
  icon: 'success',
  theme: 'light',
  message: null,
  confirm: false,
  confirmAction: null,
  failAction: null,
  ref: null,
};

const mutations = {
  [SET_MODAL_CONFIG](state, payload) {
    Object.assign(state, pick(payload, Object.keys(defaultState)));
  },
  [SET_MODAL_ICON](state, payload) {
    state.icon = payload;
  },
  [SET_MODAL_CONFIRM](state, payload) {
    state.confirm = payload;
  },
  [CLEAR_MODAL_CONFIG](state) {
    Object.assign(state, defaultState);
  },
  [SET_MODAL_REF](state, payload) {
    state.ref = payload;
  },
  [SET_MODAL_CONFIRM_ACTION](state, payload) {
    state.confirmAction = payload;
  },
  [SET_MODAL_FAIL_ACTION](state, payload) {
    state.failAction = payload;
  },
};

const actions = {
  async showModal({ commit, state }, configs) {
    commit(SET_MODAL_CONFIG, configs);
    const confirmAction = async () => {
      if (configs.confirmAction) {
        state.ref.close();
        await configs.confirmAction();
      }
    };
    const failAction = async () => {
      if (configs.failAction) {
        state.ref.close();
        await configs.failAction();
      }
    };
    commit(SET_MODAL_CONFIG, Object.assign({}, configs, { confirmAction, failAction }));
    state.ref.open();
  },
  async showConfirmModal({ commit, state }, configs) {
    const confirmAction = async () => {
      state.ref.close();
      if (configs.confirmAction) {
        await configs.confirmAction();
      }
    };
    const failAction = async () => {
      state.ref.close();
      if (configs.failAction) {
        await configs.failAction();
      }
    };
    commit(SET_MODAL_CONFIG, pick(configs, ['theme', 'message']));
    commit(SET_MODAL_ICON, 'warning');
    commit(SET_MODAL_CONFIRM_ACTION, confirmAction);
    commit(SET_MODAL_FAIL_ACTION, failAction);
    commit(SET_MODAL_CONFIRM, true);
    state.ref.open();
  },
  async setModalRef({ commit }, ref) {
    commit(SET_MODAL_REF, ref);
  },
};

const getters = {
  modal: state => Object.assign({}, state),
};

export default {
  state: defaultState,
  mutations,
  actions,
  getters,
};
