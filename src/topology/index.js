// 引入组件
import topologyGraph from './src/index.vue';
topologyGraph.install = Vue => Vue.component(topologyGraph.name, topologyGraph);

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(topologyGraph);
}

export default topologyGraph;