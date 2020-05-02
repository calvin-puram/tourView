import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VueNoty from 'vuejs-noty';
import axios from 'axios';
import authMixin from '@mixins/authMixins';
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';
import 'vuejs-noty/dist/vuejs-noty.css';
import 'leaflet/dist/leaflet.css';

import { Icon } from 'leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

NProgress.configure({ showSpinner: true });
Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.mixin(authMixin);
const token = JSON.parse(localStorage.getItem('auth')) || '';
Vue.prototype.$http.defaults.headers.common[
  'Authorization'
] = `Bearer ${token.token}`;
Vue.use(VueNoty);
import 'vuejs-noty/dist/vuejs-noty.css';

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
