<template>
    <div class="header-container">
        <i title="创建" class="app-icon app-icon-new" @click="createNewDiagram"></i>
        <i title="打开" class="app-icon app-icon-open" @click="$refs.refFile.click()"></i>|
        <i title="保存" class="app-icon app-icon-save" @click="saveXml"></i>
        <i title="导出" class="app-icon app-icon-save-as" @click="saveBPMN"></i>|
        <input type="file" id="files" ref="refFile" style="display: none" @change="loadBPMN" />
    </div>
</template>
<script>
export default {
    props: {
      bpmnModeler: Object,
      xml: String
    },
    data () {
      return {
      }
    },
    methods: {
      async createNewDiagram(){
        this.$emit('createNewDiagram','')
      },
      async loadBPMN () {
        const that = this
        const file = this.$refs.refFile.files[0]

        const reader = new FileReader()
        reader.readAsText(file)
        reader.onload = function () {
            that.$emit('updateXml', this.result)
        }
      },
      async saveXml () {
        const res = await this.bpmnModeler.saveXML({ format: true })
        this.$emit('updateXml', res.xml)
        this.$message.success('保存成功')
      },
      async saveBPMN () {
        try {
            const result = await this.bpmnModeler.saveXML({ format: true })
            const { xml } = result

            const xmlBlob = new Blob([xml], {
            type: 'application/bpmn20-xml;charset=UTF-8,'
            })

            const downloadLink = document.createElement('a')
            downloadLink.download = `bpmn-${+new Date()}.bpmn`
            downloadLink.innerHTML = 'Get BPMN SVG'
            downloadLink.href = window.URL.createObjectURL(xmlBlob)
            downloadLink.onclick = function (event) {
            document.body.removeChild(event.target)
            }
            downloadLink.style.visibility = 'hidden'
            document.body.appendChild(downloadLink)
            downloadLink.click()
        } catch (err) {
            console.log(err)
        }
      },
    }
}
</script>

<style lang="less" scoped>
.header-container {
  user-select: none;
  .app-icon {
    font-size: 14px;
    padding: 5px;
    margin-right: 4px;
    width: 14px;
    height: 16px;
    cursor: pointer;
    border: 1px solid rgba(1, 1, 1, 0);

    &:hover {
      background-color: #f8f8f8;
      border: 1px solid #ccc;
    }
  }

  .app-icon-set-color-tool {
    position: relative;
    .colorBlock {
      margin: 4px;
      width: 56px;
      height: 16px;
      border: 1px solid;
    }

    &.open {
      background-color: #f8f8f8;
      border: 1px solid #ccc;
    }
  }
  .colorSelect {
    z-index: 10;
    position: absolute;
    left: 0;
    list-style: none;
    transform: translateX(-50%);
  }
}
i[class^='el-icon'] {
  padding: 5px;

  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0);
}
i[class^='el-icon']:hover {
  background-color: #f8f8f8;
  border: 1px solid #ccc;
}
</style>
