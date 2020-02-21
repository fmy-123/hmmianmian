import Vue from 'vue'
import App from './App.vue'
// 导入路由
import router from './router/index'
//导入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'jquery/dist/jquery.min'
import 'bootstrap/dist/css/bootstrap.css'


// 导入全局样式
import  './style/base.css'
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
 


}).$mount('#app')
