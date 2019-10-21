<template>
  <div id="topology">
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
    data: Object,
    nodeKey: {
      type: String,
      default: 'id'
    },
    nodeLabel: {
      type: String,
      default: 'name'
    },
    nodeChildKey: String,
    connectLineStyle: String
  },
  data() {
    return {
      name: '',
      parent: {},
      graph: {}
    }
  },
  methods: {
    /**
     * 获取拓扑图
     */
    getTopology() {
      this.load();
      // 单击事件
      this.graph.click = (me) => {
        if (me.state && me.state.cell.detail) {
          this.$emit('clickNode', me.state.cell.detail);
        }
      };
      // 双击事件
      this.graph.addListener('doubleClick', (sender, evt) => {
        const cell = evt.getProperty('cell');
        if (cell && cell.detail) {
          this.$emit('dbClickNode', cell.detail);
        }
      });
    },
    load() {
      const model = new TopoModel(document.getElementById('id'));
      this.graph = model.graph;
      this.parent = model.parent;
      model.graphInit();
      model.graphEvent();
      model.setDefaultEdgeStyle();

      const nodes = {};

      // 设置节点
      const data = this.data.data; // 设备
      const connectLines = this.data.connectLines || [];  // 连线

      data.forEach((item, index) => {
        let prevWidth = 20;
        item.forEach(e => {
          if (e.children && e.children.length > 0) {
            // 承载设备总宽度
            let includesWidth = 20;
            e.children.forEach(child => {
              includesWidth += 20 + (child[this.nodeChildKey] && child[this.nodeChildKey].length > 0
              ? (child[this.nodeChildKey].length + 1) * 25 > 100 ? (child[this.nodeChildKey].length + 1) * 25  : 100
              : 100);
            });
            // 端口总宽度
            const portsWidth = e[this.nodeChildKey] ? e[this.nodeChildKey].length * 30 : 0;
            // 业务设备宽度
            const uniteWidth = includesWidth > portsWidth ? includesWidth + 27 : portsWidth + 27;
            // 业务设备
            const label = e.sn ? e.sn : e.name;
            nodes[e[this.nodeKey]] =  model.getNodeOfHasChildren(this.parent, 0, index * 190 + 50, uniteWidth, 180, label);
            nodes[e[this.nodeKey]].detail = e;
            // 承载设备
            e.children.forEach((child, index) => {
              const x = index > 0
                ? 20 + nodes[e.children[index - 1][this.nodeKey]].geometry.x
                  + nodes[e.children[index - 1][this.nodeKey]].geometry.width
                : nodes[e[this.nodeKey]].geometry.getCenterX() - includesWidth / 2 + 20 + 13.5;
              nodes[child[this.nodeKey]] = model.getNode(nodes[e[this.nodeKey]], child, x, 30, child[this.nodeLabel], child.iconClass, this.nodeChildKey);
              // 端口
              if (child[this.nodeChildKey]) {
                child[this.nodeChildKey].forEach((port, portIndex) => {
                  nodes[port[this.nodeKey]] = model.getPort(nodes[child[this.nodeKey]], child, portIndex, port.iconClass);
                });
              }
            });
            // 业务设备端口
            if (e[this.nodeChildKey]) {
              e[this.nodeChildKey].forEach((port, index) => {
                nodes[port[this.nodeKey]] = model.getPort(nodes[e[this.nodeKey]], e, index, port.iconClass);
                nodes[port[this.nodeKey]].geometry.x += 15;
              });
            }
          } else {
            nodes[e[this.nodeKey]] = model.getNode(this.parent, e, 0, index * 190 + 50 + 30, e[this.nodeLabel], e.iconClass, this.nodeChildKey);
            nodes[e[this.nodeKey]].prev = true;
            // 端口
            if (e[this.nodeChildKey]) {
              e[this.nodeChildKey].forEach((port, portIndex) => {
                nodes[port[this.nodeKey]] = model.getPort(nodes[e[this.nodeKey]], e, portIndex, port.iconClass);
                nodes[port[this.nodeKey]].prev = true;
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
    this.getTopology(); // 拓扑图
  }
}
</script>
