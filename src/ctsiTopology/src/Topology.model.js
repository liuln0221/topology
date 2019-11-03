import mx from 'mxgraph';

const mxgraph = mx();
const {
  mxCell,
  // mxCellOverlay,
  mxConstants,
  // mxConstraintHandler,
  // mxConnectionConstraint,
  // mxCellState,
  // mxConnectionHandler,
  // mxCodec,
  // mxEdgeHandler,
  // mxEvent,
  mxHierarchicalLayout,
  mxGeometry,
  mxGraph,
  mxGraphHandler,
  // mxImage,
  // mxMorphing,
  // mxOutline,
  // mxPerimeter,
  mxPoint,
  // mxRectangle,
  // mxShape,
  mxUtils,
  // mxPolyline,
  mxEdgeStyle,
  mxStyleRegistry,
  mxCellTracker,
  // mxTooltipHandler,
  // mxCellRenderer,
  // mxLayoutManager,
  // mxFastOrganicLayout,
  // mxCircleLayout
} = mxgraph;
export class TopoModel {
  constructor(document, props) {
    this.props = props;
    this.graph = new mxGraph(document);
    const parent1 = new mxHierarchicalLayout(this.graph, mxConstants.DIRECTION_NORTH);
    this.parent = parent1.graph.getDefaultParent();
    // Adds cells to the model in a single step
    this.graph.getModel().beginUpdate();
  }

  /**
   * @description 画图结束后操作
   */
  endUpdate(container) {
    // Updates the display
    this.graph.getModel().endUpdate();
    const cells = this.graph.getModel
      ? Object.values(this.graph.getModel().cells).filter((cell) => cell.isVertex())
      : [];
    // 是否存在展示详情的节点
    const isExistDetail = cells.some((cell) => {
      return cell.detail[this.props.detailConfig] && cell.detail[this.props.detailConfig].config.length > 0;
    });
    container.style.height = cells.length > 0
     ? `${container.clientHeight + (isExistDetail ? 190 : 0)}px`
     : '0px';

    this.graph.center(true, true, 0.5, 0.5); // 将画布放到容器中间
  }

  /**
   * @description 拓扑图基本设置
   */
  graphInit() {
    // Enables rubberband selection
    // new mxRubberband(graph);
    // 容器大小自适应
    this.graph.setResizeContainer(true);
    // 是否开启可以拖拽建立关系
    this.graph.setConnectable(true);
    // 是否开启方块上的文字编辑功能
    this.graph.setCellsEditable(true);
    // 启用对齐线帮助定位
    mxGraphHandler.prototype.guidesEnabled = true;
    // 如果你希望graph图只读，可用 graph.setEnabled(false);
    this.graph.setEnabled(false);
    // 鼠标拖动
    this.graph.setAutoSizeCells(true);
    this.graph.setPanning(true);
    this.graph.panningHandler.useLeftButtonForPanning = true;
    // 鼠标划过是高亮显示
    // new mxCellTracker(this.graph, '#409eff');
    // 开启Tooltip功能
    // this.graph.setTooltips(true);
    // this.graph.getTooltip = function(cell) {
    // if (this.model.isVertex(cell)) {
    //   return 'rightclick';
    // }
    // return mxGraph.prototype.getTooltipForCell.apply(this, arguments);

    // const cell = state.cell;

    // if (this.model.isEdge(cell)) {
    //   const source = this.getLabel(this.model.getTerminal(cell, true));
    //   const target = this.getLabel(this.model.getTerminal(cell, false));
    //   return '111';
    // } else {
    //   return this.getLabel(cell);
    // }
    // };
    // new mxTooltipHandler(this.graph, '111');

    // const layoutMgr = new mxLayoutManager(this.graph);
    // layoutMgr.getLayout = function(cell) {
    //   return new mxHierarchicalLayout(this.graph, mxConstants.DIRECTION_NORTH);
    // };

    this.graph.setCellsResizable(true); // 禁止改变元素大小
    // 允许HTML标签
    this.graph.htmlLabels = true;

    // 居中缩放
    this.graph.centerZoom = true;
  }

