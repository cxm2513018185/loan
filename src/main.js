import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as filters from './filters/index';
import './utils/directives';
//导入路由拦截
import './permission'

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.url = "http://139.196.42.209:5004";

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
