<template>
    <el-dialog 
        :title="title" 
        width="80%"
        :visible.sync="dialogFormVisible">   
        <viewer :getId="id" :getProcInstId="procInstId" :getCurrentActivityId="currentActivityId"/>
    </el-dialog>
</template>
<script>
    import Viewer from '@/components/camunda/Viewer'
    export default {
        name: 'processViewer',
        components: {Viewer},
        data() {
            return {
                dialogFormVisible: false,
                datas: [],
                id:'',
                title:'',
                procInstId:'',
                currentActivityId:''
            }
        },
        methods: {
            init(id,procName,procInstId,currentActivityId) {
                this.id=id
                this.title='流程预览'+'-'+procName
                this.procInstId=procInstId
                this.currentActivityId=currentActivityId
                this.dialogFormVisible = true
            }
        }
    }
</script>
<style scoped>
    .filter-container{
      margin-bottom: 10px;
    }
  </style>
  