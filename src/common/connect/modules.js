import Vue from 'vue';
import Vuex from 'vuex';
import VeeValidate from 'vee-validate';
import VueResource from 'vue-resource';
import VueNotifications from 'vue-notification';

import AuthIntercepter from '@/common/auth.intercepter';

Vue.use(VueNotifications);
Vue.use(VeeValidate);
Vue.use(VueResource);
Vue.use(Vuex);

Vue.http.interceptors.push(AuthIntercepter);
