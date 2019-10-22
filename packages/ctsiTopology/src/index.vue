<template>
  <div id="topology">
    <!-- 操作按钮 -->
    <div class="operateBtn" v-if="operateButton" :class="operateButtonPosition">
      <!-- 放大 -->
      <button
        @click="graph.zoomIn()"
      >放大</button>
      <!-- 缩小 -->
      <button
        @click="graph.zoomOut()"
      >缩小</button>
      <!-- 还原 -->
      <button
        @click="graph.zoomActual();graph.center(true, true, 0.5, 0.5);"
      >还原</button>
    </div>
    <!-- 拓扑图 -->
    <div id="topologyDetail">
      <div id="id" ref="topology"></div>
    </div>
  </div>
</template>

<script>
import { TopoModel } from './Topology.model';
import './Topology.css';

export default {
  name: 'ctsiTopology',
  props: {
    data: Array,
    connectLine: Array,
    nodeKey: {
      type: String,
      default: 'id'
    },
    nodeDbclick: {
      type: Boolean,
      default: false
    },
    props: Object,
    connectLineStyle: String,
    operateButton: {
      type: Boolean,
      default: true
    },
    operateButtonPosition: {
      type: String,
      default: 'top center'
    }
  },
  data() {
    return {
      name: '',
      parent: {},
      graph: {}
    }
  },
  methods: {
    propsInit() {
      this.props.label = this.props.label ? this.props.label : 'label'
      this.props.children = this.props.children ? this.props.children : 'children';
      this.props.detailConfig = this.props.detailConfig ? this.props.detailConfig : 'detailConfig';
      this.props.buildInName = this.props.buildInName ? this.props.buildInName : 'buildInName';
      this.props.buildInKey = this.props.buildInKey ? this.props.buildInKey : this.nodeKey;
    },
    /**
     * 获取拓扑图
     */
    getTopology() {
      this.load();

      if (this.nodeDbclick) {
        // 双击事件
        this.graph.addListener('doubleClick', (sender, evt) => {
          const cell = evt.getProperty('cell');
          if (cell && cell.detail) {
            this.$emit('node-click', cell.detail);
          }
        });
      } else {
        // 单击事件
        this.graph.click = (me) => {
          if (me.state && me.state.cell.detail) {
            this.$emit('node-click', me.state.cell.detail);
          }
        };
      }
      
    },
    load() {
      const model = new TopoModel(document.getElementById('id'), this.props);
      this.graph = model.graph;
      this.parent = model.parent;
      model.graphInit();
      model.graphEvent();
      model.setDefaultEdgeStyle();

      const nodes = {};

      // 设置节点
      const data = this.data; // 设备
      const connectLines = this.connectLine || [];  // 连线

      data.forEach((item, index) => {
        let prevWidth = 20;
        item.forEach(e => {
          if (e.children && e.children.length > 0) {
            // 父节点总宽度
            let includesWidth = 20;
            e.children.forEach(child => {
              includesWidth += 20 + (child[this.props.buildInName] && child[this.props.buildInName].length > 0
              ? (child[this.props.buildInName].length + 1) * 25 > 100 ? (child[this.props.buildInName].length + 1) * 25  : 100
              : 100);
            });
            // 内置节点总宽度
            const portsWidth = e[this.props.buildInName] ? e[this.props.buildInName].length * 30 : 0;
            // 父节点宽度
            const uniteWidth = includesWidth > portsWidth ? includesWidth + 27 : portsWidth + 27;
            // 父节点
            const label = e.sn ? e.sn : e.name;
            nodes[e[this.nodeKey]] =  model.getParentNode(this.parent, 0, index * 190 + 50, uniteWidth, 180, label);
            nodes[e[this.nodeKey]].detail = e;
            // 子节点
            e.children.forEach((child, index) => {
              const x = index > 0
                ? 20 + nodes[e.children[index - 1][this.nodeKey]].geometry.x
                  + nodes[e.children[index - 1][this.nodeKey]].geometry.width
                : nodes[e[this.nodeKey]].geometry.getCenterX() - includesWidth / 2 + 20 + 13.5;
              nodes[child[this.nodeKey]] = model.getNode(nodes[e[this.nodeKey]], child, x, 30, child[this.props.label], child.iconClass);
              // 内置节点
              if (child[this.props.buildInName]) {
                child[this.props.buildInName].forEach((b, bIndex) => {
                  nodes[b[this.props.buildInKey]] = model.getBuildIn(nodes[child[this.nodeKey]], child, bIndex, b.iconClass);
                });
              }
            });
            // 父节点内置节点
            if (e[this.props.buildInName]) {
              e[this.props.buildInName].forEach((b, bIndex) => {
                nodes[b[this.props.buildInKey]] = model.getBuildIn(nodes[e[this.nodeKey]], e, bIndex, b.iconClass);
                nodes[b[this.props.buildInKey]].geometry.x += 15;
              });
            }
          } else {
            nodes[e[this.nodeKey]] = model.getNode(this.parent, e, 0, index * 190 + 50 + 30, e[this.props.label], e.iconClass);
            nodes[e[this.nodeKey]].prev = true;
            // 内置节点
            if (e[this.props.buildInName]) {
              e[this.props.buildInName].forEach((b, bIndex) => {
                nodes[b[this.props.buildInKey]] = model.getBuildIn(nodes[e[this.nodeKey]], e, bIndex, b.iconClass);
                nodes[b[this.props.buildInKey]].prev = true;
              });
            }
          }
          prevWidth += 20 + nodes[e[this.nodeKey]].geometry.width;
        });
        // x
        item.forEach((e, index) => {
          nodes[e[this.nodeKey]].geometry.x += index > 0
            ? 20 + nodes[item[index - 1][this.nodeKey]].geometry.x
              + nodes[item[index - 1][this.nodeKey]].geometry.width
            : 0 - prevWidth / 2 + 20;
        });
      });

      // 连线
      connectLines.forEach(item => {
        const local = nodes[item.local];
        const opposite = nodes[item.opposite];
        model.getEdge(local, opposite, this.connectLineStyle || '', item.style || '');
      });

      model.endUpdate(document.getElementById('topologyDetail'));
    }
  },
  mounted() {
    this.propsInit(); // props属性默认值
    this.getTopology(); // 拓扑图
  }
}
</script>
