import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const base = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
  },
});

Vue.prototype.$http = base;
Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") == null) {
      next({
        path: "/"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
