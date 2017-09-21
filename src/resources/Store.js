import Vue from 'vue';
import { STORE_RESOURCE_URL } from '@/common/constants';

const actions = {
  admins: { method: 'GET', url: `${STORE_RESOURCE_URL}/admins` },
};

export default Vue.resource(STORE_RESOURCE_URL, {}, actions);
