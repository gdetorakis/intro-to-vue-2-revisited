// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

// eslint-disable-next-line import/prefer-default-export
export const eventBus = new Vue();

// eslint-disable-next-line no-new, no-unused-vars
const app = new Vue({
  el: '#app',
  router,
  components: { App },

  render(createElement) {
    return createElement(App);
  },
});
