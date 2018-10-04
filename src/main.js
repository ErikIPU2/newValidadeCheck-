import Vue from 'vue'
import App from './App.vue'
import vueFire from "vuefire"

Vue.use(vueFire);

new Vue({
  el: '#app',
  firebase: function () {
    return {
      anArray: firebase.database().ref()
    }
  },
  render: h => h(App)
})
