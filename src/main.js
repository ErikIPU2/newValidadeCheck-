import Vue from 'vue'
import App from './App.vue'
import vueFire from "vuefire"

Vue.use(vueFire);

new Vue({
  el: '#app',
  render: h => h(App)
})
