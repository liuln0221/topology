<template>
  <div class="example">
    <ctsi-topology :data="topology" node-key="instId" node-label="sn" node-child-key="ports" connect-line-style=""  @clickNode="topologyClick" @dbClickNode="topologyDbClick"></ctsi-topology>
  </div>
</template>

<script>
const nodeDetailConfig = {
  title: '设备信息',
  config: [
    // 序列号
    {
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
      topology: {
        data: [
          [
            {
              instId: 3467,
              ports: [],
              sn: "防火墙-01",
              iconClass: 'icon-title-firewall',
              detailConfig: nodeDetailConfig
            }
          ],
          [
            {
              instId: 2933,
              ports: [
                {
                  bandWidth: "万兆口",
                  instId: 3385,
                  ip: "",
                  macOrWwn: "",
                  name: "交换机-02/0",
                  type: "光口",
                  vlan: "",
                  iconClass: 'icon-title-port',
                  showDetail: true,
                  detailConfig: {
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
                  instId: 3386,
                  ip: "",
                  macOrWwn: "",
                  name: "交换机-02/1",
                  type: "光口",
                  vlan: "",
                  iconClass: 'icon-title-port'
                },
                {
                  bandWidth: "万兆口",
                  instId: 3387,
                  ip: "",
                  macOrWwn: "",
                  name: "交换机-02/2",
                  type: "光口",
                  vlan: "",
                  iconClass: 'icon-title-port'
                },
                {
                  bandWidth: "万兆口",
                  instId: 3388,
                  ip: "",
                  macOrWwn: "",
                  name: "交换机-02/3",
                  type: "光口",
                  vlan: "",
                  iconClass: 'icon-title-port'
                },
                {
                  bandWidth: "万兆口",
                  instId: 3389,
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
                  instId: 2936,
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
              ports: [{
                bandWidth: "万兆口",
                instId: 2915,
                instName: "7cc48e_liulina-0926_服务器-01_服务器-01_1",
                ip: "",
                macOrWwn: "",
                name: "服务器-01/1",
                type: "光口",
                vlan: "",
                iconClass: 'icon-title-port',
                detailConfig: nodeChildDetailConfig
              }, {
                bandWidth: "万兆口",
                instId: 2915,
                instName: "7cc48e_liulina-0926_服务器-01_服务器-01_1",
                ip: "",
                macOrWwn: "",
                name: "服务器-01/2",
                type: "光口",
                vlan: "",
                iconClass: 'icon-title-port'
              }, {
                bandWidth: "万兆口",
                instId: 2915,
                instName: "7cc48e_liulina-0926_服务器-01_服务器-01_1",
                ip: "",
                macOrWwn: "",
                name: "服务器-01/3",
                type: "光口",
                vlan: "",
                iconClass: 'icon-title-port'
              }, {
                bandWidth: "万兆口",
                instId: 2915,
                instName: "7cc48e_liulina-0926_服务器-01_服务器-01_1",
                ip: "",
                macOrWwn: "",
                name: "服务器-01/4",
                type: "光口",
                vlan: "",
                iconClass: 'icon-title-port'
              }],
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
                  instId: 3116,
                  instName: "7cc48e_liulina-0926_服务器-01_服务器-01_1",
                  ip: "",
                  macOrWwn: "",
                  name: "分布式存储-01-dddddddddddd/1",
                  type: "光口",
                  vlan: "",
                  iconClass: 'icon-title-port'
                }
              ],
              name: "分布式存储-01-dddddddddddd",
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
                      instId: 3115,
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
            }
          ],
          [
            {
              instId: 3468,
              ports: [],
              sn: "防火墙-02",
              iconClass: 'icon-title-firewall',
              detailConfig: nodeDetailConfig
            },
            {
              instId: 2934,
              ports: [],
              name: "分布式存储-01-dddddddddddd",
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
                      instId: 3115,
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
