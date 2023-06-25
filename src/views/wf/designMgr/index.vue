<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="clearfix">
      <div class="filter-container">
        <el-button size="mini" type="primary" @click="onAddAssignee">打开</el-button>
        <el-button size="mini" type="primary" @click="saveXML">保存</el-button>
        <el-button size="mini" type="primary" @click="onAddAssignee">另存为</el-button>
        <el-button size="mini" type="primary" @click="onAddAssignee">发布</el-button>
      </div>
      </div>
    
      <div class="bpmn-container" v-show="radioValue === 'Diagram'">
        <div class="canvas-container">
          <div ref="canvas" class="canves"></div>
          <div class="properties" :class="{open: openPanel}">
            <div class="toggle" @click="openPanel = !openPanel">Properties Panel</div>
            <div ref="propertiesPanel" class="panel"></div>
          </div>
        </div>
      </div>
      <div class="xml-container" v-if="isShowXml">
        <codemirror ref="cmEditor" @changes="mirrorCodeChange" :value="xml.toString()" :options="cmOptions" />
      </div>
    
    <div class="bottom-container">
      <el-radio-group v-model="radioValue" size="mini">
        <el-radio-button label="Diagram"></el-radio-button>
        <el-radio-button label="Xml"></el-radio-button>
      </el-radio-group>
    </div>   
  </el-card> 
  </div>
</template>

<script>
import Modeler from 'bpmn-js/lib/Modeler'
import 'bpmn-js/dist/assets/diagram-js.css' // 左边工具栏以及编辑节点的样式
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css'
import 'bpmn-js-properties-panel/styles/properties.less'

import propertiesPanelModule from 'bpmn-js-properties-panel'
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda.json'

import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
// xml syntax highlighting
import 'codemirror/mode/xml/xml'
// auto close tags
import 'codemirror/addon/fold/xml-fold'
import 'codemirror/addon/edit/closetag'
// search addons
import 'codemirror/addon/search/search'
import 'codemirror/addon/search/searchcursor'
import 'codemirror/addon/dialog/dialog'
import 'codemirror/addon/dialog/dialog.css'

import '@/assets/css/diagram.less'
import '@/assets/icon/Icon.less'

import { xmlStr } from '@/components/diagram/xmlData.js'
import { mapMutations } from 'vuex'

export default {
  name: 'procDefMgr',
  components: { codemirror },
  data() {
    return {
      activeName: 'designer',
      bpmnModeler: null,
      radioValue: 'Diagram',
      xml: '',
      elementSelector: [],
      openPanel: true,
    }
  },
  computed: {
    isShowXml () {
      return this.radioValue === 'Xml'
    }
  },
  watch: {
    radioValue: {
      immediate: true,
      handler (v, o) {
        this.setRadioValue(v)
        if (this.isShowXml) {
          this.saveXML()
        }
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    ...mapMutations(['setRadioValue']),
    init () {
      this.bpmnModeler = new Modeler({
        container: this.$refs.canvas,
        keyboard: {
          bindTo: document
        },
        propertiesPanel: {
          parent: this.$refs.propertiesPanel
        },
        additionalModules: [
          propertiesPanelModule,
          propertiesProviderModule
        ],
        moddleExtensions: {
          camunda: camundaModdleDescriptor
        }
      })
      this.createNewDiagram()
      this.initEvent()
    },
    async createNewDiagram () {
      try {
        await this.bpmnModeler.importXML(this.xml || xmlStr)
        this.bpmnModeler.get('canvas').zoom('fit-viewport', 'auto')
        this.saveXML()
      } catch (err) {
      }
    },

    initEvent () {
      const eventBus = this.bpmnModeler.get('eventBus')
      eventBus.on('selection.changed', e => {
        this.elementSelector = e.newSelection
      })
    },
    async saveXML () {
      const res = await this.bpmnModeler.saveXML({ format: true })
      this.xml = res.xml.toString()
    },
  }
}
</script>


<style lang="less" scoped>
.bpmn-container {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: calc(100vh - 95px);
  .canvas-container {
    display: flex;
    height: 100%;
  }

  .canves {
    height: 100%;
    width: 100%;
  }

  .properties {
    overflow: auto;
    position: relative;
    width: 0px;
    flex: none;
    border-left: solid 1px #ccc;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
    outline: none;
    background: #f8f8f8;
    &.open {
      width: 250px;
    }

    .toggle {
      position: absolute;
      left: -30px;
      top: 50%;
      background: #f8f8f8;
      padding: 7px 10px;
      transform: rotate(-90deg);
      white-space: nowrap;
      font-size: 13px;
      border: solid 1px #ccc;
      border-bottom: none;
      border-radius: 2px 2px 0 0;
      transform-origin: top left;
      z-index: 10;
      cursor: pointer;
      user-select: none;
    }

    .panel {
      border-left: 1px solid #ccc;
      overflow: auto;
      /deep/.bpp-properties-panel {
        height: 100%;
      }
    }
  }
}

.bottom-container {
  z-index: 9;
  position: absolute;
  bottom: 10px;
  left: 10px;
}

/deep/.CodeMirror {
  height: calc(100vh - 95px);
}
</style>
