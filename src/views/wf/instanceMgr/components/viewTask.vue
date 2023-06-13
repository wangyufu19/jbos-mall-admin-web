<template>
     <el-dialog 
        :title="title" 
        width="80%"
        :visible.sync="dialogFormVisible">   
        <detail :getProcInstId="this.procInstId"/>
    </el-dialog>
</template>

<script>
    import Detail from '@/components/Workflow/Task/Detail'

    export default {
        name: 'viewTask',
        components: { Detail},
        data() {
            return {
                title:'实例任务',
                dialogFormVisible: false,
                procInstId:''
            }
        },
               
        methods: {
            init(procInstId) {
                this.dialogFormVisible = true
                this.procInstId=procInstId
            }
        }
    }
</script>
<style scoped>
  .filter-container{
    margin-bottom: 10px;
  }
</style>
