
<template>
  <div id="canvas" ref="canvas"></div>
</template>
   
  <script>
    import http from '@/utils/request'
    import BpmnViewer from 'bpmn-js'
    import MoveCanvasModule from 'diagram-js/lib/navigation/movecanvas'
    let bpmnViewer = null
    const webUrl = process.env.VUE_APP_BASE_API+"/workflow"
    export default {
      name: 'bpmnView',
      props: ['getId','getProcInstId','getCurrentActivityId'],
      data () {
        return {
        }
      },
      watch: {
        getId(val) {
          this.getProcessXML()
        },
        getProcInstId(val) {
          this.getProcessXML()
        },
        getCurrentActivityId(val){
          this.getProcessXML()
        }
      },
      mounted() {
        bpmnViewer = new BpmnViewer({
          container: '#canvas',
          width: '100%',
          height: '100%',
          additionalModules: [
            MoveCanvasModule // 移动整个画布
          ]
        })
        this.getProcessXML()
      },
      methods: {
        createBpmnViewer :async function (bpmnXML) {
          try {
            await bpmnViewer.importXML(bpmnXML);
          } catch (err) {
            console.error('error loading BPMN 2.0 XML', err);
          }
          let canvas = bpmnViewer.get('canvas')
        
          canvas.addMarker(this.getCurrentActivityId, 'highlight');
          canvas.zoom('fit-viewport', 'auto')
        },
        getProcessXML: function () {
            const that = this                
            const processDefinitionId = this.getId
            http.get(webUrl + '/engine-rest/process-definition/'+ processDefinitionId +'/xml')
            .then((response)=>{
                if(response.data.bpmn20Xml){
                    that.createBpmnViewer(response.data.bpmn20Xml)
                }
            })
            .catch((response)=>{
                console.log(response);
            })
        }
      }
    }
  </script>
  <style>
    .highlight .djs-visual > :nth-child(1) {
      stroke: green !important;
      fill: rgba(0, 80, 0, 0.4) !important;
    }
    .djs-container{
        height: 50vh !important;
    }
  </style>
  