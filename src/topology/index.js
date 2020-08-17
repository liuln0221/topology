// 引入组件
import topology from './src/index.vue';
topology.install = Vue => Vue.component(topology.name, topology);

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(topology);
}

export default topology;