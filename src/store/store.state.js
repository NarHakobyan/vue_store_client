import { PENDING_START, PENDING_SUCCESS } from '@/store/types/pending.types';
import { SET_STORE, CLEAR_STORE } from '@/store/types/store.types';
import Store from '@/resources/Store';

const defaultState = {
  stores: null,
  allStoresCount: 0,
  filteredStoresCount: 0,
};

const mutations = {
  [SET_STORE](state, payload) {
    state.stores = payload.stores;
    state.allStoresCount = payload.allStoresCount;
    state.filteredStoresCount = payload.filteredStoresCount;
  },
  [CLEAR_STORE](state) {
    state.stores = defaultState.stores;
    state.allStoresCount = defaultState.allStoresCount;
    state.filteredStoresCount = defaultState.filteredStoresCount;
  },
};

const actions = {
  async getStores({ commit }) {
    commit(PENDING_START);
    commit(CLEAR_STORE);
    const response = await Store.get();
    const resObject = await response.json();
    console.log(resObject);
    commit(PENDING_SUCCESS);
    commit(SET_STORE, resObject.data);
    return response;
  },
};

const getters = {
  stores: state => state.stores,
  allStoresCount: state => state.allStoresCount,
  filteredStoresCount: state => state.filteredStoresCount,
};

export default {
  state: defaultState,
  mutations,
  actions,
  getters,
};
