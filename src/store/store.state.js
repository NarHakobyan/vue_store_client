import { PENDING_START, PENDING_SUCCESS } from '@/store/types/pending.types';
import { CLEAR_STORE, CLEAR_STORE_ADMINS, CLEAR_STORES, DELETE_STORE, SET_STORE, SET_STORE_ADMINS, SET_STORES } from '@/store/types/store.types';
import Store from '@/resources/Store';

const defaultState = {
  stores: null,
  store: null,
  storeAdmins: null,
  allStoresCount: 0,
  filteredStoresCount: 0,
};

const mutations = {
  [SET_STORES](state, payload) {
    state.stores = payload.stores;
    state.allStoresCount = payload.allStoresCount;
    state.filteredStoresCount = payload.filteredStoresCount;
  },
  [CLEAR_STORES](state) {
    Object.assign(state, defaultState);
  },
  [CLEAR_STORE](state) {
    state.store = null;
  },
  [SET_STORE](state, store) {
    state.store = store;
  },
  [DELETE_STORE](state, storeId) {
    state.stores = state.stores.filter(store => store['_id'] !== storeId);
  },
  [CLEAR_STORE_ADMINS](state) {
    state.storeAdmins = null;
  },
  [SET_STORE_ADMINS](state, storeAdmins) {
    state.storeAdmins = storeAdmins;
  },
};

const actions = {
  async getStores({ commit }) {
    commit(PENDING_START);
    commit(CLEAR_STORES);
    const response = await Store.get();
    const resObject = await response.json();
    commit(PENDING_SUCCESS);
    commit(SET_STORES, resObject.data);
    return response;
  },
  async getStore({ commit }, storeId) {
    commit(PENDING_START);
    commit(CLEAR_STORE);
    const response = await Store.get({ storeId });
    const resObject = await response.json();
    commit(PENDING_SUCCESS);
    commit(SET_STORE, resObject.data);
    return response;
  },
  async deleteStore({ commit }, storeId) {
    commit(PENDING_START);
    const response = await Store.delete({ storeId });
    commit(PENDING_SUCCESS);
    commit(DELETE_STORE, storeId);
    return response;
  },
  async getStoreAdmins({ commit }, storeId) {
    commit(PENDING_START);
    commit(CLEAR_STORE_ADMINS);
    const response = await Store.admins({ storeId });
    const resObject = await response.json();
    commit(PENDING_SUCCESS);
    commit(SET_STORE_ADMINS, resObject.data);
    return response;
  },
};

const getters = {
  stores: state => state.stores,
  allStoresCount: state => state.allStoresCount,
  filteredStoresCount: state => state.filteredStoresCount,
  store: state => state.store,
  storeAdmins: state => state.storeAdmins,
};

export default {
  state: defaultState,
  mutations,
  actions,
  getters,
};
