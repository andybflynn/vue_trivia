import Vue from 'vue';
import App from "/components/App.vue";
import store from "./store/store";

new Vue({
  render: h => h(App),
  store
}).$mount("#app");