import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VueNoty from 'vuejs-noty';
import axios from 'axios';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
const token = JSON.parse(localStorage.getItem('auth')) || null;
Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
Vue.use(VueNoty);
import 'vuejs-noty/dist/vuejs-noty.css';

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
