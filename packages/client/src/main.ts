import Vue from 'vue';
import GSignInButton from 'vue-google-signin-button';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/styles/index.scss';

Vue.use(GSignInButton);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
