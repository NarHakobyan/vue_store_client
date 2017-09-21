import Vue from 'vue';
import Vuex from 'vuex';
import VeeValidate from 'vee-validate';
import BootstrapVue from 'bootstrap-vue';
import VueResource from 'vue-resource';

import AuthIntercepter from '@/common/auth.intercepter';


Vue.use(VeeValidate);
Vue.use(BootstrapVue);
Vue.use(VueResource);
Vue.use(Vuex);

Vue.http.interceptors.push(AuthIntercepter);
