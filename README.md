# ctsi-topology
```
基于mxGraph的拓扑图，目前只有展示功能，编辑功能后续会更新。
```

## Project setup
```
yarn install
npm install
```

### Compiles and hot-reloads for development
```
yarn run serve
npm run serve
```

### Compiles and minifies for production
```
yarn run build
npm run build
```

### 示例

#### 效果图

![image](https://github.com/liuln0221/ctsi-topology/blob/master/Demo/topology.png)

#### 代码

##### 1.引入（main.js）

`import Vue from 'vue';` </br>
`import CtsiTopology from 'ctsi-topology';` // 整体引入包 </br>
`import 'ctsi-topology/dist/ctsi-topology.css';` // 引入组件样式 </br>
`import App from './App.vue';` </br>

`Vue.use(CtsiTopology);`

`new Vue({`
`  el: '#app',`
`  render: h => h(App)`
`});`

#### 2.使用

`<template>` </br>
`  <div class="example">` </br>
`    <ctsi-topology` </br>
`      :data="data"` </br>
`      :connect-line="connectLines"` </br>
`      node-key="instId"` </br>
`      :props="defaultProps"` </br>
`      @node-click="topologyClick"></ctsi-topology>` </br>
`  </div>` </br>
`</template>` </br>

`<script>`
`const nodeDetailConfig = {`
`  title: '设备信息',`
`  config: [`
`    {`
      label: '序列号',
      value: 'sn'
    },
    // 名称
    {
      label: '名称',
      value: 'name'
    },
    // 资产编号
    {
      label: '资产编号',
      value: 'identifier'
    },
    // 机房
    {
      label: '机房',
      value: 'roomName'
    },
    // 机柜
    {
      label: '机柜',
      value: 'cabinetName'
    },
    // U位（容占）
    {
      label: '容占',
      value: 'startU'
    },
    // 设备类型
    {
      label: '设备类型',
      value: 'classify'
    }
  ]
};
const nodeChildDetailConfig = {
  title: '端口信息',
  config: [
    // 端口名称
    {
      label: '端口名称',
      value: 'name'
    },
    // 端口带宽
    {
      label: '端口带宽',
      value: 'bandWidth'
    },
    // 端口类型
    {
      label: '端口类型',
      value: 'type'
    },
    // MAC/WWN
    {
      label: 'MAC/WWN',
      value: 'macOrWwn'
    },
    // IP
    {
      label: 'IP',
      value: 'ip'
    },
    // VLAN
    {
      label: 'VLAN',
      value: 'vlan'
    }
  ]
};
export default {
  name: 'Example',
  data() {
    return {
      defaultProps: {
        label: 'sn',
        detailConfig: 'detailModal',
        buildInName: 'ports',
        buildInKey: 'id'
      },
      data: [
        [
          {
            instId: 2933,
            ports: [
              {
                bandWidth: "万兆口",
                id: 3385,
                ip: "",
                macOrWwn: "",
                name: "交换机-02/0",
                type: "光口",
                vlan: "",
                iconClass: 'icon-title-port',
                showDetail: true,
                detailModal: {
                  title: '端口信息111',
                  config: [
                    // 端口名称
                    {
                      label: '端口名称',
                      value: 'name'
                    },
                    // 端口带宽
                    {
                      label: '端口带宽',
                      value: 'bandWidth'
                    },
                    // 端口类型
                    {
                      label: '端口类型',
                      value: 'type'
                    },
                    // MAC/WWN
                    {
                      label: 'MAC/WWN',
                      value: 'macOrWwn'
                    }
                  ]
                }
              },
              {
                bandWidth: "万兆口",
                id: 3386,
                ip: "",
                macOrWwn: "",
                name: "交换机-02/1",
                type: "光口",
                vlan: "",
                iconClass: 'icon-title-port'
              },
              {
                bandWidth: "万兆口",
                id: 3387,
                ip: "",
                macOrWwn: "",
                name: "交换机-02/2",
                type: "光口",
                vlan: "",
                iconClass: 'icon-title-port'
              },
              {
                bandWidth: "万兆口",
                id: 3388,
                ip: "",
                macOrWwn: "",
                name: "交换机-02/3",
                type: "光口",
                vlan: "",
                iconClass: 'icon-title-port'
              },
              {
                bandWidth: "万兆口",
                id: 3389,
                ip: "",
                macOrWwn: "",
                name: "交换机-02/4",
                type: "光口",
                vlan: "",
                iconClass: 'icon-title-port'
              }
            ],
            sn: "交换机-02",
            iconClass: 'icon-title-switch'
          }
        ],
        [
          {
            instId: 2941,
            ports: [
              {
                bandWidth: "万兆口",
                connectAssetId: 0,
                connectAssetSN: "交换机-02",
                connectPortId: 0,
                connectPortName: null,
                id: 2936,
                instName: "7cc48e_liulina-0926_服务器-02_服务器-02_0",
                ip: "",
                macOrWwn: "",
                name: "服务器-02/0",
                type: "光口",
                vlan: "",
                iconClass: 'icon-title-port'
              }
            ],
            sn: "服务器-02",
            iconClass: 'icon-title-server'
          },
          {
            instId: 2925,
            ports: [
              {
                bandWidth: "万兆口",
                id: 2915,
                instName: "7cc48e_liulina-0926_服务器-01_服务器-01_1",
                ip: "",
                macOrWwn: "",
                name: "服务器-01/1",
                type: "光口",
                vlan: "",
                iconClass: 'icon-title-port',
                detailModal: nodeChildDetailConfig
              }, {
                bandWidth: "万兆口",
                id: 2915,
                instName: "7cc48e_liulina-0926_服务器-01_服务器-01_1",
                ip: "",
                macOrWwn: "",
                name: "服务器-01/2",
                type: "光口",
                vlan: "",
                iconClass: 'icon-title-port'
              }, {
                bandWidth: "万兆口",
                id: 2915,
                instName: "7cc48e_liulina-0926_服务器-01_服务器-01_1",
                ip: "",
                macOrWwn: "",
                name: "服务器-01/3",
                type: "光口",
                vlan: "",
                iconClass: 'icon-title-port'
              }, {
                bandWidth: "万兆口",
                id: 2915,
                instName: "7cc48e_liulina-0926_服务器-01_服务器-01_1",
                ip: "",
                macOrWwn: "",
                name: "服务器-01/4",
                type: "光口",
                vlan: "",
                iconClass: 'icon-title-port'
              }
            ],
            sn: "服务器-01",
            iconClass: 'icon-title-server'
          }
        ],
        [
          {
            instId: 2934,
            ports: [
              {
                bandWidth: "万兆口",
                id: 3116,
                instName: "7cc48e_liulina-0926_服务器-01_服务器-01_1",
                ip: "",
                macOrWwn: "",
                name: "分布式存储-01/1",
                type: "光口",
                vlan: "",
                iconClass: 'icon-title-port'
              }
            ],
            name: "分布式存储-01",
            children: [
                {
                instId: 3154,
                ports: [],
                sn: "服务器-03",
                iconClass: 'icon-title-server'
              },
              {
                instId: 3155,
                sn: "服务器-04",
                iconClass: 'icon-title-server',
                ports: [
                  {
                    bandWidth: "万兆口",
                    id: 3115,
                    instName: "7cc48e_liulina-0926_服务器-01_服务器-01_1",
                    ip: "",
                    macOrWwn: "",
                    name: "服务器-04/1",
                    type: "光口",
                    vlan: "",
                    iconClass: 'icon-title-port'
                  }
                ]
              },
              {
                instId: 3156,
                ports: [],
                sn: "服务器-05",
                iconClass: 'icon-title-server'
              }
            ]
          },
          {
            instId: 3467,
            ports: [],
            sn: "防火墙-01",
            iconClass: 'icon-title-firewall',
            detailModal: nodeDetailConfig
          }
        ]
      ],
      connectLines: [
        {
          local: 2933,
          opposite: 2941
        },
        {
          local: 2933,
          opposite: 2925
        },
        {
          local: 2933,
          opposite: 3467
        },
        {
          local: 3385,
          opposite: 2915
        }, {
          local: 3388,
          opposite: 3115,
          style: 'color=#c5c5c5;emphColor=#1296db;dotted=true;arrow=false'
        }
      ] // 连线
    }
  },
  methods: {
    topologyClick(node) {
      alert(node.instId);
    },
    topologyDbClick(node) {
      alert(node.sn);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
`


### 帮助信息

#### 属性

 参数 | 说明 | 类型 | 可选值 | 默认值
 ---- | ---- | ---- | ---- | ----
 data | 展示数据 | array | —— | ——
 node-key | 每个节点用来作为唯一标识的属性，整个拓扑图应该是唯一的 | string | —— | id
 node-dbclick | 点击事件是否双击 | boolean | —— | false
 connect-line | 连线数据配置选项，具体看下表 | array | ——
 connect-line-style | 连线样式配置选项，具体看下表，各属性之间用分号(;)连接，如：width=1;color=#c5c5c5 | string | —— | width=1;  color=#c5c5c5;  emphColor=#1296db;  dotted=false;  arrow=true
 props | 配置选项，具体看下表 | object | —— | ——
 operate-button | 是否展示操作按钮 | boolean | —— | true
 operate-button-position | 操作按钮位置 | string | left / center / right  | center
 
#### connect-line

 参数 | 说明 | 类型 | 可选值 | 默认值
 ---- | ---- | ---- | ---- | ----
 local | 起点，值为节点/内置节点唯一标识 | string,number | —— | ——
 opposite | 终点，值为节点/内置节点唯一标识 | string,number | —— | ——
 style | 样式 | string | —— | 同connect-line-style
 
#### connect-line-style

 参数 | 说明 | 类型 | 可选值 | 默认值
 ---- | ---- | ---- | ---- | ----
 width | 宽度，鼠标经过连线或者连线所在节点时，连线宽度为当前值得两倍 | number | —— | 1
 color | 颜色 | string | —— | #c5c5c5
 emphColor | 强调颜色，鼠标经过连线或者连线所在节点时的颜色 | string | —— | #1296db
 dotted | 虚线 | boolean | —— | false
 arrow | 箭头 | boolean | —— | true
 
#### props

 参数 | 说明 | 类型 | 可选值 | 默认值
 ---- | ---- | ---- | ---- | ----
 label | 指定节点标签为节点对象的某个属性值 | string | —— | ——
 children | 指定子节点为节点对象的某个属性 | string | —— | ——
 iconClass | 节点/内置节点图标样式 | string | —— | icon-title-server
 detailConfig | 指定节点详情展示的配置，配置选项，具体看下表 | object | —— | ——
 buildInName | 指定节点的内置节点为节点对象的某个属性值 | string | —— | ——
 buildInKey | 指定内置节点的唯一标识的属性，整个拓扑图应该是唯一的 | string | —— | 同节点node-key
 
#### detailConfig
 
 参数 | 说明 | 类型 | 可选值 | 默认值
 ---- | ---- | ---- | ---- | ----
 title | 标题 | string | —— | ——
 config | 配置 | array | —— | ——
 
#### 事件

 事件名称 | 说明 | 回调参数
 ---- | ---- | ----
 node-click | 节点被点击时的回调 | 共一个参数：传递给data属性的对象中该节点所对应的对象
