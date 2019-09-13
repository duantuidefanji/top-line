/* eslint-disable no-undef */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import VeeValidate, { Validator } from 'vee-validate'
import zhCN from 'vee-validate/dist/locale/zh_CN'
import { fmtDate } from '@/utils/dayjs'
import checkLogin from '@/utils/checkLogin'

import 'vant/lib/index.css'
import './style/index.less'
Vue.filter('fmtDate', fmtDate)

Vue.use(Vant) // 注册 vant 插件
// Vue.use(VeeValidate) // 注册 VeeValidate 校验插件
Vue.use(checkLogin) // 注册插件

Vue.use(VeeValidate, {
  events: ''
})

Validator.localize('zhCN', zhCN)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
