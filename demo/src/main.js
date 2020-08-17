import Vue from 'vue'
import App from './App.vue'

// 单独引入指令文件
// import topology from '../packages/topology/index'
// 整体引入包
import pkgName from '../../src/index'

import './styles/index.css'

Vue.use(pkgName)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