  /**
   * @description 拓扑图事件
   * @param graph 拓扑对象
   */
  graphEvent() {
    const self = this;

    // 鼠标滑动事件
    let curCell = null;
    const track = new mxCellTracker(this.graph);
    track.mouseMove = (sender, evt) => {
      const cell = evt.getCell();
      const cells = Object.values(self.graph.getModel().cells);
      if (cell) {
        // 设置鼠标样式为手状
        evt.getState().setCursor('pointer');
        curCell = cell;
        if (!cell.detailOf) {
          self.moveNode(cell, true); // 设置边框加粗样式
          // 为节点上所有的连线设置加粗样式
          if (cell.edges) {
            cell.edges.forEach((edge) => {
              self.moveNode(edge, true); // 设置边框加粗样式
            });
          }
        }
        // 当选中节点时，增加详情展示节点
        if (cell.isVertex() && !cell.detailOf) {
          if (cell.detail[this.props.detailConfig] && cell.detail[this.props.detailConfig].config.length > 0) {
            const detailNode = self.getDetailNode(cell);
            cell.ex = self.graph.addCell(detailNode, self.parent);
            cell.ex.detailOf = cell.id;
          }
        }

        cells.forEach((item) => {
          const isEdge = cell.edges && cell.edges.find((edge) => {
            return edge.id === item.id;
          });
          if (item.id !== cell.id && !isEdge) {
            self.moveNode(item, false); // 清除其它节点边框加粗样式
            // 删除其它节点详情展示节点
            if (item.detailOf && item.detailOf !== cell.id) {
              self.graph.removeCells([item]);
            }
          }
        });
        // // 当节点内包含图标时，节点增加选中样式
        // if (cell.icon) {
        //   self.moveNode(cell.getParent(), true);
        //   // 为节点上所有的连线设置加粗样式
        //   if (cell.getParent().edges) {
        //     cell.getParent().edges.forEach((edge) => {
        //       self.moveNode(edge, true); // 设置边框加粗样式
        //     });
        //   }
        // }
      } else {
        // 设置鼠标移出节点效果
        if (curCell) {
          self.moveNode(curCell, false);
          // 为节点上所有的连线设置移出样式
          if (curCell.edges) {
            curCell.edges.forEach((edge) => {
              self.moveNode(edge, false); // 设置边框加粗样式
            });
          }
          curCell = null;
          // 删除详情展示节点
          const a = cells.filter((i) => {
            return i.detailOf;
          });
          self.graph.removeCells(a);
        }
      }
    };
  }

  /**
   * @description 给指定的节点设置背景色
   * @param cell 当前节点
   * @param isin true 表示鼠标在节点上，false 表示鼠标没在节点上
   */
  moveNode(cell, isin) {
    // 为空与禁用的节点都不处理鼠标事件
    if (cell == null) {
      return;
    }
    if (cell.is_disabled) {
      return;
    }

    const model = this.graph.getModel();
    model.beginUpdate();
    try {
      if (cell.isEdge()) {
        this.graph.setCellStyles('strokeColor', isin
          ? cell.customStyle.emphColor
          : cell.customStyle.color, [cell]); // 鼠标移入时颜色变化
        this.graph.setCellStyles('strokeWidth', isin
          ? cell.customStyle.width * 2
          : cell.customStyle.width, [cell]); // 鼠标移入时加粗
      }
    } finally {
      model.endUpdate();
    }
  }

  /**
   * @description 为节点增加详情展示
   * @param cell 当前节点
   */
  getDetailNode(cell) {
    let config = [];
    let title = '';
    if (cell.detail[this.props.detailConfig] && cell.detail[this.props.detailConfig].config.length > 0) {
      config = cell.detail[this.props.detailConfig].config.map(i => {
        return {
          label: i.label,
          value: cell.detail[i.value] || '-'
        }
      });
      title = cell.detail[this.props.detailConfig].title;
    }
    
    const geometryCell = cell;
    const geometry = new mxGeometry(
      (geometryCell.getParent().getParent().geometry
        ? geometryCell.getParent().getParent().geometry.x + geometryCell.getParent().geometry.x
        : geometryCell.getParent().geometry ? geometryCell.getParent().geometry.x : 0
      ) + geometryCell.geometry.x,
      (geometryCell.getParent().getParent().geometry
        ? geometryCell.getParent().getParent().geometry.y + geometryCell.getParent().geometry.y
        : geometryCell.getParent().geometry ? geometryCell.getParent().geometry.y : 0
      ) + geometryCell.geometry.y + geometryCell.geometry.height + (cell.port ? 5 : 1),
      200,
      config.length * 20 + (title ? 50 : 10)
    );
    const detailInfoList = config.map((port) => {
      return '<div class="node-detail__content">' +
        `<span class="node-detail__content__label">${port.label} :</span>` +
        `<span class="node-detail__content__value" title="${port.value}">${port.value}</span>` +
      '</div>';
    });
    const titleInfo = title ? `<div class="node-detail__title">${title}</div>` : '';
    const detailInfo = `<div class="node-detail">${titleInfo}${
        detailInfoList.join('')}</div>`;
    const detailNode = new mxCell(detailInfo, geometry, 'fillColor=none;strokeColor=none;');
    detailNode.setVertex(true);
    return detailNode;
  }

  /**
   * @description 父节点title
   * @param cell 当前节点
   */
  getParentNode(parent, x, y, width, height, label) {
    const geometry = new mxGeometry(x, y, width, height);
    const detailInfo = `<div class="node-parent" style="width: ${
      width}px"><div class="node-parent__title">` +
      '<div class="node-parent__title__bg"></div>' +
      `<div class="node-parent__title__text" title="${label}">${label}<div></div></div>`;
    const detailNode = new mxCell(detailInfo, geometry, 'fillColor=none;strokeColor=none;');
    detailNode.setVertex(true);
    const vertex = this.graph.addCell(detailNode, parent);
    return vertex;
  }

