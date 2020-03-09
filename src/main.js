import Vue from 'vue';
import 'buefy/dist/buefy.css';
import App from './App.vue';
import '~/inspire-tree-dom/dist/inspire-tree-dark.css';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
