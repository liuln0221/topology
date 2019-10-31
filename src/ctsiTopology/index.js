// 引入组件
import ctsiTopology from './src/index.vue';
ctsiTopology.install = Vue => Vue.component(ctsiTopology.name, ctsiTopology);

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(ctsiTopology);
}

export default ctsiTopology;