  /**
   * @description 设置连线默认样式
   */
  setDefaultEdgeStyle() {
    mxEdgeStyle.Style = (state, source, target, points, result) => {
      if (source !== null && target !== null) {
        const pt = new mxPoint(target.getCenterX(), source.getCenterY());
        if (mxUtils.contains(source, pt.x, pt.y)) {
          if (target.cell.prev) {
            pt.y = source.y;
          } else {
            pt.y = source.y + source.height;
          }
        }
        result.push(pt);
      }
    };
    mxStyleRegistry.putValue('edgeStyle', mxEdgeStyle.Style);
    // this.graph.getStylesheet().getDefaultEdgeStyle().edgeStyle = 'edgeStyle'; // 设置连线样式
    delete this.graph.getStylesheet().getDefaultEdgeStyle().endArrow;
  }

  /**
   * @description 获取设备
   * @param parent 父级域
   * @param node 当前节点对象
   * @param x 横坐标（基于父级域）
   * @param y 纵坐标（基于父级域）
   * @param label 节点名称
   * @param iconClass 图标样式
   */
  getNode(parent, node, x, y, label, iconClass) {
    iconClass = iconClass ? iconClass : 'icon-title-server'; // 默认图标
    const width = node[this.props.buildInName] && node[this.props.buildInName].length > 0
      ? (node[this.props.buildInName].length + 1) * 25 > 100 ? (node[this.props.buildInName].length + 1) * 25 : 100
      : 100;
    // 节点
    const geometry = new mxGeometry(x, y, width, 120);
    const info = `<div class="node-bg" style="width: ${width}px"><i class="${iconClass}"></i><div class="node-label" style="width: ${
      width - 10}px;"><div title="${label}"><span>${label}</span></div></div></div>`;
    const detailNode = new mxCell(info, geometry, 'fillColor=none;strokeColor=none;');
    detailNode.setVertex(true);
    const vertex = this.graph.addCell(detailNode, parent);
    vertex.detail = node;
    return vertex;
  }

  /**
   * @description 获取端口
   * @param parent 父级域
   * @param node 父级节点对象
   * @param index 下标
   */
  getBuildIn(parent, node, index, iconClass) {
    iconClass = iconClass ? iconClass : 'icon-title-port'; // 默认图标
    const x = index * 25 + ((parent.geometry.width) / 2 - 12.5 * node.ports.length) + 5;
    const y = parent.geometry.height - 25;
    const style = 'fillColor=none;strokeColor=none;';
    // 端口
    const geometry = new mxGeometry(x, y, 15, 15);
    const info = `<i class="${iconClass}"></i>`;
    const iconCell = new mxCell(info, geometry, style);
    iconCell.setVertex(true);
    const vertex = this.graph.addCell(iconCell, parent);
    // 配置
    vertex.port = true;
    vertex.detail = node.ports[index];
    return vertex;
  }

  /**
   * @description 获取连线
   * @param parent 父级域
   * @param node 父级节点对象
   * @param index 下标
   */
  getEdge(local, opposite, commonStyle, customStyle) {
    let style = '';
    let styleArr = `${commonStyle};${customStyle}`
      ? `${commonStyle};${customStyle}`.split(';')
      : [];
    let styleObj = {
      width: 1,
      color: '#c5c5c5',
      emphColor: '#1296db',
      dotted: 'false',
      arrow: 'true'
    };
    styleArr.forEach(item => {
      const arr = item.split('=');
      styleObj[arr[0]] = arr[1];
    })
    style += `strokeWidth=${styleObj.width};`; // 线宽
    style += `strokeColor=${styleObj.color};`; // 颜色
    style += `dashed=${styleObj.dotted === 'true' ? 1 : 0};`; // 虚线
    style += styleObj.arrow === 'true' ? 'endArrow=block;endSize=5;endFill=1;' : ''; // 箭头
    const edge = this.graph.insertEdge(
      this.parent,
      null,
      '',
      local,
      opposite,
      style
      // local.port 
      //   ? 'strokeWidth=1;strokeColor=#c5c5c5;rounded=2;dashed=1;'
      //   : 'strokeWidth=1;endArrow=block;endSize=5;endFill=1;strokeColor=#c5c5c5;rounded=1;'
    );
    edge.customStyle = styleObj;
  }

  merge(a, b) {
    if (a === undefined || b === undefined) {
      return;
    } else {
      for (const key of Object.keys(b)) {
        a[key] =
          a[key] && a[key].toString() === '[object Object]'
            ? this.merge(a[key], b[key])
            : (a[key] = b[key]);
      }
      return a;
    }
  }
}
