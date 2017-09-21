import Vue from 'vue';
import { AUTH_RESOURCE_URL } from '@/common/constants';

const actions = {
  login: { method: 'POST', url: `${AUTH_RESOURCE_URL}/login` },
};
export default Vue.resource(AUTH_RESOURCE_URL, {}, actions);
